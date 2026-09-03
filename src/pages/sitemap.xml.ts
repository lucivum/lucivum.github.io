import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import { homePath, privacyPath } from '../config/routes';
import { absolute } from '../config/site';

// `astro build` runs from the project root, so resolve content files from there
// rather than from this module's bundled location.
const projectRoot = process.cwd();
const contentRoot = join(projectRoot, 'src', 'content');

/**
 * Date of the commit that last touched a file, or undefined when git can't say —
 * an untracked file, or a shallow CI clone with no per-file history.
 */
function gitCommitDate(file: string): Date | undefined {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (!output) return undefined;
    const date = new Date(output);
    return Number.isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
}

/**
 * When a page last actually changed. File mtime is useless here: a CI checkout
 * stamps every file with the checkout time, which would claim the whole site
 * changed on every deploy. The commit date is the real answer, with mtime kept
 * only as a fallback for content that isn't committed yet.
 */
function lastModified(collection: string, id: string): Date {
  const file = join(contentRoot, collection, `${id}.md`);

  const committed = gitCommitDate(file);
  if (committed) return committed;

  try {
    return statSync(file).mtime;
  } catch {
    return new Date();
  }
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export const GET: APIRoute = async () => {
  const [homePages, policies] = await Promise.all([
    getCollection('home'),
    getCollection('privacy'),
  ]);

  const urls = [
    ...homePages.map((page) => ({
      loc: absolute(homePath(page.id)),
      lastmod: lastModified('home', page.id),
    })),
    ...policies.map((policy) => ({
      loc: absolute(privacyPath(policy.id)),
      lastmod: lastModified('privacy', policy.id),
    })),
  ].sort((a, b) => b.lastmod.getTime() - a.lastmod.getTime());

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `    <url>
        <loc>${url.loc}</loc>
        <lastmod>${isoDate(url.lastmod)}</lastmod>
    </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
