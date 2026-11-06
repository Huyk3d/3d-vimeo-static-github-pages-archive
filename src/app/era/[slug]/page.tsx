import { notFound, redirect } from "next/navigation";
import { StudentGallery } from "@/components/era/StudentGallery";
import { Vdas02Gallery } from "@/components/era/Vdas02Gallery";
import { VdasGallery } from "@/components/era/VdasGallery";
import { YearGallery } from "@/components/era/YearGallery";
import { getYearEra, yearEras } from "@/data/yearEras";

const legacyEraSlugs = ["when-student-01", "vdas-01", "vdas-02"] as const;

export function generateStaticParams() {
  return [
    ...yearEras.map((year) => ({ slug: year.slug })),
    ...legacyEraSlugs.map((slug) => ({ slug })),
    { slug: "when-student-02" },
  ];
}

export default function EraPage({ params }: { params: { slug: string } }) {
  if (params.slug === "when-student-02") {
    redirect("/era/vdas-01");
  }

  const year = getYearEra(params.slug);
  if (year) return <YearGallery year={year} />;

  if (params.slug === "when-student-01") {
    return <StudentGallery />;
  }

  if (params.slug === "vdas-01") {
    return <VdasGallery />;
  }

  if (params.slug === "vdas-02") {
    return <Vdas02Gallery />;
  }

  notFound();
}
