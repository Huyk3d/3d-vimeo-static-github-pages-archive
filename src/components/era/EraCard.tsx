import Link from "next/link";
import type { Era } from "@/types/archive";

export function EraCard({ era }: { era: Era }) {
  return (
    <Link href={`/era/${era.slug}`} className="block border-t border-archive-border py-8 transition-opacity hover:opacity-60">
      <p className="mb-2 text-sm text-archive-muted">{era.period}</p>
      <h2 className="text-2xl font-bold tracking-tight md:text-4xl">{era.title}</h2>
      <p className="mt-3 max-w-xl text-sm text-archive-muted">{era.description}</p>
    </Link>
  );
}
