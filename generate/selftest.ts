import * as fs from 'fs';
import * as YAML from 'yaml';
import { versions } from './versions';

for (const [name, supported] of Object.entries(versions)) {
  const file = `.github/workflows/selftest.${name}.yml`;
  const yaml = YAML.parse(fs.readFileSync(file, 'utf8'));
  yaml.jobs.build.strategy.matrix.os = [name];
  yaml.jobs.build.strategy.matrix.ghc = supported;
  fs.writeFileSync(file, YAML.stringify(yaml));
}
