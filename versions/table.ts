import * as fs from 'fs';

import { ppa } from '../src/apt';

const all: string[] = JSON.parse(fs.readFileSync('versions/all.json', 'utf8'));
const ghcup: string[] = JSON.parse(fs.readFileSync('versions/ghcup.json', 'utf8'));
const ghcupSet: Set<string> = new Set(ghcup);

export const versions = {
  'ubuntu-18.04': all.filter(version => ghcupSet.has(version) || ppa.ubuntu18.has(version)),
  'ubuntu-20.04': all.filter(version => ghcupSet.has(version) || ppa.ubuntu20.has(version)),
  'macos-10.15': ghcup,
  'macos-11': ghcup,
  'windows-2019': ghcup,
  'windows-2022': ghcup,
};

type Environment = keyof typeof versions;

const environments: Environment[] = Object.keys(versions) as Environment[];

const code = (input: string) => '`' + input + '`';

const supports = (version: string) => (name: Environment) => {
  return versions[name].includes(version) ? 'oo' : 'xx';
};

async function main() {
  const { markdownTable } = await import('markdown-table');
  const header = [''].concat(environments.map(code));
  const align = ['l'].concat(environments.map(_ => 'c'));
  const row = (version: string) => [code(version)].concat(environments.map(supports(version)));
  const rows = all.map(row);
  const table = [header].concat(rows);
  console.log(markdownTable(table, { align }).replace(/oo/g, '🟢').replace(/xx/g, '❌'));
}

main();
