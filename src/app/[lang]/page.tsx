import Image from "next/image";
import Link from "next/link";
import { isLocale, ui, type Locale } from "@/content/i18n";
import { profile, type Project } from "@/content/profile";
import { Section } from "@/components/Section";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowRight, ArrowUpRight, Briefcase, Download, LinkIcon, Mail, MapPin, Trophy } from "@/components/Icons";
import {
  Aurora,
  CountUp,
  FadeIn,
  Float,
  Magnetic,
  Marquee,
  MotionProvider,
  Parallax,
  Reveal,
  RotatingWords,
  ScrollProgress,
  SplitTitle,
  Stagger,
  StaggerItem,
  Tilt3D,
  TiltCard,
  TimelineLine,
} from "@/components/motion";
import { LogoTile } from "@/components/SkillLogo";
import { CertGallery } from "@/components/CertGallery";
import { asset } from "@/lib/paths";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "fr";
  const other: Locale = lang === "fr" ? "en" : "fr";
  const nav = ["about", "skills", "projects", "experience", "certifications", "contact"] as const;
  const featured = profile.projects.filter((p) => p.featured);
  const others = profile.projects.filter((p) => !p.featured);
  const toolGroups = profile.skills;
  const allSkills = toolGroups.flatMap((g) => g.items).map((name) => ({
    key: name,
    node: (
      <span className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-line bg-surface py-1.5 pl-1.5 pr-4 text-sm font-medium">
        <LogoTile name={name} size={20} className="rounded-lg" />
        {name}
      </span>
    ),
  }));
  const half = Math.ceil(allSkills.length / 2);

  return (
    <MotionProvider>
      <ScrollProgress />

      {/* ── En-tête flottant ─────────────────────── */}
      <header className="fixed inset-x-0 top-3 z-40 px-3">
        <FadeIn className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border border-line/80 bg-surface/85 pl-2 pr-2 shadow-lg shadow-black/5 backdrop-blur-md">
          <a href="#top" className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 font-display text-sm font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-white">
              IA
            </span>
            <span className="hidden sm:inline">{profile.shortName}</span>
          </a>
          <nav className="no-scrollbar flex min-w-0 items-center gap-0.5 overflow-x-auto text-sm text-muted">
            {nav.map((k) => (
              <a key={k} href={`#${k}`} className="shrink-0 rounded-full px-3 py-1.5 transition hover:bg-bg hover:text-ink">
                {ui.nav[k][lang]}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href={`/${other}/`}
              hrefLang={other}
              className="grid h-9 place-items-center rounded-full border border-line px-3 font-mono text-xs text-muted transition hover:border-accent hover:text-accent"
            >
              {ui.switchTo[lang]}
            </Link>
            <ThemeToggle label={lang === "fr" ? "Changer de thème" : "Toggle theme"} />
          </div>
        </FadeIn>
      </header>

      <main id="top">
        {/* ── Hero ─────────────────────────────── */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
          <Aurora />
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <FadeIn>
                <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-xs text-muted">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  {profile.availability[lang]}
                </p>
              </FadeIn>

              <SplitTitle
                text={profile.name}
                className="mt-7 font-display text-5xl font-bold leading-[1] tracking-tight sm:text-7xl"
              />

              <FadeIn delay={0.55}>
                <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5 font-display text-2xl font-medium sm:text-3xl">
                  <span className="text-muted">{ui.iAm[lang]}</span>
                  <RotatingWords words={profile.roles[lang]} className="text-gradient" />
                </p>
              </FadeIn>

              <FadeIn delay={0.7}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline[lang]}</p>
              </FadeIn>

              <FadeIn delay={0.85} className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg shadow-xl shadow-accent/20 transition hover:bg-accent hover:text-accent-ink"
                  >
                    {ui.cta.projects[lang]}
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={asset(profile.cvFile)}
                    download="CV-Ivan-Ake.pdf"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-6 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
                  >
                    <Download className="size-4" />
                    {ui.cta.cv[lang]}
                  </a>
                </Magnetic>
                {profile.links.map((l) => (
                  <Magnetic key={l.label} strength={0.45}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={l.label}
                      title={l.label}
                      className="grid size-11 place-items-center rounded-full border border-line bg-surface/80 text-muted transition hover:border-accent hover:text-accent"
                    >
                      <LinkIcon label={l.label} />
                    </a>
                  </Magnetic>
                ))}
              </FadeIn>
            </div>

            {/* Photo sans cadre : elle se fond dans le fond de page (masque en dégradé) */}
            <FadeIn delay={0.35} className="relative mx-auto w-72 sm:w-96 lg:-mr-10 lg:w-[30rem]">
              <div
                className="absolute inset-x-[8%] top-[10%] bottom-[5%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_35%,transparent),color-mix(in_oklab,var(--accent-2)_15%,transparent)_60%,transparent)]"
                aria-hidden
              />
              <Parallax>
                <Image
                  src={asset(profile.photo)}
                  alt={profile.name}
                  width={977}
                  height={1080}
                  priority
                  className="relative w-full [mask-image:radial-gradient(closest-side,black_52%,transparent_100%)]"
                />
              </Parallax>

              <Float delay={1.1} className="absolute -left-2 top-[62%] sm:-left-10">
                <p className="flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-3.5 py-2.5 text-xs font-medium shadow-xl">
                  <span className="grid size-7 place-items-center rounded-lg bg-amber-400/15 text-amber-500">
                    <Trophy className="size-4" />
                  </span>
                  {profile.highlight[lang]}
                </p>
              </Float>
              <Float delay={1.3} amplitude={8} className="absolute right-0 top-[16%] sm:-right-2">
                <p className="flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-3.5 py-2.5 text-xs font-medium shadow-xl">
                  <span className="grid size-7 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Briefcase className="size-4" />
                  </span>
                  {profile.experience.length} {ui.internships[lang]}
                </p>
              </Float>
              <Float delay={1.5} amplitude={6} className="absolute bottom-[6%] right-[8%]">
                <p className="flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs text-muted shadow-lg">
                  <MapPin className="size-3.5 text-accent" />
                  {profile.location}
                </p>
              </Float>
            </FadeIn>
          </div>

          {/* Indicateur de défilement */}
          <Float delay={1.8} amplitude={6} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
            <a href="#about" className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {ui.scroll[lang]}
              <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
                <span className="h-2 w-0.5 rounded-full bg-accent" />
              </span>
            </a>
          </Float>
        </section>

        {/* ── Bandeau de technologies ──────────── */}
        <div className="space-y-3 border-y border-line/70 bg-surface/40 py-6">
          <Marquee items={allSkills.slice(0, half)} />
          <Marquee items={allSkills.slice(half)} reverse />
        </div>

        {/* ── À propos (bento) ─────────────────── */}
        <Section id="about" index="01" title={ui.sections.about[lang]}>
          <Stagger className="grid gap-4 md:grid-cols-3">
            <StaggerItem className="md:col-span-2 md:row-span-2">
              <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-surface p-7 sm:p-9">
                <div className="space-y-5 text-lg leading-relaxed text-muted">
                  {profile.about.map((p, i) => (
                    <p key={i} className={i === 0 ? "text-xl text-ink" : undefined}>
                      {p[lang]}
                    </p>
                  ))}
                </div>
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {profile.availability[lang]}
                </p>
              </div>
            </StaggerItem>
            {profile.stats.map((s, i) => (
              <StaggerItem key={s.value + s.label.en} className={i === 2 ? "md:col-span-1" : undefined}>
                <div className="group h-full rounded-3xl border border-line bg-surface p-7 transition hover:border-accent">
                  <p className="text-gradient font-display text-5xl font-bold tracking-tight">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label[lang]}</p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem className="md:col-span-2">
              <div className="flex h-full items-center gap-4 rounded-3xl border border-line bg-gradient-to-br from-accent/10 via-surface to-accent-2/10 p-7">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface text-accent shadow-sm">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">{ui.basedIn[lang]}</p>
                  <p className="font-display text-xl font-semibold">{profile.location}</p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </Section>

        {/* ── Compétences ──────────────────────── */}
        <Section id="skills" index="02" title={ui.sections.skills[lang]}>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {toolGroups.map((g) => (
              <StaggerItem key={g.group.en}>
                <div className="h-full rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/5">
                  <h3 className="font-display text-lg font-semibold">{g.group[lang]}</h3>
                  <ul className="mt-5 grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-4">
                    {g.items.map((s) => (
                      <li key={s} className="group flex flex-col items-center gap-2 text-center">
                        <Tilt3D>
                          <LogoTile name={s} size={30} />
                        </Tilt3D>
                        <span className="text-xs leading-tight text-muted transition group-hover:text-ink">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── Projets ──────────────────────────── */}
        <Section id="projects" index="03" title={ui.sections.projects[lang]}>
          <div className="space-y-6">
            {featured.map((p, i) => (
              <Reveal key={p.title}>
                <TiltCard className="rounded-3xl">
                  <FeaturedCard p={p} lang={lang} n={i + 1} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
          {others.length > 0 && (
            <>
              <Reveal>
                <h3 className="mt-20 font-mono text-xs uppercase tracking-[0.25em] text-muted">{ui.moreProjects[lang]}</h3>
              </Reveal>
              <Stagger className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {others.map((p) => (
                  <StaggerItem key={p.title}>
                    <ProjectCard p={p} lang={lang} />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}
        </Section>

        {/* ── Parcours ─────────────────────────── */}
        <Section id="experience" index="04" title={ui.sections.experience[lang]}>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
            <ol className="relative space-y-6">
              <TimelineLine />
              {profile.experience.map((e) => (
                <li key={e.org + e.period.en} className="relative pl-10">
                  <span className="absolute left-0 top-7 z-10 grid size-[15px] place-items-center rounded-full bg-bg">
                    <span className="size-[9px] rounded-full bg-gradient-to-br from-accent to-accent-2" />
                  </span>
                  <Reveal>
                    <div className="rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-xl font-semibold">{e.org}</h3>
                        <span className="rounded-full bg-bg px-2.5 py-0.5 font-mono text-xs text-muted">{e.period[lang]}</span>
                      </div>
                      <p className="mt-1 text-sm text-accent">
                        {e.role[lang]} <span className="text-muted">· {e.place}</span>
                      </p>
                      <ul className="mt-4 space-y-2 text-[15px] text-muted">
                        {e.points.map((pt, i) => (
                          <li key={i} className="flex gap-2.5">
                            <ArrowRight className="mt-1 size-3.5 shrink-0 text-accent" />
                            {pt[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{ui.sections.education[lang]}</h3>
              </Reveal>
              <Stagger className="mt-6 space-y-3">
                {profile.education.map((ed) => (
                  <StaggerItem key={ed.school + ed.period}>
                    <div className="rounded-2xl border border-line bg-surface p-5 transition hover:border-accent">
                      <span className="font-mono text-xs text-accent">{ed.period}</span>
                      <p className="mt-1 font-medium leading-snug">{ed.degree[lang]}</p>
                      <p className="mt-1 text-sm text-muted">
                        {ed.school} · {ed.place}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Section>

        {/* ── Certifications ───────────────────── */}
        <Section id="certifications" index="05" title={ui.sections.certifications[lang]}>
          <CertGallery
            certs={profile.certifications.map((c) => ({ ...c, image: asset(c.image), date: c.date[lang] }))}
            labels={{ verify: ui.cta.verify[lang], view: ui.cta.view[lang], close: ui.cta.close[lang] }}
          />
        </Section>

        {/* ── Contact ──────────────────────────── */}
        <section id="contact" className="relative overflow-hidden bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent)] px-4 py-28 sm:px-6 sm:py-40">
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">06 · {ui.nav.contact[lang]}</p>
            <h2 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="text-gradient">{ui.sections.contact[lang]}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{ui.contactText[lang]}</p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 font-medium text-bg shadow-2xl shadow-accent/25 transition hover:bg-accent hover:text-accent-ink"
                >
                  <Mail className="size-5" />
                  {profile.email}
                </a>
              </Magnetic>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {profile.links.map((l) => (
                <Magnetic key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
                  >
                    <LinkIcon label={l.label} className="size-4" />
                    {l.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-8 font-mono text-xs text-muted sm:px-6">
          <span>© {process.env.NEXT_PUBLIC_BUILD_YEAR} {profile.name}</span>
          <span>{ui.builtWith[lang]}</span>
        </div>
      </footer>
    </MotionProvider>
  );
}

function ProjectLinks({ p, lang }: { p: Project; lang: Locale }) {
  if (!p.repo && !p.demo) return null;
  return (
    <span className="flex gap-4 text-sm">
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
          {ui.cta.code[lang]} <ArrowUpRight className="size-3.5" />
        </a>
      )}
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
          {ui.cta.demo[lang]} <ArrowUpRight className="size-3.5" />
        </a>
      )}
    </span>
  );
}

function FeaturedCard({ p, lang, n }: { p: Project; lang: Locale; n: number }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 transition duration-300 group-hover:border-accent sm:p-10">
      <span
        className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[9rem] font-bold leading-none text-transparent opacity-60 [-webkit-text-stroke:1.5px_var(--line)] sm:text-[12rem]"
        aria-hidden
      >
        {String(n).padStart(2, "0")}
      </span>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white">
            {ui.featured[lang]}
          </span>
          <span className="font-mono text-xs text-muted">{p.year}</span>
        </div>
        <h3 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{p.summary[lang]}</p>
        {p.highlights && (
          <ul className="mt-6 grid max-w-4xl gap-3 text-sm text-muted sm:grid-cols-2">
            {p.highlights.map((h, i) => {
              const [head, ...rest] = h[lang].split(" — ");
              return (
                <li key={i} className="flex gap-2.5 rounded-2xl border border-line bg-bg/60 p-3.5">
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>
                    {rest.length > 0 ? (
                      <>
                        <strong className="font-semibold text-ink">{head}</strong> — {rest.join(" — ")}
                      </>
                    ) : (
                      head
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              {t}
            </span>
          ))}
          <span className="ml-auto">
            <ProjectLinks p={p} lang={lang} />
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ p, lang }: { p: Project; lang: Locale }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">{p.title}</h3>
        <span className="shrink-0 font-mono text-xs text-muted">{p.year}</span>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.summary[lang]}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <ProjectLinks p={p} lang={lang} />
        <ArrowUpRight className="ml-auto size-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </article>
  );
}
