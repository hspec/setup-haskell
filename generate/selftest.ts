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

const not_working_on_ubuntu_24_04 = new Set([
  '7.10.3',     // ghcup install fails
  '8.0.2',      // ghcup install fails
  '8.2.2',      // ghcup install fails
]);

const not_working_on_macos_14_and_15 = new Set([
  '7.10.3',	// no-bindist
  '8.0.2',	// no-bindist
  '8.2.2',	// no-bindist
  '8.4.1',	// no-bindist
  '8.4.2',	// no-bindist
  '8.4.3',	// no-bindist
  '8.4.4',	// no-bindist
  '8.6.1',	// no-bindist
  '8.6.2',	// no-bindist
  '8.6.3',	// no-bindist
  '8.6.4',	// no-bindist
  '8.6.5',	// no-bindist
  '8.8.1',	// no-bindist
  '8.8.2',	// no-bindist
  '8.8.3',	// no-bindist
  '8.8.4',	// no-bindist
  '8.10.1',	// no-bindist
  '8.10.2',	// no-bindist
  '8.10.3',	// no-bindist
  '8.10.4',	// no-bindist
  '9.0.1',	// no-bindist
  '8.10.5',	// cabal install fails due to LLVM
  '8.10.6',	// cabal install fails due to LLVM
  '8.10.7',	// cabal install fails due to LLVM
  '9.0.2',	// cabal install fails due to LLVM
  '9.2.2',	// compiled executable segfaults
  '9.2.3',	// compiled executable segfaults
  '9.2.1',	// compiled executable segfaults
  '9.2.4',	// compiled executable segfaults
  '9.4.1',	// compiled executable segfaults
]);

export async function versionMap() {
  const ghcup = await list();
  return {
    'ubuntu-20.04': new Set([...ppa.ubuntu20, ...ghcup]),
    'ubuntu-22.04': new Set([...ghcup].filter(v => !not_working_on_ubuntu_22_04.has(v))),
    'ubuntu-24.04': new Set([...ghcup].filter(v => !not_working_on_ubuntu_24_04.has(v))),
    'macos-13': ghcup,
    'macos-14': new Set([...ghcup].filter(v => !not_working_on_macos_14_and_15.has(v))),
    'macos-15': new Set([...ghcup].filter(v => !not_working_on_macos_14_and_15.has(v))),
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
