"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getYearEra, getYearEraForProject, getYearProject } from "@/data/yearEras";

const d2CodingFontPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/fonts/D2Coding.ttf`;
const d2CodingBoldFontPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/fonts/D2CodingBold.ttf`;

export function D2CodingFontSource() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: "D2Coding";
        src: url("${d2CodingFontPath}") format("truetype");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3, U+D7B0-D7FF;
      }

      @font-face {
        font-family: "D2Coding";
        src: url("${d2CodingBoldFontPath}") format("truetype");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        unicode-range: U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3, U+D7B0-D7FF;
      }
    `}</style>
  );
}

const eraNavigation = {
  "2023": { label: "2023", href: "/era/2023" },
  "2024": { label: "2024", href: "/era/2024" },
  "2025": { label: "2025", href: "/era/2025" },
  "2026": { label: "2026", href: "/era/2026" },
} as const;

const hierarchyGuardKey = "__huykHierarchyGuard";
const landingHierarchyReturnKey = "__huykLandingHierarchyReturn";

type HierarchyGuard = {
  path: string;
  parentPath: string;
};

function isMatchingHierarchyGuard(
  value: unknown,
  path: string,
  parentPath: string,
): value is HierarchyGuard {
  if (!value || typeof value !== "object") return false;

  const guard = value as Partial<HierarchyGuard>;
  return guard.path === path && guard.parentPath === parentPath;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPath = pathname.replace(/\/$/, "");
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const eraSlug = pathSegments[0] === "era" ? pathSegments[1] : undefined;
  const projectSlug = pathSegments[2] === "project" ? pathSegments[3] : undefined;
  const project = eraSlug && projectSlug ? getYearProject(eraSlug, projectSlug) : undefined;
  const projectYear = eraSlug && projectSlug ? getYearEraForProject(eraSlug, projectSlug) : undefined;
  const era = projectYear
    ? eraNavigation[projectYear.slug]
    : eraSlug && getYearEra(eraSlug)
      ? eraNavigation[eraSlug as keyof typeof eraNavigation]
      : undefined;
  const projectTitle = project?.title;
  const hierarchyParentPath = era
    ? projectSlug
      ? era.href
      : "/"
    : null;
  const hierarchyParentPathRef = useRef<string | null>(hierarchyParentPath);
  const isHierarchyNavigationRef = useRef(false);

  useEffect(() => {
    hierarchyParentPathRef.current = hierarchyParentPath;

    if (isHierarchyNavigationRef.current) {
      isHierarchyNavigationRef.current = false;
    }
  }, [hierarchyParentPath]);

  useEffect(() => {
    if (!hierarchyParentPath) return;

    const currentHistoryState = (window.history.state ?? {}) as Record<string, unknown>;
    if (isMatchingHierarchyGuard(
      currentHistoryState[hierarchyGuardKey],
      normalizedPath,
      hierarchyParentPath,
    )) {
      return;
    }

    window.history.pushState(
      {
        ...currentHistoryState,
        [hierarchyGuardKey]: {
          path: normalizedPath,
          parentPath: hierarchyParentPath,
        } satisfies HierarchyGuard,
      },
      "",
      window.location.href,
    );
  }, [hierarchyParentPath, normalizedPath]);

  useEffect(() => {
    const handlePopState = () => {
      const parentPath = hierarchyParentPathRef.current;
      if (!parentPath || isHierarchyNavigationRef.current) return;

      isHierarchyNavigationRef.current = true;
      if (parentPath === "/") {
        window.sessionStorage.setItem(landingHierarchyReturnKey, "eras");
      }

      router.replace(parentPath);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [normalizedPath, router]);

  if (pathname === "/") return null;

  const staticPageLabel = normalizedPath === "/contact"
    ? "contact"
    : normalizedPath === "/about"
      ? "about"
      : null;

  if (staticPageLabel) {
    return (
      <>
        <D2CodingFontSource />
        <header className="px-6 py-5 md:px-10">
          <nav aria-label="Archive path" className="inline-flex -translate-x-[6px] -translate-y-4 items-center text-xs tracking-tight">
            <Link href="/" className="font-bold transition-opacity hover:opacity-60" style={{ fontWeight: 700 }}>huyk</Link>
            <span className="mx-1.5 font-normal" aria-hidden="true">-</span>
            <span className="font-normal" aria-current="page">{staticPageLabel}</span>
          </nav>
        </header>
      </>
    );
  }

  if (era) {
    return (
      <>
        <D2CodingFontSource />
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
      </>
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
