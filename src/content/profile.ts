/**
 * ─────────────────────────────────────────────────────────────
 *  TOUT LE CONTENU DU PORTFOLIO EST ICI.
 *  Modifie uniquement ce fichier pour mettre à jour le site.
 *  Les champs marqués  // TODO(CV)  sont des exemples à remplacer.
 * ─────────────────────────────────────────────────────────────
 */
import type { T } from "./i18n";

export type Link = { label: string; href: string };

export type Project = {
  title: string;
  year: string;
  tags: string[];
  summary: T;
  highlights?: T[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export type Experience = {
  role: T;
  org: string;
  place: string;
  period: T;
  points: T[];
};

export type Education = {
  degree: T;
  school: string;
  place: string;
  period: string;
};

export const profile = {
  name: "Aké Mobio Ivan Junior",
  shortName: "Ivan Aké",
  role: {
    fr: "Ingénieur Big Data & IA · Créateur d'agents IA",
    en: "Big Data & AI Engineer · AI Agent Builder",
  } satisfies T,
  tagline: {
    // TODO(CV)
    fr: "Je conçois des agents IA et des pipelines de données qui passent du prototype à la production.",
    en: "I design AI agents and data pipelines that make it from prototype to production.",
  } satisfies T,
  location: "Casablanca, Maroc",
  availability: {
    fr: "Disponible pour un PFE · février 2027",
    en: "Available for an internship · February 2027",
  } satisfies T,
  email: "contact@exemple.com", // TODO(CV) l'email que tu veux afficher publiquement
  cvFile: "/cv-ivan-ake.pdf", // dépose le PDF dans /public
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mobio-ivan-junior-ake-4b3832248" },
    { label: "GitHub", href: "https://github.com/" }, // TODO(CV) ton pseudo GitHub
  ] satisfies Link[],

  about: [
    {
      // TODO(CV)
      fr: "Étudiant ingénieur en Big Data & Intelligence Artificielle à HESTIM Casablanca, originaire de Côte d'Ivoire. Je construis des systèmes multi-agents, des outils de conformité et des modèles de données pensés pour être utilisés, pas seulement démontrés.",
      en: "Big Data & Artificial Intelligence engineering student at HESTIM Casablanca, originally from Côte d'Ivoire. I build multi-agent systems, compliance tooling and data models designed to be used, not just demoed.",
    },
    {
      // TODO(CV)
      fr: "En parallèle, je cofonde OROS IA, une startup qui développe des agents IA et des solutions d'automatisation pour les entreprises.",
      en: "Alongside my studies I co-founded OROS IA, a startup building AI agents and automation solutions for businesses.",
    },
  ] satisfies T[],

  stats: [
    // TODO(CV)
    { value: "5+", label: { fr: "projets IA livrés", en: "AI projects shipped" } },
    { value: "1", label: { fr: "startup cofondée", en: "startup co-founded" } },
    { value: "FR · EN", label: { fr: "langues de travail", en: "working languages" } },
  ] satisfies { value: string; label: T }[],

  skills: [
    // TODO(CV)
    { group: { fr: "IA & Agents", en: "AI & Agents" }, items: ["LLM", "LangGraph", "RAG", "Multi-agent", "Prompt engineering"] },
    { group: { fr: "Data & ML", en: "Data & ML" }, items: ["Python", "Pandas", "Scikit-learn", "PyTorch", "SQL"] },
    { group: { fr: "Big Data", en: "Big Data" }, items: ["Spark", "Kafka", "Airflow", "OpenMetadata"] },
    { group: { fr: "Ingénierie", en: "Engineering" }, items: ["Docker", "GitHub Actions", "FastAPI", "Next.js", "Git"] },
  ] satisfies { group: T; items: string[] }[],

  projects: [
    // TODO(CV) — remplace par tes vrais projets, liens et résultats chiffrés
    {
      title: "ScreenEdge Africa",
      year: "2026",
      tags: ["AML/KYC", "Python", "Data pipelines"],
      featured: true,
      summary: {
        fr: "Plateforme de screening des sanctions et de conformité AML/KYC pour les institutions africaines.",
        en: "Sanctions screening and AML/KYC compliance platform for African institutions.",
      },
    },
    {
      title: "Gouvernance multi-agents",
      year: "2026",
      tags: ["OpenMetadata", "Multi-agent", "Data governance"],
      featured: true,
      summary: {
        fr: "Plateforme de gouvernance pour des agents IA métier (Finance, Investissement, RH) avec lignage et contrôle d'accès.",
        en: "Governance platform for business AI agents (Finance, Investment, HR) with lineage and access control.",
      },
    },
    {
      title: "J-ONE · Unitree G1",
      year: "2026",
      tags: ["Robotics", "Speech", "LLM"],
      summary: {
        fr: "Interaction vocale homme-robot pour un humanoïde Unitree G1.",
        en: "Voice-based human-robot interaction for a Unitree G1 humanoid.",
      },
    },
    {
      title: "Agent de trading",
      year: "2026",
      tags: ["Python", "MetaTrader 5", "Multi-agent"],
      summary: {
        fr: "Agent de trading multi-agent connecté à MetaTrader 5, validé en démo sur EUR/USD.",
        en: "Multi-agent trading system connected to MetaTrader 5, validated on a demo EUR/USD account.",
      },
    },
  ] as Project[],

  experience: [
    // TODO(CV)
    {
      role: { fr: "Cofondateur", en: "Co-founder" },
      org: "OROS IA",
      place: "Casablanca",
      period: { fr: "2026 — aujourd'hui", en: "2026 — present" },
      points: [
        {
          fr: "Conception d'agents IA et d'automatisations pour des clients PME.",
          en: "Designing AI agents and automations for SME clients.",
        },
      ],
    },
  ] as Experience[],

  education: [
    // TODO(CV)
    {
      degree: { fr: "Cycle ingénieur — Big Data & IA", en: "Engineering degree — Big Data & AI" },
      school: "HESTIM",
      place: "Casablanca, Maroc",
      period: "— 2027",
    },
  ] as Education[],
};
