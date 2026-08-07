import Link from "next/link";
import type { Era } from "@/types/archive";

export function HomeEraSection({ era, index }: { era: Era; index: number }) {
  return (
    <section id={era.slug} className="scroll-mt-6 border-t border-archive-border px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-10 md:flex-row md:gap-20">
        <div><p className="text-sm text-archive-muted">{String(index + 1).padStart(2, "0")} / {era.period}</p><h2 className="mt-3 text-4xl font-medium tracking-tight md:text-6xl">{era.title}</h2></div>
        <div className="max-w-md md:pt-2"><p className="text-lg leading-relaxed text-archive-muted">{era.description}</p><Link href={`/era/${era.slug}`} className="mt-8 inline-block border-b border-archive-text pb-1 text-lg transition-opacity hover:opacity-50">Enter archive</Link></div>
      </div>
    </section>
  );
}
