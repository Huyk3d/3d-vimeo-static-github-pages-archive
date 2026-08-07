import type { Era } from "@/types/archive";
import { EraCard } from "./EraCard";

export function EraList({ eras }: { eras: Era[] }) {
  return <div>{eras.map((era) => <EraCard key={era.slug} era={era} />)}</div>;
}
