import * as fs from 'fs';

import { ppa } from '../src/apt';

export const all: string[] = JSON.parse(fs.readFileSync('generate/versions/all.json', 'utf8'));
export const allSet = new Set(all);

const ghcup: string[] = JSON.parse(fs.readFileSync('generate/versions/ghcup.json', 'utf8'));
const ghcupSet: Set<string> = new Set(ghcup);

export const versions = {
  'ubuntu-18.04': all.filter(version => ghcupSet.has(version) || ppa.ubuntu18.has(version)),
  'ubuntu-20.04': all.filter(version => ghcupSet.has(version) || ppa.ubuntu20.has(version)),
  'macos-10.15': ghcup,
  'macos-11': ghcup,
  'windows-2019': ghcup,
  'windows-2022': ghcup,
};
