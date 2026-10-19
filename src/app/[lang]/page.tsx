import Link from "next/link";
import { isLocale, ui, type Locale } from "@/content/i18n";
import { profile } from "@/content/profile";
import { Section } from "@/components/Section";
import { ThemeToggle } from "@/components/ThemeToggle";
import { asset } from "@/lib/paths";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "fr";
  const other: Locale = lang === "fr" ? "en" : "fr";
  const nav = ["about", "skills", "projects", "experience", "contact"] as const;

  return (
    <>
      {/* ── En-tête ─────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="font-display text-sm font-semibold tracking-tight">
            {profile.shortName}
            <span className="text-accent">.</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
            {nav.map((k) => (
              <a key={k} href={`#${k}`} className="transition hover:text-ink">
                {ui.nav[k][lang]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={`/${other}/`}
              hrefLang={other}
              className="grid h-9 place-items-center rounded-full border border-line px-3 font-mono text-xs text-muted transition hover:border-accent hover:text-accent"
            >
              {ui.switchTo[lang]}
            </Link>
            <ThemeToggle label={lang === "fr" ? "Changer de thème" : "Toggle theme"} />
          </div>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ─────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pt-32">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {profile.availability[lang]}
            </p>
            <h1 className="mt-8 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {profile.tagline[lang]}
            </h1>
            <p className="mt-6 font-mono text-sm text-muted">
              {profile.name} — {profile.role[lang]} · {profile.location}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition hover:opacity-90"
              >
                {ui.cta.projects[lang]}
              </a>
              <a
                href={asset(profile.cvFile)}
                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition hover:border-accent"
              >
                {ui.cta.cv[lang]}
              </a>
            </div>
          </div>
        </section>

        {/* ── À propos ─────────────────────────── */}
        <Section id="about" index="01" title={ui.sections.about[lang]}>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
            {profile.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : undefined}>
                {p[lang]}
              </p>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {profile.stats.map((s) => (
              <div key={s.value + s.label.en} className="flex flex-col-reverse bg-surface p-6">
                <dt className="mt-1 text-sm text-muted">{s.label[lang]}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── Compétences ──────────────────────── */}
        <Section id="skills" index="02" title={ui.sections.skills[lang]}>
          <div className="grid gap-8 sm:grid-cols-2">
            {profile.skills.map((g) => (
              <div key={g.group.en}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{g.group[lang]}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Projets ──────────────────────────── */}
        <Section id="projects" index="03" title={ui.sections.projects[lang]}>
          <div className="grid gap-5 md:grid-cols-2">
            {profile.projects.map((p) => (
              <article
                key={p.title}
                className={`group flex flex-col rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:border-accent motion-reduce:transition-none ${
                  p.featured ? "md:min-h-64" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                </div>
                <p className="mt-3 leading-relaxed text-muted">{p.summary[lang]}</p>
                {p.highlights && (
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    {p.highlights.map((h, i) => (
                      <li key={i}>→ {h[lang]}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] text-accent">
                      #{t}
                    </span>
                  ))}
                  <span className="ml-auto flex gap-3 text-sm">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                        {ui.cta.code[lang]} ↗
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                        {ui.cta.demo[lang]} ↗
                      </a>
                    )}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ── Parcours ─────────────────────────── */}
        <Section id="experience" index="04" title={ui.sections.experience[lang]}>
          <ol className="space-y-10 border-l border-line pl-6">
            {profile.experience.map((e) => (
              <li key={e.org + e.period.en} className="relative">
                <span className="absolute -left-[29px] top-2 size-2.5 rounded-full border-2 border-bg bg-accent" />
                <p className="font-mono text-xs text-muted">{e.period[lang]}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {e.role[lang]} · <span className="text-accent">{e.org}</span>
                </h3>
                <p className="text-sm text-muted">{e.place}</p>
                <ul className="mt-3 space-y-1.5 text-muted">
                  {e.points.map((pt, i) => (
                    <li key={i}>{pt[lang]}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-mono text-xs uppercase tracking-widest text-muted">
            {ui.sections.education[lang]}
          </h3>
          <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
            {profile.education.map((ed) => (
              <li key={ed.school + ed.period} className="flex flex-wrap items-baseline justify-between gap-2 p-5">
                <div>
                  <p className="font-medium">{ed.degree[lang]}</p>
                  <p className="text-sm text-muted">
                    {ed.school} · {ed.place}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted">{ed.period}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Contact ──────────────────────────── */}
        <Section id="contact" index="05" title={ui.sections.contact[lang]}>
          <p className="max-w-xl text-lg text-muted">{ui.contactText[lang]}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block break-all font-display text-2xl font-semibold tracking-tight underline decoration-accent decoration-2 underline-offset-8 transition hover:text-accent sm:text-4xl"
          >
            {profile.email}
          </a>
          <ul className="mt-10 flex flex-wrap gap-3">
            {profile.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-line px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-8 font-mono text-xs text-muted sm:px-6">
          <span>© {process.env.NEXT_PUBLIC_BUILD_YEAR} {profile.name}</span>
          <span>{ui.builtWith[lang]}</span>
        </div>
      </footer>
    </>
  );
}
