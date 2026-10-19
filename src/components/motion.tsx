"use client";

/**
 * Briques d'animation (bibliothèque Motion). Toutes respectent
 * « réduire les animations » : MotionConfig reducedMotion="user".
 */
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Barre de progression de lecture fixée en haut de l'écran. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
    />
  );
}

/** Apparition au défilement (une seule fois). */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};

/** Grille dont les enfants (<StaggerItem>) apparaissent en cascade. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Titre dont chaque lettre monte depuis un masque. */
export function SplitTitle({ text, className }: { text: string; className?: string }) {
  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          {Array.from(word).map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%", rotate: 8 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + (w * 5 + i) * 0.04, ease }}
            >
              {ch}
            </motion.span>
          ))}
          {w < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <motion.span
        className="inline-block text-accent"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.75 }}
        aria-hidden
      >
        .
      </motion.span>
    </h1>
  );
}

/** Fondu d'entrée simple au chargement (hero). */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Mots qui défilent les uns après les autres (« Data Scientist », « Créateur d'agents IA »…). */
export function RotatingWords({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-grid overflow-hidden pb-[0.1em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className={`col-start-1 row-start-1 whitespace-nowrap ${className ?? ""}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Élément « aimanté » : suit légèrement le curseur. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Carte qui s'incline en 3D et reflète la lumière sous le curseur. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(500px circle at ${gx} ${gy}, var(--spot), transparent 45%)`;

  return (
    <motion.div
      ref={ref}
      className={`group relative [transform-style:preserve-3d] ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glare }}
      />
      {children}
    </motion.div>
  );
}

/** Inclinaison 3D d'une tuile de logo sous la souris (la tuile .tile-3d et le logo .logo-3d gèrent la profondeur). */
export function Tilt3D({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const rx = useSpring(0, { stiffness: 260, damping: 18 });
  const ry = useSpring(0, { stiffness: 260, damping: 18 });
  const z = useSpring(0, { stiffness: 260, damping: 18 });
  return (
    <motion.span
      ref={ref}
      className={`inline-block [transform-style:preserve-3d] ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, z, transformPerspective: 500 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 50);
        rx.set(-py * 50);
        z.set(18);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        z.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Nombre qui compte jusqu'à sa valeur quand il apparaît (ex. « 4 », « 1ère »). */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || !match) return;
    const c = animate(0, Number(match[1]), { duration: 1.4, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{match ? `${n}${match[2]}` : value}</span>;
}

/** Bandeau défilant infini. Chaque élément est rendu côté serveur (logo + nom). */
export function Marquee({ items, reverse = false }: { items: { key: string; node: ReactNode }[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul
        className={`marquee flex shrink-0 gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: `${items.length * 2.6}s` }}
      >
        {row.map((it, i) => (
          <li key={`${it.key}-${i}`} aria-hidden={i >= items.length || undefined}>
            {it.node}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ligne verticale de la frise qui se remplit au défilement. */
export function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <div ref={ref} className="absolute bottom-2 left-[7px] top-2 w-px bg-line" aria-hidden>
      <motion.div style={{ scaleY }} className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2" />
    </div>
  );
}

/** Léger effet de profondeur : l'élément remonte plus lentement que la page quand on défile. */
export function Parallax({ children, className, distance = 80 }: { children: ReactNode; className?: string; distance?: number }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -distance]);
  const scale = useTransform(scrollY, [0, 700], [1, 1.04]);
  return (
    <motion.div className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}

/** Élément qui apparaît puis flotte doucement en boucle (badges du hero). */
export function Float({
  children,
  delay = 0,
  amplitude = 10,
  className,
}: {
  children: ReactNode;
  delay?: number;
  amplitude?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -amplitude, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { type: "spring", stiffness: 260, damping: 18, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Halos d'arrière-plan : dégradés radiaux (pas de filtre de flou, très léger pour le GPU). */
export function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora absolute -top-56 right-[-15%] size-[44rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_28%,transparent),transparent)]" />
      <div className="aurora aurora-2 absolute -left-56 top-24 size-[38rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent)]" />
    </div>
  );
}
