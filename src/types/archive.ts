export type MediaBlock =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "vimeo"; videoId: string; title: string }
  | { type: "text"; heading?: string; body: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category?: string;
  thumbnail: string;
  blocks: MediaBlock[];
};

export type Era = {
  slug: string;
  title: string;
  period: string;
  description: string;
  categories?: string[];
  projects: Project[];
};
