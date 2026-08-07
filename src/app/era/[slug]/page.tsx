import { notFound } from "next/navigation";
import { CategoryGallery } from "@/components/era/CategoryGallery";
import { HorizontalGallery } from "@/components/project/HorizontalGallery";
import { eras } from "@/data/eras";
import { getEra } from "@/lib/archive";

export function generateStaticParams() {
  return eras.map((era) => ({ slug: era.slug }));
}

export default function EraPage({ params }: { params: { slug: string } }) {
  const era = getEra(params.slug);
  if (!era) notFound();

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto mb-12 max-w-5xl px-6 md:px-10">
        <p className="text-sm text-archive-muted">{era.period}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{era.title}</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-archive-muted">{era.description}</p>
        {era.categories && <div className="mt-10"><CategoryGallery era={era} /></div>}
      </div>
      {!era.categories && <div className="pl-6 md:pl-10"><HorizontalGallery eraSlug={era.slug} projects={era.projects} /></div>}
    </section>
  );
}
