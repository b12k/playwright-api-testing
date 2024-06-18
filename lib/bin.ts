#!/usr/bin/env node

import { program } from 'commander';
import { snakeCase } from 'lodash-es';
import path from 'node:path';
import shelljs from 'shelljs';
import updateNotifier from 'update-notifier';

import packageJson from '../package.json' assert { type: 'json' };

type CliOptions = {
  baseGqlUrl?: string;
  baseRestUrl?: string;
  baseUrl?: string;
  logLevel?: string;
  version: boolean;
};

updateNotifier({
  pkg: packageJson,
  shouldNotifyInNpmScript: true,
  updateCheckInterval: 0,
}).notify({
  defer: false,
});

const options = program
  .option('-b, --base-url <baseUrl>', 'Base URL')
  .option('-r, --base-rest-url <baseRestUrl>', 'Base GQL URL')
  .option('-g, --base-gql-url <baseGqlUrl>', 'Base REST URL')
  .option('-v, --version', 'Show current version')
  .option(
    '-l, --log-level <logLevel>',
    'Pactum log level: VERBOSE, TRACE, DEBUG, INFO (default), WARN, ERROR, SILENT',
  )
  .helpOption('-h, --help', 'Display this help')
  .parse()
  .opts<CliOptions>();

if (options.version) {
  const { name, version } = packageJson;

  console.log(`${name}: v${version}`);
  process.exit();
}

Object.entries(options).forEach(([key, value]) => {
  const variableName = snakeCase(key).toUpperCase();
  process.env[variableName] = value as string;
});

const dir = path.join(import.meta.dirname, '..');
process.chdir(dir);

shelljs.exec('npx playwright test');
