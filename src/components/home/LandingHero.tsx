"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Era } from "@/types/archive";

type LandingPhase = "blank" | "greeting" | "introduction" | "eras";

const landingEraLabels: Record<string, string> = {
  "when-student-01": "Student",
  "vdas-01": "VDAS_01",
  "vdas-02": "VDAS_02",
};

export function LandingHero({ eras, heroImage }: { eras: Era[]; heroImage: string }) {
  const [phase, setPhase] = useState<LandingPhase>("blank");
  const introTimers = useRef<number[]>([]);

  const clearIntroTimers = () => {
    introTimers.current.forEach((timer) => window.clearTimeout(timer));
    introTimers.current = [];
  };

  useEffect(() => {
    introTimers.current = [
      window.setTimeout(() => setPhase("greeting"), 700),
      window.setTimeout(() => setPhase("introduction"), 2900),
      window.setTimeout(() => setPhase("eras"), 5100),
    ];

    return clearIntroTimers;
  }, []);

  useEffect(() => {
    if (phase === "eras") return;

    const skipIntro = () => {
      clearIntroTimers();
      setPhase("eras");
    };
    window.addEventListener("pointerdown", skipIntro, { passive: true });
    window.addEventListener("wheel", skipIntro, { passive: true });
    window.addEventListener("touchstart", skipIntro, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", skipIntro);
      window.removeEventListener("wheel", skipIntro);
      window.removeEventListener("touchstart", skipIntro);
    };
  }, [phase]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-visible bg-[#EDEDED] px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
        {phase !== "eras" && <div className="relative flex min-h-28 w-full translate-y-14 items-center justify-center md:min-h-36">
          {phase === "greeting" && <p className="animate-landing-message text-xl font-medium tracking-tight md:text-2xl">Hello, Hyuk!</p>}
          {phase === "introduction" && (
            <div className="animate-landing-message">
              <h1 className="text-xl font-medium leading-[1.05] tracking-tight md:text-3xl">Welcome to<br />A personal archive.</h1>
            </div>
          )}
        </div>}

        <nav aria-label="Archive eras" className={`grid -translate-y-7 justify-items-center gap-2 text-sm transition-opacity duration-700 md:text-base ${phase === "eras" ? "opacity-100" : "pointer-events-none mt-10 opacity-0 md:mt-14"}`}>
          {eras.map((era) => (
            <Link key={era.slug} href={`/era/${era.slug}`} className="group py-1 text-archive-text transition-colors hover:text-archive-text">
              <span>{landingEraLabels[era.slug] ?? era.title}</span>
            </Link>
          ))}
          <Link href="/contact" className="group py-1 text-archive-text transition-colors hover:text-archive-text">Contact</Link>
        </nav>
      </div>

      <Link href="#hero-work" aria-label="Scroll to featured work" className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[1.3rem] leading-none text-archive-muted transition-opacity duration-700 md:bottom-10 ${phase === "eras" ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <span className="animate-scroll-cue inline-flex items-center gap-10"><span>⌄</span><span>⌄</span></span>
      </Link>
    </section>
  );
}
