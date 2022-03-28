import type { Config } from '@jest/types';

import defaults from './jest.config';

const config: Config.InitialOptions = {
  ...defaults,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
