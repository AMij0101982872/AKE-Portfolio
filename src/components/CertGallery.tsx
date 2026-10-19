"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Certification } from "@/content/profile";
import { ArrowUpRight, Trophy } from "@/components/Icons";

type Labels = { verify: string; view: string; close: string };
type Cert = Omit<Certification, "date"> & { date: string };

/** Galerie de certificats : miniatures, puis agrandissement au clic (Échap ou clic hors de l'image pour fermer). */
export function CertGallery({ certs, labels }: { certs: Cert[]; labels: Labels }) {
  const [open, setOpen] = useState<Cert | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-accent/10 ${
              c.featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(c)}
              aria-label={`${labels.view} : ${c.title}`}
              className="relative block overflow-hidden border-b border-line bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- export statique, images déjà optimisées */}
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className={`w-full object-cover object-top transition duration-500 group-hover:scale-[1.03] ${
                  c.featured ? "aspect-[1.41] lg:aspect-auto lg:h-full" : "aspect-[1.3]"
                }`}
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition group-hover:bg-ink/30 group-hover:opacity-100">
                <span className="rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink shadow-lg">{labels.view}</span>
              </span>
            </button>
            <div className="flex flex-1 flex-col gap-1 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className={`font-display font-semibold leading-snug ${c.featured ? "text-xl" : "text-base"}`}>
                  {c.featured && <Trophy className="mr-1.5 inline size-4 -translate-y-0.5 text-amber-500" />}
                  {c.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-muted">{c.date}</span>
              </div>
              <p className="text-sm text-muted">{c.issuer}</p>
              {c.verify && (
                <a
                  href={c.verify}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-fit items-center gap-1 pt-3 text-sm font-medium text-accent hover:underline"
                >
                  {labels.verify} <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- export statique */}
              <img src={open.image} alt={open.title} className="max-h-[80vh] w-full rounded-2xl bg-white object-contain shadow-2xl" />
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-white">
                <span>
                  <span className="font-display text-lg font-semibold">{open.title}</span>
                  <span className="ml-2 text-sm text-white/70">
                    {open.issuer} · {open.date}
                  </span>
                </span>
                <span className="flex gap-2">
                  {open.verify && (
                    <a
                      href={open.verify}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                    >
                      {labels.verify} <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="rounded-full border border-white/40 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    {labels.close} ✕
                  </button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
