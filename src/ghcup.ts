import * as core from '@actions/core';
import { exec, getExecOutput } from '@actions/exec';

export async function install(version: string) {
  await core.group('ghcup install', async () => {
    await exec(`ghcup install ghc ${version} --set`);
    core.addPath('$HOME/.ghcup/bin');
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
