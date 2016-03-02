'use strict';

const download = require('./download');
const chalk = require('chalk');
const configs = require('./configs');

module.exports = function(opts, yargs) {
  let plugins = opts.package.plugins;
  let downloaded = 0;

  if (yargs.j && opts.package.jar) {
    opts.bar.tick(0, {
      plugin: 'Main Jar',
      to: 'root'
    });
    download({
      name: "server",
      resource: opts.package.jar,
      opts: {
        location: process.cwd()
      }
    }, () => {
      opts.bar.tick(1, {
        plugin: 'Main Jar',
        to: 'root'
      });
      pluginTask();
    });
  } else if (yargs.j) {
    console.log(
      `${chalk.yellow("WARN:")} no jar specified in plugins.json, skipping.`
    );
    pluginTask();
  } else {
    pluginTask();
  }

  let pluginTask = function() {
    if (yargs.s) {
      for (let key in plugins) {
        download({
          name: key,
          resource: plugins[key],
          opts
        }, () => {
          opts.bar.tick(1, {
            plugin: key,
            to: opts.shortLocation
          });
          downloaded++;

          if (downloaded >= Object.keys(plugins).length) {
            if (opts.package.configs) {
              configs(opts, yargs);
            } else {
              process.exit();
            }
          }
        });
      }
    } else {
      (function downloadPlugin(i) {
        let key = Object.keys(plugins)[i];

        download({
          name: key,
          resource: plugins[key],
          opts
        }, () => {
          opts.bar.tick(1, {
            plugin: key,
            to: opts.shortLocation
          });

          if (i + 1 < Object.keys(plugins).length) {
            downloadPlugin(i + 1);
          } else {
            if (opts.package.configs) {
              configs(opts, yargs);
            } else {
              process.exit();
            }
          }
        });
      })(0);
    }
  };
};
