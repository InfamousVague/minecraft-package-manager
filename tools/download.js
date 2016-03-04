'use strict';

const http = require('http');
const fs = require('fs');
const chalk = require('chalk');
const locate = require('./locate');

module.exports = function(opts, callback) {
  if (opts.name) {
    let dest = `${opts.opts.location}/${opts.name}.jar`;
    let plugin = fs.createWriteStream(dest);
    locate(opts.name, opts.resource, opts.opts, fileLocation => {
      if (fileLocation) {
        let request = http.get(fileLocation, function(response) {
          response.pipe(plugin);
          plugin.on('finish', function() {
            plugin.close(callback);
          });
        }).on('error', function(err) {
          fs.unlink(dest);
          console.log(
            `\n${chalk.yellow("WARN:")} Couldn\'t download the ${opts.name} plugin. Check that the resource ${opts.resource} is valid.`
          );
        });
      } else {
        plugin.close(callback);
      }
    });
  }
};
