import * as fs from 'fs';
import * as YAML from 'yaml';
import * as resolve from '../src/resolve';

import { ppa } from '../src/apt';
import { list } from '../src/ghcup';

const not_working_on_ubuntu_22_04 = new Set([
  '7.10.3',     // Segmentation fault
]);

const not_working_on_windows_2022 = new Set([
  '8.8.3',      // installed not able to compile executables
]);

export async function versionMap() {
  const ghcup = await list();
  return {
    'ubuntu-18.04': new Set([...ppa.ubuntu18, ...ghcup]),
    'ubuntu-20.04': new Set([...ppa.ubuntu20, ...ghcup]),
    'ubuntu-22.04': new Set([...ghcup].filter(v => !not_working_on_ubuntu_22_04.has(v))),
    'macos-10.15': ghcup,
    'macos-11': ghcup,
    'macos-12': ghcup,
    'windows-2019': ghcup,
    'windows-2022': new Set([...ghcup].filter(v => !not_working_on_windows_2022.has(v))),
  };
}

async function main() {
  const versions = await versionMap();
  for (const [name, supported] of Object.entries(versions)) {
    const file = `.github/workflows/selftest.${name}.yml`;
    const yaml = YAML.parse(fs.readFileSync(file, 'utf8'));
    yaml.jobs.build.strategy.matrix.ghc = [...supported].sort(resolve.compareVersions);
    fs.writeFileSync(file, YAML.stringify(yaml));
  }
}

if (require.main === module) {
  main();
}
