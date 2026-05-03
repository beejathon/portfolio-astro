# portfolio-astro

Personal portfolio and blog: **Astro**, **MDX** (posts in-repo), **Tailwind**, comments via **[Giscus](https://giscus.app)** (GitHub Discussions), deployed to **GitHub Pages** with **GitHub Actions**.

**Live site:** [https://beejathon.github.io/portfolio-astro/](https://beejathon.github.io/portfolio-astro/)

## Requirements

- **Node.js** 22+ (see `package.json` `engines`)

## Local development

```sh
npm install
npm run dev
```

Dev server: [http://localhost:4321](http://localhost:4321) (default Astro port).

```sh
npm run build    # production build → dist/
npm run preview  # serve dist locally
npm run check    # astro check (TypeScript)
```

## Content

- **Blog posts:** `src/content/blog/*.mdx` (and `.md`), frontmatter defined in [`src/content.config.ts`](src/content.config.ts).
- **Pages:** `src/pages/` (home, projects, blog index, post template, 404).
- **Static assets:** `public/` (e.g. add `bj_cv_webdev.pdf` for the header CV link).

## Environment variables

Copy [`.env.example`](.env.example) to `.env` or `.env.production` and fill in values. These are read at **build time** (including for Giscus in the post template).

| Variable | Purpose |
| -------- | ------- |
| `PUBLIC_SITE_URL` | Canonical site origin (e.g. `https://beejathon.github.io`) |
| `PUBLIC_BASE_PATH` | Base path for GitHub project Pages, trailing `/` (e.g. `/portfolio-astro/`; use `/` for a root user site) |
| `PUBLIC_GISCUS_*` | Giscus embed — get `repo`, `repo-id`, `category`, `category-id` from [giscus.app](https://giscus.app) after enabling Discussions and installing the Giscus GitHub App |

Do **not** commit `.env` or `.env.production` with real values; `.gitignore` excludes them. For CI, use GitHub **Actions variables** (or secrets) matching the same names so `npm run build` in the workflow sees them.

## Giscus

1. Public repo with **Discussions** enabled (this repo or another you choose).
2. Install the **Giscus** GitHub App for that repo.
3. Complete the form at [giscus.app](https://giscus.app) and copy `data-repo`, `data-repo-id`, `data-category`, `data-category-id`, etc. into your env vars.

## Deploy

- **GitHub Pages:** Settings → **Pages** → Build and deployment → **GitHub Actions**.
- Workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on push to `main` and publishes `dist/`.

Update `PUBLIC_SITE_URL` and `PUBLIC_BASE_PATH` if you use a custom domain or a different repository name.

## Project layout

```text
├── public/                 # static files served as-is
├── src/
│   ├── components/       # Header, Footer, Giscus, …
│   ├── content/blog/     # MDX/Markdown posts
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── content.config.ts      # content collections (root: src/content.config.ts)
└── package.json
```

## License

Private / personal — adjust as you prefer.
