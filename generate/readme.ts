import { resolveVersion } from '../src/resolve';
import { allSet, all, versions } from './versions';

type Environment = keyof typeof versions;
const environments: Environment[] = Object.keys(versions) as Environment[];

const code = (input: string) => '`' + input + '`';

const supports = (version: string) => (name: Environment) => {
  return versions[name].includes(version) ? 'oo' : 'xx';
};

const majorVersion = (version: string) => version.split('.').splice(0, 2).join('.');

const unique = (xs: string[]) => [...new Set(xs)];

const latestMajorVersions = Object.fromEntries(
  unique(all.map(majorVersion)).map(major => [resolveVersion(major, allSet), major])
);

function codeVersion(version: string): string {
  const major = latestMajorVersions[version];
  return major ? `${code(version)} ${code(major)}` : code(version);
}

async function main() {
  const { markdownTable } = await import('markdown-table');
  const header = [''].concat(environments.map(code));
  const align = ['l'].concat(environments.map(_ => 'c'));
  const row = (version: string) => [codeVersion(version)].concat(environments.map(supports(version)));
  const rows = all.reverse().map(row);
  const table = [header].concat(rows);
  console.log(markdownTable(table, { align }).replace(/oo/g, '🟢').replace(/xx/g, '❌'));
}

main();
