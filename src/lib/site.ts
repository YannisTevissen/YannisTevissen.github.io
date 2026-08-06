export const SITE = {
  url: "https://yannistevissen.fr",
  title: "Yannis Tevissen",
  description: "Multimodal retrieval and reasoning over large-scale video data.",
  author: "Yannis Tevissen",
  email: "contact@yannistevissen.fr",
  defaultOgImage: "/assets/img/og-card.png",
  gaId: "G-6BNR1WQ6C7",
  twitter: "@yannistevissen",
  cvPath: "/assets/cv/CV_YannisTevissen_en.pdf",
} as const;

export type NavItem = {
  href: string;
  label: string;
  matches?: string[];
};

export const NAV: NavItem[] = [
  { href: "/", label: "About", matches: ["/"] },
  { href: "/research/", label: "Research", matches: ["/research/", "/publications/", "/selected-work/"] },
  { href: "/talks/", label: "Press", matches: ["/talks/"] },
  { href: "/advocacy/", label: "Blog & Advocacy", matches: ["/advocacy/", "/blog/"] },
  { href: "/contact/", label: "Contact", matches: ["/contact/"] },
];

export const SOCIAL_LINKS = [
  { href: "https://scholar.google.com/citations?user=jEnK4FIAAAAJ", label: "Scholar" },
  { href: "https://www.linkedin.com/in/yannis-tevissen", label: "LinkedIn" },
  { href: "https://github.com/YannisTevissen", label: "GitHub" },
  { href: "https://huggingface.co/YannisTevissen", label: "Hugging Face" },
  { href: "https://bsky.app/profile/yannistevissen.fr", label: "Bluesky" },
  { href: "https://x.com/yannistevissen", label: "X" },
] as const;

export const FOOTER_SECONDARY_LINKS = [
  { href: "/research/", label: "Research" },
  { href: "/talks/", label: "Press & Talks" },
  { href: "/advocacy/", label: "Blog & Advocacy" },
] as const;

/** Returns true if the active path matches the nav item. */
export function isActive(pathname: string, item: NavItem): boolean {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (!item.matches) return normalized === item.href;
  return item.matches.some((m) => (m === "/" ? normalized === "/" : normalized.startsWith(m)));
}
