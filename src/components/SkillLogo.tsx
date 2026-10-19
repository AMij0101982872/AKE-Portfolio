/**
 * Logo d'une compétence, d'après son nom dans profile.ts.
 * - Marques : Simple Icons (CC0), rendues en SVG inline côté serveur.
 * - Logos absents de Simple Icons : fichiers Devicon (MIT) dans /public/logos.
 * - Notions sans logo (LLM, RAG…) : pictogramme dessiné ici.
 * Toujours sur une tuile blanche pour garder les couleurs de marque en thème sombre.
 */
import type { ReactNode } from "react";
import {
  siCss,
  siDocker,
  siFastapi,
  siGit,
  siHtml5,
  siJavascript,
  siLangchain,
  siMysql,
  siN8n,
  siNetlify,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siRender,
  siScikitlearn,
  siStreamlit,
  siSupabase,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import { asset } from "@/lib/paths";

type Glyph = { color: string; draw: ReactNode };

const brands: Record<string, SimpleIcon> = {
  Python: siPython,
  Pandas: siPandas,
  NumPy: siNumpy,
  "Scikit-learn": siScikitlearn,
  LangChain: siLangchain,
  n8n: siN8n,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  Streamlit: siStreamlit,
  FastAPI: siFastapi,
  React: siReact,
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  Supabase: siSupabase,
  Docker: siDocker,
  Git: siGit,
  Vercel: siVercel,
  Netlify: siNetlify,
  Render: siRender,
};

const files: Record<string, string> = {
  "SQL Server": "/logos/sqlserver.svg",
  Oracle: "/logos/oracle.svg",
  Matplotlib: "/logos/matplotlib.svg",
  AWS: "/logos/aws.svg",
};

/** Arbre de décision (modèles de boosting). */
const tree = (
  <>
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M12 7.5v3M12 10.5 6 15.5M12 10.5l6 5" />
  </>
);
const database = (
  <>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
    <path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
  </>
);

const glyphs: Record<string, Glyph> = {
  LightGBM: { color: "#2E8B57", draw: tree },
  XGBoost: { color: "#1A73A8", draw: tree },
  CatBoost: { color: "#E8B400", draw: tree },
  LLM: {
    color: "#7C3AED",
    draw: <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18.5 15l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />,
  },
  "Systèmes multi-agents": {
    color: "#0F766E",
    draw: (
      <>
        <circle cx="12" cy="5" r="2.3" />
        <circle cx="5" cy="18" r="2.3" />
        <circle cx="19" cy="18" r="2.3" />
        <path d="M10.8 7 6.2 16M13.2 7l4.6 9M7.3 18h9.4" />
      </>
    ),
  },
  RAG: {
    color: "#DB2777",
    draw: (
      <>
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H15v13H5.5A1.5 1.5 0 0 0 4 18.5z" />
        <circle cx="16.5" cy="16.5" r="3" />
        <path d="m18.7 18.7 2.3 2.3" />
      </>
    ),
  },
  Embeddings: {
    color: "#2563EB",
    draw: (
      <>
        <path d="M4 20V4M4 20h16" />
        <circle cx="9" cy="14" r="1.4" />
        <circle cx="13" cy="9" r="1.4" />
        <circle cx="17" cy="12" r="1.4" />
        <circle cx="15" cy="6" r="1.4" />
      </>
    ),
  },
  "Vector DB": { color: "#9333EA", draw: database },
  SQL: { color: "#0369A1", draw: database },
  "ETL (Pentaho)": {
    color: "#00A0DC",
    draw: (
      <>
        <rect x="3" y="4" width="6" height="6" rx="1.5" />
        <rect x="15" y="14" width="6" height="6" rx="1.5" />
        <path d="M9 7h4a2 2 0 0 1 2 2v5M13 12l2 2 2-2" />
      </>
    ),
  },
  "Power BI": {
    color: "#E8A800",
    draw: (
      <>
        <rect x="4" y="12" width="4" height="8" rx="1" />
        <rect x="10" y="8" width="4" height="12" rx="1" />
        <rect x="16" y="4" width="4" height="16" rx="1" />
      </>
    ),
  },
  "Web scraping": {
    color: "#16A34A",
    draw: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5z" />
      </>
    ),
  },
  Seaborn: {
    color: "#4C72B0",
    draw: <path d="M3 17c3 0 3-6 6-6s3 6 6 6 3-10 6-10M3 21h18" />,
  },
};

export function SkillLogo({ name, size = 28 }: { name: string; size?: number }) {
  const brand = brands[name];
  if (brand) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={`#${brand.hex}`} role="img" aria-label={brand.title}>
        <path d={brand.path} />
      </svg>
    );
  }
  const file = files[name];
  if (file) {
    // eslint-disable-next-line @next/next/no-img-element -- petit SVG statique, pas besoin de next/image
    return <img src={asset(file)} alt={name} width={size} height={size} className="object-contain" style={{ width: size, height: size }} />;
  }
  const g = glyphs[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={g?.color ?? "#64748b"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={name}
    >
      {g?.draw ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

/** Tuile en relief contenant le logo (biseau, reflet, ombres ; le logo flotte au-dessus). */
export function LogoTile({ name, size = 28, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    <span
      className={`tile-3d relative grid shrink-0 place-items-center rounded-2xl ${className}`}
      style={{ width: size + 22, height: size + 22 }}
    >
      <span className="logo-3d relative grid place-items-center">
        <SkillLogo name={name} size={size} />
      </span>
    </span>
  );
}
