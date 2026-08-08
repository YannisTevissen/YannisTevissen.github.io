export const SITE = {
  url: "https://yannistevissen.fr",
  title: "Yannis Tevissen",
  description:
    "Research on retrieval and reasoning over long-form video, and on fairness, accessibility, and disability representation in AI.",
  author: "Yannis Tevissen",
  email: "contact@yannistevissen.fr",
  defaultOgImage: "/assets/img/og-card.png",
  gaId: "G-6BNR1WQ6C7",
  twitter: "@yannistevissen",
  cvPath: "/assets/cv/CV_YannisTevissen_en.pdf",
} as const;

export type NavChild = {
  href: string;
  label: string;
};

export type NavItem = {
  href: string;
  label: string;
  matches?: string[];
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  { href: "/", label: "About", matches: ["/"] },
  {
    href: "/research/",
    label: "Research",
    matches: ["/research/", "/publications/", "/artifacts/", "/students/", "/selected-work/"],
    children: [
      { href: "/research/#publications", label: "Publications" },
      { href: "/research/#artifacts", label: "Artifacts" },
      { href: "/research/#teaching", label: "Teaching & mentoring" },
    ],
  },
  {
    href: "/advocacy/",
    label: "Blog & Advocacy",
    matches: ["/advocacy/", "/blog/", "/talks/"],
    children: [
      { href: "/blog/", label: "Blog & Press" },
      { href: "/advocacy/", label: "Advocacy" },
    ],
  },
  {
    href: "/contact/",
    label: "Contact",
    matches: ["/contact/", "/cv/"],
    children: [
      { href: "/contact/", label: "Contact" },
      { href: "/cv/", label: "Resume" },
    ],
  },
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
  { href: "/research/#publications", label: "Publications" },
  { href: "/research/#artifacts", label: "Artifacts" },
  { href: "/advocacy/", label: "Blog & Advocacy" },
] as const;

/** Returns true if the active path matches the nav item. */
export function isActive(pathname: string, item: NavItem): boolean {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (!item.matches) return normalized === item.href;
  return item.matches.some((m) => (m === "/" ? normalized === "/" : normalized.startsWith(m)));
}
