import * as fs from 'fs';
import * as core from '@actions/core';
import { exec } from '@actions/exec';

import * as ghcup from './ghcup';
import { installed, resolve, ResolvedVersion } from './resolve';

async function main() {
  try {
    await ghcup.ensure();
    await workaroundRunnerImageIssue7061();
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

async function workaroundRunnerImageIssue7061() {
  await core.group('Workaround for https://github.com/actions/runner-images/issues/7061', async () => {
    const user = process.env['USER'];
    const path = '/usr/local/.ghcup';
    if (fs.existsSync(path)) {
      await exec(`sudo chown -R ${user} ${path}`);
    }
  });
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
