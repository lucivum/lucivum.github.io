// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const SITE = 'https://lucivum.github.io';
const siteHost = new URL(SITE).host;

/**
 * Anything pointing off this site. Relative links, in-page anchors and
 * `mailto:` fail the protocol test and are left alone, as is an absolute URL
 * that happens to point back at us.
 */
function isExternal(href) {
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return false;
  try {
    return new URL(href).host !== siteHost;
  } catch {
    return false;
  }
}

/**
 * Open every off-site link in the policy text in a new tab, so a reader never
 * loses the policy they were part-way through. `noopener` denies the opened
 * page a handle back to this one.
 *
 * Written against Sätteri's hast visitor API rather than as a rehype plugin:
 * rehype plugins would pull the whole `unified` pipeline back in to replace
 * Astro's default processor, for one attribute on nine files.
 */
const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      if (!isExternal(node.properties?.href)) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener');
    },
  },
};

export default defineConfig({
  // Keep in sync with `site.url` in src/config/site.ts.
  site: SITE,
  // Emit `path/index.html` so every page URL keeps its trailing slash.
  build: { format: 'directory' },
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
  },
});
