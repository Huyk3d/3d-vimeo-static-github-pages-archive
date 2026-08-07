import { HeroWork } from "@/components/home/HeroWork";
import { LandingHero } from "@/components/home/LandingHero";
import { eras } from "@/data/eras";

export default function HomePage() {
  const featuredEra = eras[0];
  const featuredProject = featuredEra.projects[0];

  return <>
    <LandingHero eras={eras} heroImage={featuredProject.thumbnail} />
    <HeroWork era={featuredEra} project={featuredProject} />
  </>;
}
