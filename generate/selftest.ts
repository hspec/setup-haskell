import * as fs from 'fs';
import * as YAML from 'yaml';
import * as resolve from '../src/resolve';

import { ppa } from '../src/apt';
import { list } from '../src/ghcup';

export async function versionMap() {
  const ghcup = await list();
  return {
    'ubuntu-18.04': new Set([...ppa.ubuntu18, ...ghcup]),
    'ubuntu-20.04': new Set([...ppa.ubuntu20, ...ghcup]),
    'macos-10.15': ghcup,
    'macos-11': ghcup,
    'windows-2019': ghcup,
    'windows-2022': ghcup,
  };
}

async function main() {
  const versions = await versionMap();
  for (const [name, supported] of Object.entries(versions)) {
    const file = `.github/workflows/selftest.${name}.yml`;
    const yaml = YAML.parse(fs.readFileSync(file, 'utf8'));
    yaml.jobs.build.strategy.matrix.ghc = [...supported].sort(resolve.compare);
    fs.writeFileSync(file, YAML.stringify(yaml));
  }
}

if (require.main === module) {
  main();
}
