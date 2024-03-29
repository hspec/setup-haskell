import * as core from '@actions/core';
import { exec } from '@actions/exec';

export async function install(version: string) {
  await core.group('apt-get install', async () => {
    await exec('sudo add-apt-repository ppa:hvr/ghc -y');
    await exec(`sudo apt-get install ghc-${version}`);
    core.addPath('/opt/ghc/bin');
  });
}

export function versions(): Set<string> {
  const image = process.env['ImageOS'];
  if (image == 'ubuntu20') {
    return ppa[image];
  } else {
    return new Set();
  }
}

export const ppa = {
  ubuntu20: new Set([
    // https://launchpad.net/~hvr/+archive/ubuntu/ghc?field.series_filter=focal
    '7.0.1',
    '7.0.4',
    '7.2.2',
    '7.4.2',
    '7.10.3',
    '8.0.2',
    '8.2.2',
    '8.4.4',
    '8.6.5',
    '8.8.3',
    '8.8.4',
    '8.10.1',
    '8.10.2',
    '8.10.3',
    '8.10.4',
    '9.0.1',
  ]),
};
