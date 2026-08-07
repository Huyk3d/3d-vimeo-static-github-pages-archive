import Image from "next/image";
import type { Project } from "@/types/archive";
import { VimeoEmbed } from "./VimeoEmbed";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12 md:px-10 md:py-20">
      <header className="mb-12">
        <p className="text-sm text-archive-muted">{project.client} · {project.year}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
      </header>
      <div className="space-y-10">
        {project.blocks.map((block, index) => {
          if (block.type === "image") return <figure key={index}><Image src={block.src} alt={block.alt} width={1600} height={1200} className="h-auto w-full" />{block.caption && <figcaption className="mt-2 text-sm text-archive-muted">{block.caption}</figcaption>}</figure>;
          if (block.type === "vimeo") return <VimeoEmbed key={index} videoId={block.videoId} title={block.title} />;
          return <section key={index} className="max-w-2xl">{block.heading && <h2 className="mb-3 text-xl font-bold">{block.heading}</h2>}<p className="leading-7 text-archive-muted">{block.body}</p></section>;
        })}
      </div>
    </article>
  );
}
