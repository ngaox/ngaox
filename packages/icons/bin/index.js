#!/usr/bin/env node
const start = +new Date();
const yargs = require('yargs');
const buildIcons = require('./build-icons');
const { log } = require('../../scripts-utils');

function commandEnd() {
  const end = +new Date();
  log(`Executed at: ${new Date().toISOString()} - Time: ${end - start}ms`);
}

yargs
  .scriptName('ngaox-icons')
  .usage('$0 <cmd> [args]')
  .command(
    'build <dir> <output>',
    'build an svgs directory to a json file ready to import in `@ngaox/icons`',
    yargs => {
      return yargs
        .positional('dir', {
          type: 'string',
          description: 'the directory that contain svg files.'
        })
        .positional('output', {
          type: 'string',
          description: 'where to store the generated json file'
        })
        .option('namespace', {
          type: 'string',
          default: '',
          description: 'the namespace which all icons belongs to'
        });
    },
    async function (argv) {
      await buildIcons(argv.dir, argv.output, argv.namespace);
      commandEnd();
    }
  )
  .alias('h', 'help')
  .help('h').argv;
