export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Texte bilingue : chaque champ traduisible a une version FR et EN. */
export type T = Record<Locale, string>;

/** Libellés fixes de l'interface (navigation, titres de sections, boutons). */
export const ui = {
  nav: {
    about: { fr: "À propos", en: "About" },
    skills: { fr: "Compétences", en: "Skills" },
    projects: { fr: "Projets", en: "Projects" },
    experience: { fr: "Parcours", en: "Experience" },
    contact: { fr: "Contact", en: "Contact" },
  },
  sections: {
    about: { fr: "À propos", en: "About" },
    skills: { fr: "Compétences", en: "Skills" },
    projects: { fr: "Projets sélectionnés", en: "Selected projects" },
    experience: { fr: "Expérience", en: "Experience" },
    education: { fr: "Formation", en: "Education" },
    contact: { fr: "Travaillons ensemble", en: "Let's work together" },
  },
  cta: {
    projects: { fr: "Voir mes projets", en: "See my work" },
    cv: { fr: "Télécharger le CV", en: "Download CV" },
    email: { fr: "M'écrire", en: "Email me" },
    code: { fr: "Code", en: "Code" },
    demo: { fr: "Démo", en: "Demo" },
  },
  contactText: {
    fr: "Ouvert à un stage de fin d'études (PFE) et aux collaborations autour des agents IA et de la donnée.",
    en: "Open to an end-of-studies internship and to collaborations on AI agents and data.",
  },
  switchTo: { fr: "EN", en: "FR" },
  builtWith: {
    fr: "Construit avec Next.js · Déployé via Docker & GitHub Actions",
    en: "Built with Next.js · Shipped with Docker & GitHub Actions",
  },
} satisfies Record<string, unknown>;
