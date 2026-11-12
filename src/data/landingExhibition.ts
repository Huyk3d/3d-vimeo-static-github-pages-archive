export type LandingExhibitionPreview = {
  href: string;
  src: string;
  alt: string;
};

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects`;

export const landingExhibition = {
  introduceImage: {
    src: `${imageBasePath}/Pro.png`,
    alt: "Profile image",
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
  preview2024Content: {
    title: "대학교 3학년",
    description: [
      "대학교 3학년의 시절입니다. 제 인생 중 다시는 오지 않을 최고의 열정이 있었던 시절입니다.",
      "2D 모션그래픽 및 캐릭터 작업등 해보지않은 작업을 하면서 많은 경험과 성장을 할 수 있었습니다.",
      "특히 2학기 기말과제로 작업 했던 ‘가상의 영화or드라마 오프닝 시퀀스 제작’이라는 주제로 했던",
      "젤다의 전설 오프닝 영상 제작이 가장 큰 기억에 남습니다. 짧은 경험 중에 기획부터 모델링까지",
      "약 한달동안 했던, 당시에는 되게 크게 느꼈던 프로젝트라 많은 성장을 할 수 있었습니다.",
    ],
    eyebrow: "2024 ARCHIVE",
  },
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
