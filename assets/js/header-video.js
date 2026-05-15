/**
 * Full-viewport header video (Three.js VideoTexture) + scroll fade — Apple-style hero.
 */
import * as THREE from "three";

const VIDEO_SRC = "/assets/video/header_video.mp4";

/** Hide bottom strip (e.g. “veo” watermark) + slight side trim; tune 0–1 if needed. */
const CROP_BOTTOM = 0.24;
const CROP_SIDES = 0.04;
/** Move the full-screen plane up (fraction of viewport height). Texture offset is unreliable for VideoTexture. */
const VIEWPORT_SHIFT_Y = 0.055;

/**
 * Object-fit: cover in window, sampling only an inner rectangle of the video
 * (excludes bottom watermark: WebGL v=0 is texture bottom, so we use v ∈ [CROP_BOTTOM, 1]).
 */
function applyTextureCover(texture, video, width, height) {
  const vw = video.videoWidth || 1920;
  const vh = video.videoHeight || 1080;
  const wa = width / Math.max(height, 1);

  const u0 = CROP_SIDES;
  const u1 = 1 - CROP_SIDES;
  const v0 = CROP_BOTTOM;
  const v1 = 1;
  const du = u1 - u0;
  const dv = v1 - v0;

  const contentAspect = (vw * du) / (vh * dv);

  texture.repeat.set(du, dv);
  texture.offset.set(u0, v0);

  if (!Number.isFinite(contentAspect) || !Number.isFinite(wa)) return;

  if (wa > contentAspect) {
    const r = contentAspect / wa;
    texture.repeat.y *= r;
    texture.offset.y = v0 + (dv - texture.repeat.y) / 2;
  } else {
    const r = wa / contentAspect;
    texture.repeat.x *= r;
    texture.offset.x = u0 + (du - texture.repeat.x) / 2;
  }
}

function init() {
  const root = document.getElementById("header-video-root");
  const scrim = document.querySelector(".header-video-scrim");
  if (!root) return;

  const header = document.querySelector(".page-home .site-header");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.style.display = "none";
    if (scrim) scrim.style.opacity = "0.88";
    if (header) {
      header.classList.remove("site-header--concealed");
      header.setAttribute("aria-hidden", "false");
    }
    return;
  }

  const video = document.createElement("video");
  video.src = VIDEO_SRC;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  const scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;
  const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  root.appendChild(renderer.domElement);

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  scene.add(mesh);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    mesh.geometry.dispose();
    mesh.geometry = new THREE.PlaneGeometry(width, height);
    /* Shift the video up in the window; bottom strip shows through (alpha) to the white underlay. */
    mesh.position.y = height * VIEWPORT_SHIFT_Y;

    applyTextureCover(texture, video, width, height);
  }

  const fadeDistance = () => Math.min(window.innerHeight * 0.75, 640);

  function updateScrollFade() {
    const y = window.scrollY;
    const t = Math.min(1, y / fadeDistance());
    const ease = t * t * (3 - 2 * t);
    /* Full fade: canvas opacity reaches 0 when scrolled through the fade range. */
    root.style.opacity = String(1 - ease);
    if (scrim) {
      scrim.style.opacity = String(0.26 + ease * 0.68);
    }
    if (header) {
      const revealHeader = y > 10;
      header.classList.toggle("site-header--concealed", !revealHeader);
      header.setAttribute("aria-hidden", revealHeader ? "false" : "true");
      header.classList.toggle("site-header--solid", y > 72);
    }
  }

  function renderLoop() {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      texture.needsUpdate = true;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
  }

  window.addEventListener("resize", () => {
    resize();
    updateScrollFade();
  });
  window.addEventListener("scroll", updateScrollFade, { passive: true });

  video.addEventListener("loadeddata", () => {
    resize();
    updateScrollFade();
  });

  resize();
  updateScrollFade();

  video
    .play()
    .catch(() => {
      /* autoplay may require gesture on some browsers */
    })
    .finally(() => {
      resize();
    });

  requestAnimationFrame(renderLoop);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
    else video.play().catch(() => {});
  });
}

init();
