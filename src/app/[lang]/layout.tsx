import type { Metadata } from "next";
import { notFound } from "next/navigation";
// Polices auto-hébergées (npm) : le build ne dépend pas de Google Fonts, donc il est reproductible en Docker/CI.
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "../globals.css";
import { isLocale, locales } from "@/content/i18n";
import { profile } from "@/content/profile";
import { themeScript } from "@/components/ThemeToggle";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${profile.shortName} — ${profile.role[lang]}`,
    description: profile.tagline[lang],
    alternates: { languages: { fr: "/fr/", en: "/en/" } },
    openGraph: {
      title: profile.shortName,
      description: profile.tagline[lang],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className="antialiased"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
