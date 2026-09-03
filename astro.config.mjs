// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Keep in sync with `site.url` in src/config/site.ts.
  site: 'https://lucivum.github.io',
  // Emit `path/index.html` so every page URL keeps its trailing slash.
  build: { format: 'directory' },
});
