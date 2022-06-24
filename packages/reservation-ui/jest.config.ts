import { join } from 'path';
/* eslint-disable */
// import { readFileSync } from 'fs';
// const babelConfig = JSON.parse(readFileSync('./.babelrc', 'utf8'))
// require('babel-register')(babelConfig)
// require('babel-polyfill')
export default {
  displayName: 'reservation-ui',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: join(__dirname, './.babelrc'),
      useESM: true 
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/reservation-ui',
};
