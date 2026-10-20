import { LandingHero } from "@/components/home/LandingHero";
import { eras } from "@/data/eras";

export default function HomePage() {
  return <LandingHero eras={eras} />;
}
