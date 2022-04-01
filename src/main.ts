import * as core from '@actions/core';
import { getExecOutput } from '@actions/exec';

import * as apt from './apt';
import * as ghcup from './ghcup';
import { resolve } from './resolve';

async function main() {
  try {
    const requested = core.getInput('ghc-version');
    if (requested != 'system') {
      report();
    } else {
      const version = await install(requested);
      await verify(version);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(String(error));
    }
  }
}

async function install(requested: string): Promise<string> {
  const resolved = await resolve(requested);
  switch (resolved.source) {
    case 'apt':
      await apt.install(resolved.version);
      break;
    case 'ghcup':
      await ghcup.install(resolved.version);
      break;
  }
  return resolved.version;
}

async function verify(expected: string) {
  const actual = await installed();
  if (actual != expected) {
    throw new Error(`Expected GHC version to be ${expected} but got ${actual}.`);
  }
  core.info(`Installed GHC version ${expected}.`);
}

async function report() {
  core.info(`Using GHC version ${await installed()}.`);
}

async function installed(): Promise<string> {
  const result = await getExecOutput('ghc', ['--numeric-version'], {
    silent: true,
  });
  return result.stdout.trim();
}

if (require.main === module) {
  main();
}
