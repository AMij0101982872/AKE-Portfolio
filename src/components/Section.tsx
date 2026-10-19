import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[220px_1fr] lg:gap-16">
        <header className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs tracking-widest text-accent">{index}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
