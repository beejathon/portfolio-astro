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
| `PUBLIC_GISCUS_*` | Giscus embed — see [Giscus](#giscus-comments) |

Do **not** commit `.env` or `.env.production` with real values; `.gitignore` excludes them. For CI, use GitHub **Repository variables** (Repository → Settings → Secrets and variables → Actions → Variables) with the same names so `npm run build` in the workflow picks them up. Use variables for `PUBLIC_*` values; they are not secret, but variables keep the repo clean.

## Giscus comments

Comments on each post are rendered by [Giscus](https://giscus.app): discussions live in a GitHub repo’s **Discussions** tab, and readers sign in with GitHub to comment.

### 1. GitHub repository and Discussions

- Use a **public** repository (the site repo or a dedicated `discussions` repo).
- In that repo: **Settings** → **General** → **Features** → enable **Discussions**.
- Pick or create a discussion **category** for comments (for example **Announcements** or **General**). Giscus will attach new post threads under that category.

### 2. Install the Giscus GitHub App

- Open the [Giscus GitHub App](https://github.com/apps/giscus) and install it.
- Grant access to the repository you enabled Discussions on (only that repo is required).

### 3. Configure the widget at giscus.app

- Go to [giscus.app](https://giscus.app) and sign in with GitHub if prompted.
- Fill in **repository** (e.g. `username/repo`), **Discussion category**, and the mapping that decides how each page maps to a discussion thread:
  - **pathname** (default here): uses the URL path, which works well for static posts under `/blog/<slug>/`.
  - **url** / **title** / **og:title**: alternatives if you prefer URL or title-based matching.
  - **specific**: set `PUBLIC_GISCUS_MAPPING=specific` and optionally set `giscusTerm` in post frontmatter; otherwise the post’s file slug (`post.id`) is passed as `data-term`.
- Choose **theme**, **language**, and optional features (reactions, metadata). The embed in [`src/components/Giscus.astro`](src/components/Giscus.astro) matches the common defaults; adjust env vars or that component if you change options on the site.

The setup page shows a generated `<script>` with `data-repo`, `data-repo-id`, `data-category`, `data-category-id`, and related attributes. Map them to environment variables (see [`.env.example`](.env.example)):

| giscus.app / `data-*` | Env variable |
| --------------------- | ------------ |
| `data-repo` | `PUBLIC_GISCUS_REPO` |
| `data-repo-id` | `PUBLIC_GISCUS_REPO_ID` |
| `data-category` | `PUBLIC_GISCUS_CATEGORY` |
| `data-category-id` | `PUBLIC_GISCUS_CATEGORY_ID` |
| `data-mapping` | `PUBLIC_GISCUS_MAPPING` |
| `data-theme` | `PUBLIC_GISCUS_THEME` |
| `data-lang` | `PUBLIC_GISCUS_LANG` |

The blog post template ([`src/pages/blog/[slug].astro`](src/pages/blog/[slug].astro)) includes [`Giscus.astro`](src/components/Giscus.astro) below the article body. If the three required IDs are missing, the template shows a short setup hint instead of the widget.

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
