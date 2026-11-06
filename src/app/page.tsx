import { LandingHero } from "@/components/home/LandingHero";
import { yearEras } from "@/data/yearEras";

export default function HomePage() {
  return <LandingHero eras={yearEras} />;
}
