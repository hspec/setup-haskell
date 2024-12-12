import * as core from '@actions/core';
import { exec, getExecOutput } from '@actions/exec';
import { compareVersions } from './resolve';
import { which } from '@actions/io';

export async function ensure() {
  if (!await which('ghcup')) {
    await exec('brew install ghcup');
    const home = process.env['HOME'];
    if (home) {
      core.addPath(home + '/.ghcup/bin/');
    }
  }
  if (!await which('cabal')) {
    await exec('ghcup install cabal latest --set');
    const result = await getExecOutput('cabal', ['path', '-v0', '--installdir'], {
      silent: true,
    });
    core.addPath(result.stdout.trim());
  }
}

export async function install(version: string) {
  const older804 = compareVersions(version, '8.4') == -1;
  const ncursesRequired = older804 && process.env['ImageOS'] == 'ubuntu22';
  if (ncursesRequired) {
    await core.group('sudo apt-get install libncurses5', async () => {
      await exec('sudo apt-get install libncurses5');
    });
  }
  await core.group('ghcup install', async () => {
    await exec(`ghcup install ghc ${version} --set`);
  });
}

export async function list(): Promise<Set<string>> {
  const result = await getExecOutput('ghcup', ['list', '--raw-format', '--tool', 'ghc'], {
    silent: true,
  });

  return new Set(
    result.stdout.split('\n').flatMap(line => {
      let version = line.match(/^ghc\s+(\d+.\d+.\d+)\s+/)?.at(1);
      return version ? [version] : [];
    })
  );
}
