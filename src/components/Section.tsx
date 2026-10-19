import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

export function Section({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 sm:mb-16">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span>{index}</span>
            <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" aria-hidden />
            {kicker && <span className="text-muted">{kicker}</span>}
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
