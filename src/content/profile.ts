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
    fr: "Élève ingénieur Big Data & IA · Data Science & agents IA",
    en: "Big Data & AI Engineering Student · Data Science & AI Agents",
  } satisfies T,
  tagline: {
    fr: "Je transforme les données en insights et en modèles prédictifs, et je construis des agents IA qui automatisent de vrais processus métier.",
    en: "I turn data into insights and predictive models, and build AI agents that automate real business processes.",
  } satisfies T,
  location: "Casablanca, Maroc",
  availability: {
    fr: "Disponible pour un PFE · février 2027",
    en: "Available for an internship · February 2027",
  } satisfies T,
  email: "akeivanjr10@gmail.com",
  cvFile: "/cv-ivan-ake.pdf", // dépose le PDF dans /public
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mobio-ivan-junior-ake-4b3832248" },
    { label: "GitHub", href: "https://github.com/AMij0101982872" },
  ] satisfies Link[],

  about: [
    {
      fr: "Élève ingénieur en Big Data & Intelligence Artificielle à HESTIM Casablanca, originaire de Côte d'Ivoire. Je suis spécialisé en analyse de données, Data Science et IA générative : de la collecte et du nettoyage des données jusqu'aux modèles prédictifs, aux tableaux de bord et aux systèmes multi-agents.",
      en: "Big Data & Artificial Intelligence engineering student at HESTIM Casablanca, originally from Côte d'Ivoire. I specialise in data analysis, data science and generative AI: from collecting and cleaning data to predictive models, dashboards and multi-agent systems.",
    },
    {
      fr: "Quatre stages (Holokia, ScreenEdge Africa, Guichet Unique du Commerce Extérieur, UNITEC.SA) et une 1ère place nationale au DataTour 2026 en détection de fraude. Je recherche un stage PFE orienté Data Analyst / Data Scientist.",
      en: "Four internships (Holokia, ScreenEdge Africa, Guichet Unique du Commerce Extérieur, UNITEC.SA) and a national 1st place at DataTour 2026 in fraud detection. I'm looking for an end-of-studies internship as a Data Analyst / Data Scientist.",
    },
  ] satisfies T[],

  stats: [
    { value: "4", label: { fr: "stages en entreprise", en: "company internships" } },
    { value: "1ère", label: { fr: "place DataTour 2026 (national)", en: "place, DataTour 2026 (national)" } },
    { value: "FR · EN", label: { fr: "langues de travail", en: "working languages" } },
  ] satisfies { value: string; label: T }[],

  skills: [
    {
      group: { fr: "Data Science & ML", en: "Data Science & ML" },
      items: ["Python", "Pandas", "NumPy", "Scikit-learn", "LightGBM", "XGBoost", "CatBoost"],
    },
    {
      group: { fr: "IA générative & Agents", en: "Generative AI & Agents" },
      items: ["LLM", "LangChain", "Systèmes multi-agents", "RAG", "Embeddings", "Vector DB", "n8n"],
    },
    {
      group: { fr: "Bases de données & BI", en: "Databases & BI" },
      items: ["SQL", "MySQL", "PostgreSQL", "SQL Server", "Oracle", "ETL (Pentaho)", "Power BI"],
    },
    {
      group: { fr: "Apps & visualisation", en: "Apps & visualisation" },
      items: ["Streamlit", "FastAPI", "Web scraping", "Matplotlib", "Seaborn"],
    },
    {
      group: { fr: "Web & déploiement", en: "Web & deployment" },
      items: ["React", "HTML", "CSS", "JavaScript", "Supabase", "Docker", "AWS", "Git", "Vercel", "Netlify", "Render"],
    },
    {
      group: { fr: "Certifications (IBM)", en: "Certifications (IBM)" },
      items: ["What is Data Science?", "Tools for Data Science", "EDA for Machine Learning", "Data Science Methodology"],
    },
  ] satisfies { group: T; items: string[] }[],

  projects: [
    // TODO(CV) — ajoute les liens GitHub (repo) / démo de chaque projet
    {
      title: "DataTour 2026 · Détection de fraude",
      year: "2026",
      tags: ["LightGBM", "XGBoost", "CatBoost", "Feature engineering"],
      featured: true,
      summary: {
        fr: "🏆 1ère place, classement général de la phase nationale (Data Afrique Hub × Fatala), avec l'équipe OUTLIERS.",
        en: "🏆 1st place, overall national-phase ranking (Data Afrique Hub × Fatala), with team OUTLIERS.",
      },
      highlights: [
        {
          fr: "Modèle de détection de fraude sur données financières",
          en: "Fraud-detection model on financial data",
        },
        {
          fr: "Ensemble LightGBM / XGBoost / CatBoost, feature engineering et calibration des probabilités",
          en: "LightGBM / XGBoost / CatBoost ensemble, feature engineering and probability calibration",
        },
      ],
    },
    {
      title: "Plateforme multi-agents RH · Holokia",
      year: "2026",
      tags: ["FastAPI", "LangChain", "LLM", "React", "Supabase", "n8n"],
      featured: true,
      summary: {
        fr: "Plateforme multi-agents qui automatise un processus RH de bout en bout.",
        en: "Multi-agent platform automating an HR process end to end.",
      },
      highlights: [
        {
          fr: "Agents de veille technologique, d'analyse et tri de CV (ATS) et de génération de comptes rendus",
          en: "Agents for tech watch, CV screening (ATS) and automatic meeting minutes",
        },
        {
          fr: "Orchestration exposée via une API, avec une interface de pilotage React",
          en: "Orchestration exposed through an API, with a React control panel",
        },
      ],
    },
    {
      title: "ScreenEdge Africa · Collecte de conformité",
      year: "2026",
      tags: ["Python", "Web scraping", "LangChain", "AML/KYC"],
      featured: true,
      summary: {
        fr: "Agent autonome qui collecte les listes de sanctions (OFAC SDN, ONU, CNASNU) pour le screening AML/KYC.",
        en: "Autonomous agent collecting sanctions lists (OFAC SDN, UN, CNASNU) for AML/KYC screening.",
      },
      highlights: [
        {
          fr: "Pipeline de collecte, normalisation et mise à jour automatisée des données",
          en: "Automated collection, normalisation and refresh pipeline",
        },
      ],
    },
    {
      title: "Prédiction du risque de crédit",
      year: "2026",
      tags: ["Python", "Machine Learning", "Streamlit"],
      summary: {
        fr: "Application qui estime la probabilité de défaut de paiement bancaire.",
        en: "App estimating the probability of bank loan default.",
      },
      highlights: [
        {
          fr: "Pipeline de classification complet (Random Forest)",
          en: "End-to-end classification pipeline (Random Forest)",
        },
        {
          fr: "Interface KPI décisionnelle avec visualisation dynamique du score",
          en: "Decision KPI interface with dynamic score visualisation",
        },
      ],
    },
    {
      title: "Assistant documentaire intelligent (RAG)",
      year: "2025",
      tags: ["Python", "RAG", "Embeddings", "Vector DB", "Streamlit"],
      summary: {
        fr: "Chatbot qui répond aux questions sur des PDF grâce à l'IA générative.",
        en: "Chatbot answering questions about PDFs with generative AI.",
      },
      highlights: [
        {
          fr: "Embeddings et base vectorielle pour des réponses précises et contextualisées",
          en: "Embeddings and a vector store for accurate, contextual answers",
        },
      ],
    },
    {
      title: "Prédiction de maladie coronarienne",
      year: "2025",
      tags: ["Python", "Machine Learning", "Streamlit"],
      summary: {
        fr: "Dashboard interactif qui estime le risque de maladie coronarienne à partir de variables cliniques.",
        en: "Interactive dashboard estimating coronary heart disease risk from clinical variables.",
      },
      highlights: [
        {
          fr: "Modèle de classification optimisé, score de risque affiché en temps réel",
          en: "Optimised classification model with a real-time risk score",
        },
      ],
    },
    {
      title: "Consommation électrique résidentielle",
      year: "2025",
      tags: ["Python", "Power BI"],
      summary: {
        fr: "Analyse de la consommation électrique d'un foyer pour repérer les pics de demande.",
        en: "Analysis of household electricity consumption to spot demand peaks.",
      },
      highlights: [
        {
          fr: "Collecte, nettoyage et analyse des tendances journalières et saisonnières",
          en: "Collected, cleaned and analysed daily and seasonal trends",
        },
        {
          fr: "Tableau de bord Power BI des profils de consommation",
          en: "Power BI dashboard of consumption patterns",
        },
      ],
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
    {
      role: { fr: "Stagiaire Data / IA · Plateforme multi-agents", en: "Data / AI Intern · Multi-agent platform" },
      org: "Holokia",
      place: "Casablanca",
      period: { fr: "Mars 2026 — août 2026", en: "Mar 2026 — Aug 2026" },
      points: [
        {
          fr: "Conception et mise en place d'une plateforme multi-agents automatisant un processus RH de bout en bout.",
          en: "Designed and built a multi-agent platform automating an HR process end to end.",
        },
        {
          fr: "Agents spécialisés orchestrés : veille technologique, analyse et tri de CV (ATS), génération automatique de comptes rendus.",
          en: "Orchestrated specialised agents: tech watch, CV screening (ATS), automatic meeting minutes.",
        },
        {
          fr: "Exposition des services via une API (FastAPI) et interface de pilotage React.",
          en: "Exposed the services through an API (FastAPI) with a React control panel.",
        },
      ],
    },
    {
      role: { fr: "Stagiaire Data / IA · Collecte de conformité", en: "Data / AI Intern · Compliance data collection" },
      org: "ScreenEdge Africa",
      place: "Casablanca", // TODO(CV) à confirmer
      period: { fr: "Avr. 2026 — août 2026", en: "Apr 2026 — Aug 2026" },
      points: [
        {
          fr: "Développement d'un agent autonome de scraping des listes de sanctions (OFAC SDN, UN Consolidated List, CNASNU).",
          en: "Built an autonomous scraping agent for sanctions lists (OFAC SDN, UN Consolidated List, CNASNU).",
        },
        {
          fr: "Pipeline de collecte, normalisation et mise à jour automatisée des données pour le screening AML/KYC.",
          en: "Automated collection, normalisation and refresh pipeline for AML/KYC screening.",
        },
      ],
    },
    {
      role: { fr: "Stagiaire Business Intelligence & Bases de données", en: "Business Intelligence & Database Intern" },
      org: "Guichet Unique du Commerce Extérieur",
      place: "Abidjan, Côte d'Ivoire", // TODO(CV) à confirmer
      period: { fr: "Sept. 2023 — déc. 2023", en: "Sep 2023 — Dec 2023" },
      points: [
        {
          fr: "Intégration de données multi-sources dans un Data Warehouse structuré.",
          en: "Integrated multi-source data into a structured data warehouse.",
        },
        {
          fr: "Tableaux de bord Power BI pour l'aide à la décision.",
          en: "Built Power BI dashboards to support decision-making.",
        },
      ],
    },
    {
      role: { fr: "Stagiaire en bases de données (perfectionnement)", en: "Database Intern" },
      org: "UNITEC.SA",
      place: "Abidjan, Côte d'Ivoire", // TODO(CV) à confirmer
      period: { fr: "2023", en: "2023" },
      points: [
        {
          fr: "Exécution et optimisation de requêtes SQL selon les besoins opérationnels.",
          en: "Wrote and optimised SQL queries for operational needs.",
        },
        {
          fr: "Sauvegardes régulières et monitoring des serveurs et bases de données pour garantir intégrité et disponibilité.",
          en: "Ran regular backups and monitored servers and databases for integrity and availability.",
        },
      ],
    },
  ] as Experience[],

  education: [
    {
      degree: { fr: "Cycle ingénieur — Big Data & IA", en: "Engineering degree — Big Data & AI" },
      school: "HESTIM",
      place: "Casablanca, Maroc",
      period: "2024 — 2027",
    },
    {
      degree: { fr: "Licence professionnelle — Sciences & Technologie", en: "Professional Bachelor's — Science & Technology" },
      school: "HETEC",
      place: "Abidjan, Côte d'Ivoire",
      period: "2021 — 2023",
    },
    {
      degree: { fr: "Admissibilité BTS — Informatique de Gestion (IDA)", en: "BTS in Business Computing (IDA) — admissibility" },
      school: "HETEC",
      place: "Abidjan, Côte d'Ivoire",
      period: "2021 — 2022",
    },
    {
      degree: { fr: "Baccalauréat série D", en: "Baccalaureate, Science (Series D)" },
      school: "Collège Le Mahou",
      place: "Côte d'Ivoire",
      period: "2020",
    },
  ] as Education[],
};
