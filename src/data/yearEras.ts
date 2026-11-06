export type YearProject = {
  legacyEraSlug: "when-student-01" | "vdas-01" | "vdas-02";
  projectSlug: string;
  title: string;
  thumbnail: string;
  cardSize: "large" | "small" | "vertical";
  aspectClassName?: string;
  titleClassName?: string;
  imageClassName?: string;
  isPlaceholder?: boolean;
};

export type YearGalleryItem =
  | { type: "card"; project: YearProject }
  | { type: "stack"; projects: readonly [YearProject, YearProject] };

export type YearEra = {
  slug: "2023" | "2024" | "2025" | "2026";
  title: string;
  description: readonly string[];
  descriptionUsesLineBreaks?: boolean;
  items: readonly YearGalleryItem[];
};

const imageBasePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects`;

const projects = {
  student02: { legacyEraSlug: "when-student-01", projectSlug: "student-02", title: "THE NATURE", thumbnail: `${imageBasePath}/Student/The nature.png`, cardSize: "small" },
  student03: { legacyEraSlug: "when-student-01", projectSlug: "student-03", title: "HELLO!", thumbnail: `${imageBasePath}/Student/3-1 HELLO/HELLO THUM.png`, cardSize: "small", titleClassName: "text-black" },
  student04: { legacyEraSlug: "when-student-01", projectSlug: "student-04", title: "The Legend of Zelda Movie Opening", thumbnail: `${imageBasePath}/Student/3-2_젤다/Zelda Thum.png`, cardSize: "large" },
  student05: { legacyEraSlug: "when-student-01", projectSlug: "student-05", title: "WELCOME TO TOY WORLD", thumbnail: `${imageBasePath}/Student/Toy World.png`, cardSize: "small", titleClassName: "text-black" },
  student06: { legacyEraSlug: "when-student-01", projectSlug: "student-06", title: "iMac (2023)", thumbnail: `${imageBasePath}/Student/iMac.png`, cardSize: "large", titleClassName: "text-black" },
  student07: { legacyEraSlug: "when-student-01", projectSlug: "student-07", title: "Can be Anything", thumbnail: `${imageBasePath}/Student/Can be.png`, cardSize: "small" },
  student08: { legacyEraSlug: "when-student-01", projectSlug: "student-08", title: "가스수소 안전공모전", thumbnail: `${imageBasePath}/Student/GAS.png`, cardSize: "small", titleClassName: "text-black" },
  student09: { legacyEraSlug: "when-student-01", projectSlug: "student-09", title: "My Day", thumbnail: `${imageBasePath}/Student/My Day.png`, cardSize: "large", titleClassName: "text-black", imageClassName: "scale-[1.01] translate-y-[2px]" },
  student10: { legacyEraSlug: "when-student-01", projectSlug: "student-10", title: "LG 공모전", thumbnail: `${imageBasePath}/Student/LG.png`, cardSize: "small" },
  student11: { legacyEraSlug: "when-student-01", projectSlug: "student-11", title: "Bounce Ball", thumbnail: `${imageBasePath}/Student/Ball.png`, cardSize: "small" },
  student12: { legacyEraSlug: "when-student-01", projectSlug: "student-12", title: "Character Design", thumbnail: `${imageBasePath}/Student/캐디/2.png`, cardSize: "large" },
  student13: { legacyEraSlug: "when-student-01", projectSlug: "student-13", title: "Loopse Lives, Silent Escape", thumbnail: `${imageBasePath}/Student/Loopse Lives, Silent Escape.png`, cardSize: "small" },
  student14: { legacyEraSlug: "when-student-01", projectSlug: "student-14", title: "Apple Brand Artwork", thumbnail: `${imageBasePath}/Student/Apple.png`, cardSize: "large" },
  student15: { legacyEraSlug: "when-student-01", projectSlug: "student-15", title: "친환경 소비 숏폼 공모전", thumbnail: `${imageBasePath}/Student/친환경 숏폼.png`, cardSize: "vertical", aspectClassName: "aspect-[9/16]" },
  student16: { legacyEraSlug: "when-student-01", projectSlug: "student-16", title: "천사와 악마", thumbnail: `${imageBasePath}/2025/천사와 악마/천사와악마_03.png`, cardSize: "small" },
  vdas0105: { legacyEraSlug: "vdas-01", projectSlug: "vdas-01-05", title: "XBOX", thumbnail: `${imageBasePath}/2026/Xbox/Xbox_02.png`, cardSize: "small" },
  student01: { legacyEraSlug: "when-student-01", projectSlug: "student-01", title: "GAMEBOY CLASSIC", thumbnail: `${imageBasePath}/Student/01-Grad/GameBoy Classic_졸업작_01.png`, cardSize: "large" },
  vdas0101: { legacyEraSlug: "vdas-01", projectSlug: "vdas-01-01", title: "Balmuda Rain", thumbnail: `${imageBasePath}/Vdas-01/01-01_balmuda/Vdas_01_01-07.png`, cardSize: "large" },
  vdas0102: { legacyEraSlug: "vdas-01", projectSlug: "vdas-01-02", title: "Vdas Intensive_Artworks", thumbnail: `${imageBasePath}/Vdas-01/01-02_Artworks/01-02_Artwokrs_01.png`, cardSize: "small" },
  vdas0103: { legacyEraSlug: "vdas-01", projectSlug: "vdas-01-03", title: "TOY RACING", thumbnail: `${imageBasePath}/Vdas-01/01-03_Toy/ToyRacing_07.png`, cardSize: "large", titleClassName: "text-black" },
  vdas0104: { legacyEraSlug: "vdas-01", projectSlug: "vdas-01-04", title: "Case Study - Showcase", thumbnail: `${imageBasePath}/Student/케이스 스터디 권혁의 최종 00-00-11.png`, cardSize: "large" },
  vdas0201: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-01", title: "Muzigae Masion Artworks", thumbnail: `${imageBasePath}/Vdas-02/Muzigae Artworks/무지개맨션.png`, cardSize: "large", aspectClassName: "aspect-[4/5]" },
  vdas0202: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-02", title: "Muzigae Masion AI Video", thumbnail: `${imageBasePath}/Vdas-02/Muzigae Masion AI Video/권혁의_AI Img_3.png`, cardSize: "large", aspectClassName: "aspect-[3712/4608]", titleClassName: "text-black" },
  vdas0203: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-03", title: "Galaxy S26 Ultra", thumbnail: `${imageBasePath}/Vdas-02/Galaxy S26 Ultra/Galaxy_11.png`, cardSize: "large" },
  vdas0204: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-04", title: "Air BnB UI/UX", thumbnail: `${imageBasePath}/Vdas-02/Air BnB UIUX/AirBnb_04.png`, cardSize: "large", titleClassName: "text-black" },
  vdas0205: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-05", title: "Character Training", thumbnail: `${imageBasePath}/Vdas-02/Cha_thum.png`, cardSize: "small" },
  vdas0206: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-06", title: "Citizen Watch (AI)", thumbnail: `${imageBasePath}/Vdas-02/Citizen/스틸_03.png`, cardSize: "small" },
  vdas0207: { legacyEraSlug: "vdas-02", projectSlug: "vdas-02-07", title: "Play Again, GameBoy.", thumbnail: `${imageBasePath}/2026/Gameboy Classic/GBC_비헨스_03.png`, cardSize: "small" },
} satisfies Record<string, YearProject>;

type ProjectKey = keyof typeof projects;

const card = (key: ProjectKey): YearGalleryItem => ({ type: "card", project: projects[key] });
const stack = (first: ProjectKey, second: ProjectKey): YearGalleryItem => ({ type: "stack", projects: [projects[first], projects[second]] });

export const yearEras: readonly YearEra[] = [
  {
    slug: "2023",
    title: "2023",
    description: ["대학교 2학년이였습니다. 3D와 그래픽과", "디자인등의 요소를 거의 처음 접했고", "여름방학때 블렌더를 처음으로 독학하였습니다."],
    descriptionUsesLineBreaks: true,
    items: [card("student06"), stack("student05", "student02"), stack("student07", "student11")],
  },
  {
    slug: "2024",
    title: "2024",
    description: ["대학교 3학년 시절입니다. 1학기에는 독학도 많이 하고, 최고의 열정을 보냈습니다.", "하지만 2학기때 슬럼프가 짧게 지나가 그 시절에 완급과 체력 조절의 중요성을 느꼈습니다."],
    items: [card("student04"), stack("student03", "student08"), stack("student10", "student13"), card("student12"), card("student14"), card("student15")],
  },
  {
    slug: "2025",
    title: "2025",
    description: ["대학교 4학년으로 졸업 작품을 제작한 연도입니다. 졸업 작품을 마치고 개인작과 더불어 VDAS 학원을 처음으로 다녔으며 Foundation 85-3th 과정을 밟았습니다."],
    items: [card("student01"), stack("student16", "vdas0105"), card("vdas0103"), card("vdas0104"), card("student09")],
  },
  {
    slug: "2026",
    title: "2026",
    description: ["취준생 시절 연도입니다. 일부 개인작을 진행했으며", "VDAS Intensive19th와 VDAS Motion Designer 86th", "과정을 밟았습니다."],
    descriptionUsesLineBreaks: true,
    items: [card("vdas0101"), stack("vdas0102", "vdas0207"), card("vdas0201"), card("vdas0202"), card("vdas0203"), card("vdas0204"), stack("vdas0205", "vdas0206")],
  },
];

export const yearProjects: readonly YearProject[] = yearEras
  .flatMap((year) => year.items.flatMap((item) => item.type === "card" ? [item.project] : item.projects))
  .filter((project) => !project.isPlaceholder);

export const yearProjectByLegacyPath: Record<string, YearProject> = Object.fromEntries(
  yearProjects.map((project) => [`${project.legacyEraSlug}/${project.projectSlug}`, project]),
);

export function getYearEra(slug: string) {
  return yearEras.find((year) => year.slug === slug);
}

export function getYearProject(eraSlug: string, projectSlug: string) {
  return yearProjectByLegacyPath[`${eraSlug}/${projectSlug}`];
}

export function getYearEraForProject(eraSlug: string, projectSlug: string) {
  return yearEras.find((year) => year.items.some((item) => {
    const projects = item.type === "card" ? [item.project] : item.projects;
    return projects.some((project) => project.legacyEraSlug === eraSlug && project.projectSlug === projectSlug);
  }));
}
