import { getExecOutput } from '@actions/exec';
import { which } from '@actions/io';

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

export type ResolvedVersion = {
  version: string;
  source: 'system' | 'ghcup';
};

async function doResolveVersion(requested: string): Promise<string | undefined> {
  const versions = await ghcup.list();
  return resolveVersion(requested, versions);
}

export async function resolve(requested: string): Promise<ResolvedVersion> {
  const systemVersion = await installed();

  let version;
  if (requested === 'system') {
    if (systemVersion) {
      version = systemVersion;
    } else {
      version = await doResolveVersion('latest');
    }
  } else {
    version = await doResolveVersion(requested);
  }

  if (version) {
    const source = version === systemVersion ? 'system' : 'ghcup';
    return {
      version,
      source,
    };
  } else {
    throw new Error(`GHC version ${JSON.stringify(requested)} is not available.`);
  }
}

export async function installed(): Promise<string | undefined> {
  if (await which('ghc')) {
    const result = await getExecOutput('ghc', ['--numeric-version'], {
      silent: true,
    });
    return result.stdout.trim();
  } else {
    return undefined;
  }
}
