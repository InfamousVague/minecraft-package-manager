#!/usr/bin/env node
'use strict';

const yargs = require('yargs').argv;
const download = require('./tools/download');
const init = require('./tools/init');
const ProgressBar = require('progress');
const fs = require('fs');
const chalk = require('chalk');

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
    `${chalk.blue(':plugin → ' + opts.shortLocation)} ${chalk.green(':bar')}`
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

  const tasks = {
    i: function() {
      let plugins = opts.package.plugins;

      (function downloadPlugin(i) {
        let key = Object.keys(plugins)[i];

        download({
          name: key,
          resource: plugins[key],
          opts
        }, () => {
          opts.bar.tick(1, {
            plugin: key
          });

          if (i + 1 < Object.keys(plugins).length) {
            downloadPlugin(i + 1);
          } else {
            process.exit();
          }
        });
      })(0);
    },
    init
  };

  if (opts.install) {
    tasks.i();
  }
}
