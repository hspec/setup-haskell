import { all, versions } from './versions';

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
  const rows = all.reverse().map(row);
  const table = [header].concat(rows);
  console.log(markdownTable(table, { align }).replace(/oo/g, '🟢').replace(/xx/g, '❌'));
}

main();
