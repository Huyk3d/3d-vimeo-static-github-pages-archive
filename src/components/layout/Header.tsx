"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const normalizedPath = pathname.replace(/\/$/, "");
  const isVdasPage = normalizedPath.includes("/era/when-student-01") || normalizedPath.includes("/era/when-student-02") || normalizedPath.includes("/era/vdas-");

  return (
    <header className={`${isVdasPage ? "" : "border-b border-archive-border "}px-6 py-5 md:px-10`}>
      <Link href="/" className={`${isVdasPage ? "inline-block -translate-x-[6px] -translate-y-4 text-xs" : "text-sm"} font-bold tracking-tight`}>
        {isVdasPage ? "huyk" : "ARCHIVE"}
      </Link>
    </header>
  );
}
