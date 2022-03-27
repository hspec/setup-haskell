import * as core from '@actions/core';
import { getExecOutput } from '@actions/exec';

import * as apt from './apt';
import * as ghcup from './ghcup';

async function main() {
  try {
    const version = core.getInput('ghc-version');
    await install(version);
    await verify(version);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(String(error));
    }
  }
}

async function install(version: string) {
  if (apt.has(version)) {
    await apt.install(version);
  } else {
    await ghcup.install(version);
  }
}

async function verify(expected: string) {
  const result = await getExecOutput('ghc', ["--numeric-version"], {
    silent: true,
  });
  const actual = result.stdout.trim();
  if (actual != expected) {
    throw new Error(`Expected GHC version to be ${expected} but got ${actual}.`);
  }
  core.info(`Installed GHC version ${expected}.`);
}

main();
