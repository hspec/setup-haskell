import * as apt from './apt';
import * as ghcup from './ghcup';

export type Ordering = -1 | 0 | 1

export function compareVersions(a: string, b: string): Ordering {
  const xs = a.split('.');
  const ys = b.split('.');
  const range = xs.length < ys.length ? ys : xs;
  for (const i in range) {
    const x = Number(xs[i] || 0);
    const y = Number(ys[i] || 0);
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
  }
  return 0;
}

export function resolveVersion(requested: string, versions: Set<string>): string | undefined {
  if (versions.has(requested)) {
    return requested;
  } else {
    const prefix = requested == 'latest' ? '' : requested + '.';
    return [...versions]
      .filter(x => x.startsWith(prefix))
      .sort(compareVersions)
      .reverse()[0];
  }
}

type ResolvedVersion = {
  version: string;
  source: 'apt' | 'ghcup';
};

export async function resolve(requested: string): Promise<ResolvedVersion> {
  const aptVersions = apt.versions();

  if (aptVersions.has(requested)) {
    return {
      version: requested,
      source: 'apt',
    };
  }

  const versions = new Set([...aptVersions, ...await ghcup.list()]);
  const version = resolveVersion(requested, versions);

  if (version) {
    return {
      version,
      source: aptVersions.has(version) ? 'apt' : 'ghcup',
    };
  } else {
    throw new Error(`GHC version ${JSON.stringify(requested)} is not available.`);
  }
}
