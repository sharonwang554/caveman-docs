import type { Config } from 'jest';

const config: Config = {
  watchman: false,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': ['ts-jest', {
      tsconfig: { jsx: 'react' }
    }],
  },
  moduleNameMapper: {
    '^@site/(.*)$': '<rootDir>/$1',
    '^@theme/Tabs$': '<rootDir>/__mocks__/@theme/Tabs.tsx',
    '^@theme/TabItem$': '<rootDir>/__mocks__/@theme/TabItem.tsx',
    '^@theme/CodeBlock$': '<rootDir>/__mocks__/@theme/CodeBlock.tsx',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@docusaurus/(.*)$': '<rootDir>/__mocks__/@docusaurus/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.[jt]s?(x)'],
};

export default config;
