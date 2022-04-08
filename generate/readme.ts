import * as fs from 'fs';
import * as resolve from '../src/resolve';
import { resolveVersion } from '../src/resolve';
import { versionMap } from './selftest';

const code = (input: string) => '`' + input + '`';
const majorVersion = (version: string) => version.split('.').splice(0, 2).join('.');
const unique = (xs: string[]) => [...new Set(xs)];

async function main() {
  const versions = await versionMap();

  type Environment = keyof typeof versions;
  const environments: Environment[] = Object.keys(versions) as Environment[];

  const supports = (version: string) => (name: Environment) => {
    return versions[name].has(version) ? 'oo' : 'xx';
  };

  const allSet = new Set(Object.values(versions).map(x => Array.from(x)).flat());
  const all = [...allSet].sort(resolve.compare);

  const latestMajorVersions = Object.fromEntries(
    unique(all.map(majorVersion)).map(major => [resolveVersion(major, allSet), major])
  );

  function codeVersion(version: string): string {
    const major = latestMajorVersions[version];
    return major ? `${code(version)} ${code(major)}` : code(version);
  }

  const { markdownTable } = await import('markdown-table');
  const header = [''].concat(environments.map(code));
  const align = ['l'].concat(environments.map(_ => 'c'));
  const row = (version: string) => [codeVersion(version)].concat(environments.map(supports(version)));
  const rows = all.reverse().map(row);
  const table = [header].concat(rows);
  fs.writeFileSync('README.md', markdownTable(table, { align }).replace(/oo/g, '🟢').replace(/xx/g, '❌') + '\n');
}

if (require.main === module) {
  main();
}
