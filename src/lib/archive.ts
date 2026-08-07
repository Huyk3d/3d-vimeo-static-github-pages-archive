import { eras } from "@/data/eras";

export function getEra(slug: string) {
  return eras.find((era) => era.slug === slug);
}

export function getProject(eraSlug: string, projectSlug: string) {
  return getEra(eraSlug)?.projects.find((project) => project.slug === projectSlug);
}
