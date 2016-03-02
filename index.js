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
    require.resolve(`${process.cwd()}/mpm.json`);
  } catch (e) {
    console.error('No mpm.json found, are you in the right place?');
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
    package: require(`${process.cwd()}/mpm.json`),
    ticks: 0
  };

  opts.ticks = Object.keys(opts.package.plugins).length;
  if (yargs.j) opts.ticks = opts.ticks + 1;
  if (opts.package.configs) {
    opts.ticks = opts.ticks + Object.keys(opts.package.configs).length
  }

  opts.bar = new ProgressBar(
    `${chalk.blue(':plugin → :to')} ${chalk.green(':bar :elapsed')}`
  , {
    total: opts.ticks,
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
