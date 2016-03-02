#!/usr/bin/env node
'use strict';

const yargs = require('yargs').argv;
const ProgressBar = require('progress');
const fs = require('fs');
const chalk = require('chalk');

const init = require('./tools/init');
const install = require('./tools/install');

if (yargs.init) {
  init();
} else {
  try {
    require.resolve(`${process.cwd()}/plugins.json`);
  } catch (e) {
    console.error('No plugins.json found, are you in the right place?');
    process.exit();
  }

  let opts = {
    install: (yargs.i) ? true : false,
    init: (yargs.init) ? true : false,
    verbose: (yargs.v) ? true : false,
    shortLocation: (yargs.p) ?
      `${yargs.p}` : `plugins`,
    location: (yargs.p) ?
      `${process.cwd()}/${yargs.p}` : `${process.cwd()}/plugins`,
    package: require(`${process.cwd()}/plugins.json`)
  };


  opts.bar = new ProgressBar(
    `${chalk.blue(':plugin → ' + opts.shortLocation)} ${chalk.green(':bar :elapsed')}`
  , {
    total: Object.keys(opts.package.plugins).length,
    incomplete: '░',
    complete: '█',
    width: 50
  });

  // If plugins location directory doesn't exist, create it.
  if (!fs.existsSync(opts.location)){
      fs.mkdirSync(opts.location);
  }

  if (opts.install) {
    install(opts, yargs);
  }
}
