#!/usr/bin/env node
'use strict'

// NPM
const yargs = require('yargs').argv
const ProgressBar = require('progress')
const fs = require('fs')
const chalk = require('chalk')

// Local Tools
const init = require('./tools/init')
const install = require('./tools/install')

if (yargs.init) {
  init()
} else {
  // Make sure we have the mpm.json file locally
  try {
    require.resolve(`${process.cwd()}/mpm.json`)
  } catch (e) {
    console.error('No mpm.json found, are you in the right place?')
    process.exit();
  }

  // Load up our options
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
  }
  
  // Ticks
  opts.ticks = Object.keys(opts.package.plugins).length
  if (yargs.j) opts.ticks = opts.ticks + 1;
  if (opts.package.configs) {
    opts.ticks = opts.ticks + Object.keys(opts.package.configs).length
  }

  // Yargs args
  if (yargs.a) {
    let newPackage = opts.package
    let name = yargs.a.split('@')[0]
    let resource = yargs.a.split('@')[1]
    newPackage.plugins[name] = resource
    opts.package = newPackage

    fs.writeFile(`${process.cwd()}/mpm.json`, JSON.stringify(newPackage, null, 2), () => {
      console.log(
        `${chalk.green('INSTALLED:')} ${name} at ${resource}`
      );
    });
  }
   
  // Progress Bar
  opts.bar = new ProgressBar(
    `${chalk.blue(':plugin → :to')} ${chalk.green(':bar :elapsed')}`, 
  {
    total: opts.ticks,
    incomplete: '░',
    complete: '█',
    width: 50
  })
  
  // If plugins location directory doesn't exist, create it.
  if (!fs.existsSync(opts.location)){
      fs.mkdirSync(opts.location);
  }

  if (opts.install) {
    install(opts, yargs)
  }
}
