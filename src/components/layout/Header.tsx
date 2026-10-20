"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const eraNavigation = {
  "when-student-01": { label: "Student", href: "/era/when-student-01" },
  "vdas-01": { label: "VDAS_01", href: "/era/vdas-01" },
  "vdas-02": { label: "VDAS_02", href: "/era/vdas-02" },
} as const;

const projectTitles: Record<string, string> = {
  "when-student-01/nintendo": "Nintendo",
  "when-student-01/airbnb": "Airbnb",
  "when-student-01/student-01": "GAMEBOY CLASSIC",
  "when-student-01/student-02": "THE NATURE",
  "when-student-01/student-03": "HELLO!",
  "when-student-01/student-04": "The Legend of Zelda Movie Opening",
  "when-student-01/student-05": "WELCOME TO TOY WORLD",
  "when-student-01/student-06": "iMac (2023)",
  "when-student-01/student-07": "Can be Anything",
  "when-student-01/student-08": "가스수소 안전공모전",
  "when-student-01/student-09": "My Day",
  "when-student-01/student-10": "LG 공모전",
  "when-student-01/student-11": "Bounce Ball",
  "when-student-01/student-12": "Character Design",
  "when-student-01/student-13": "Loopse Lives, Silent Escape",
  "when-student-01/student-14": "Apple Brand Artwork",
  "when-student-01/student-15": "친환경 소비 숏폼 공모전",
  "vdas-01/balmuda": "BALMUDA",
  "vdas-01/aesop": "Aesop",
  "vdas-01/vdas-01-01": "Balmuda Rain",
  "vdas-01/vdas-01-02": "Artworks",
  "vdas-01/vdas-01-03": "TOY RACING",
  "vdas-01/vdas-01-04": "Case Study - Showcase",
  "vdas-02/vdas-02-01": "VDAS 02 Study 01",
};

export function Header() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const normalizedPath = pathname.replace(/\/$/, "");
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const eraSlug = pathSegments[0] === "era" ? pathSegments[1] : undefined;
  const era = eraSlug ? eraNavigation[eraSlug as keyof typeof eraNavigation] : undefined;
  const projectSlug = pathSegments[2] === "project" ? pathSegments[3] : undefined;
  const projectTitle = eraSlug && projectSlug ? projectTitles[`${eraSlug}/${projectSlug}`] : undefined;

  if (normalizedPath === "/contact") {
    return (
      <header className="px-6 py-5 md:px-10">
        <nav aria-label="Archive path" className="inline-flex -translate-x-[6px] -translate-y-4 items-center text-xs tracking-tight">
          <Link href="/" className="font-bold transition-opacity hover:opacity-60" style={{ fontWeight: 700 }}>huyk</Link>
          <span className="mx-1.5 font-normal" aria-hidden="true">-</span>
          <span className="font-normal" aria-current="page">Info</span>
        </nav>
      </header>
    );
  }

  if (era) {
    return (
      <header className="px-6 py-5 md:px-10">
        <nav aria-label="Archive path" className="inline-flex -translate-x-[6px] -translate-y-4 items-center text-xs tracking-tight">
          <Link href="/" className="font-bold transition-opacity hover:opacity-60" style={{ fontWeight: 700 }}>huyk</Link>
          <span className="mx-1.5 font-normal" aria-hidden="true">-</span>
          <Link href={era.href} className="font-normal transition-opacity hover:opacity-60">{era.label}</Link>
          {projectTitle && (
            <>
              <span className="mx-1.5 font-normal" aria-hidden="true">-</span>
              <span className="font-normal" aria-current="page">{projectTitle}</span>
            </>
          )}
        </nav>
      </header>
    );
  }

  return (
    <header className="border-b border-archive-border px-6 py-5 md:px-10">
      <Link href="/" className="text-sm font-bold tracking-tight">
        ARCHIVE
      </Link>
    </header>
  );
}
