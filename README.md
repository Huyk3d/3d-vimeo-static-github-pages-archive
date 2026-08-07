# Motion Design Archive

A static Next.js archive structured around eras and projects. It is ready for GitHub Pages through `output: "export"`.

## Local development

```bash
pnpm install
pnpm dev
```

## Content management

Edit `src/data/eras.ts` to add eras, categories, and projects. Add project image assets in `public/images/projects/` and reference them from the data file.

An era with no `categories` shows its projects immediately. An era with `categories` shows the category menu first.

## Static deployment

```bash
pnpm build
```

The generated static site is placed in `out/`, ready to publish via GitHub Pages.
