"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="border-b border-archive-border px-6 py-5 md:px-10">
      <Link href="/" className="text-sm font-bold tracking-tight">ARCHIVE</Link>
    </header>
  );
}
