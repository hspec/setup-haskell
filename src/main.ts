import * as core from '@actions/core';

import * as apt from './apt';
import * as ghcup from './ghcup';
import { installed, resolve, ResolvedVersion } from './resolve';

async function main() {
  try {
    await addCabalBinToPath();
    const requested = core.getInput('ghc-version');
    const version = await ensure(requested);
    core.setOutput('ghc-version', version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(String(error));
    }
  }
}

async function addCabalBinToPath() {
  const home = process.env['HOME'];
  if (home) {
    core.addPath(home + '/.cabal/bin/');
  }
}

async function ensure(requested: string): Promise<string> {
  const resolved = await resolve(requested);
  await install(resolved);
  await verify(resolved);
  return resolved.version;
}

async function install(resolved: ResolvedVersion): Promise<undefined> {
  // IMPORTANT: Using `undefined` instead of `void` as the return type ensures
  // that the pattern match is exhaustive.
  switch (resolved.source) {
    case 'apt':
      await apt.install(resolved.version);
      return;
    case 'ghcup':
      await ghcup.install(resolved.version);
      return;
    case 'system':
      return;
  }
}

async function verify(resolved: ResolvedVersion) {
  const expected = resolved.version;
  const actual = await installed();
  if (actual != expected) {
    throw new Error(`Expected GHC version to be ${expected} but got ${actual}.`);
  }
  if (resolved.source === 'system') {
    core.info(`Using GHC version ${expected}.`);
  } else {
    core.info(`Installed GHC version ${expected}.`);
  }
}

if (require.main === module) {
  main();
}
