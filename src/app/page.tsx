import { content } from "@/config/content";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-8 py-24">
      <p className="font-sans text-xs uppercase tracking-[0.14em] text-taupe">
        01 — Introduction
      </p>

      <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
        {content.hero.name}.
      </h1>

      <p className="mt-4 max-w-lg font-display text-xl italic text-taupe">
        Software engineer crafting{" "}
        <span className="text-accent">calm, useful</span> web products.
      </p>

      <div className="mt-16 border-t border-hairline pt-6">
        <p className="font-sans text-sm text-ink-soft">
          Foundation in place — Fraunces display, Inter body, warm paper canvas,
          terracotta accent. Sections will follow.
        </p>
      </div>
    </main>
  );
}
