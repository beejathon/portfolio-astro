/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_BASE_PATH: string;
  readonly PUBLIC_GISCUS_REPO: string;
  readonly PUBLIC_GISCUS_REPO_ID: string;
  readonly PUBLIC_GISCUS_CATEGORY: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID: string;
  readonly PUBLIC_GISCUS_MAPPING: string;
  readonly PUBLIC_GISCUS_THEME: string;
  readonly PUBLIC_GISCUS_LANG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
