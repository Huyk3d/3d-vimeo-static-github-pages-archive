export type LandingExhibitionPreview = {
  href: string;
  src: string;
  alt: string;
};

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects`;

export const landingExhibition = {
  introduceImage: {
    src: `${imageBasePath}/Vdas-02/Muzigae Artworks/무지개맨션.png`,
    alt: "Muzigae Masion Artworks",
  },
  preview2023: {
    imac: {
      href: "/era/2023",
      src: `${imageBasePath}/Student/iMac.png`,
      alt: "iMac (2023)",
    },
    toyWorld: {
      href: "/era/2023",
      src: `${imageBasePath}/Student/Toy World.png`,
      alt: "WELCOME TO TOY WORLD",
    },
  },
  preview2024: [
    { href: "/era/2024", src: `${imageBasePath}/Student/3-2_젤다/Zelda Thum.png`, alt: "The Legend of Zelda Movie Opening" },
    { href: "/era/2024", src: `${imageBasePath}/Student/3-1 HELLO/HELLO THUM.png`, alt: "HELLO!" },
    { href: "/era/2024", src: `${imageBasePath}/Student/캐디/2.png`, alt: "Character Design" },
    { href: "/era/2024", src: `${imageBasePath}/Student/Apple.png`, alt: "Apple Brand Artwork" },
  ] satisfies readonly LandingExhibitionPreview[],
  preview2025: {
    gameboy: {
      href: "/era/2025",
      src: `${imageBasePath}/Student/01-Grad/GameBoy Classic_졸업작_01.png`,
      alt: "GAMEBOY CLASSIC",
    },
    angel: {
      href: "/era/2025",
      src: `${imageBasePath}/2025/천사와 악마/천사와악마_03.png`,
      alt: "천사와 악마",
    },
  },
  preview2026: {
    artworks: {
      href: "/era/2026",
      src: `${imageBasePath}/Vdas-02/Muzigae Artworks/무지개맨션.png`,
      alt: "Muzigae Masion Artworks",
    },
    aiVideo: {
      href: "/era/2026",
      src: `${imageBasePath}/Vdas-02/Muzigae Masion AI Video/권혁의_AI Img_3.png`,
      alt: "Muzigae Masion AI Video",
    },
    galaxy: {
      href: "/era/2026",
      src: `${imageBasePath}/Vdas-02/Galaxy S26 Ultra/Galaxy_11.png`,
      alt: "Galaxy S26 Ultra",
    },
  },
} as const;
