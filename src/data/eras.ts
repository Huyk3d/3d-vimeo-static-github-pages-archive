import type { Era } from "@/types/archive";

const placeholder = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/projects/placeholder.svg`;

export const eras: Era[] = [
  {
    slug: "when-student-01",
    title: "When Student 01",
    period: "2019 — 2021",
    description: "An archive of early explorations in motion and image.",
    projects: [
      {
        slug: "nintendo",
        title: "Nintendo",
        client: "Personal Study",
        year: "2021",
        thumbnail: placeholder,
        blocks: [
          { type: "image", src: placeholder, alt: "Nintendo project placeholder" },
          { type: "text", heading: "Nintendo", body: "Project details will be added here." },
        ],
      },
      {
        slug: "airbnb",
        title: "Airbnb",
        client: "Personal Study",
        year: "2020",
        thumbnail: placeholder,
        blocks: [{ type: "text", heading: "Airbnb", body: "Project details will be added here." }],
      },
    ],
  },
  {
    slug: "when-student-02",
    title: "When Student 02",
    period: "2022 — 2023",
    description: "A categorized record of selected student projects.",
    categories: ["FD", "IT", "MD"],
    projects: [
      {
        slug: "balmuda",
        title: "BALMUDA",
        client: "Personal Study",
        year: "2023",
        category: "FD",
        thumbnail: placeholder,
        blocks: [{ type: "text", heading: "BALMUDA", body: "Project details will be added here." }],
      },
      {
        slug: "aesop",
        title: "Aesop",
        client: "Personal Study",
        year: "2022",
        category: "IT",
        thumbnail: placeholder,
        blocks: [{ type: "text", heading: "Aesop", body: "Project details will be added here." }],
      },
    ],
  },
];
