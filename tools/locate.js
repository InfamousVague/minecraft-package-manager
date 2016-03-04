'use strict';
// This file locates the correct file to download

const request = require('request');
const chalk = require('chalk');

module.exports = function(file, resource, opts, cb) {
  if (resource.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)) {
    cb(resource);
  } else {
    if (opts.package.registry) {
      request.post({
        url: opts.package.registry,
        form: {
          file: file,
          version: resource
        }
      },
      function(err, httpResponse, body) {
        if (err) {
          console.log(
            `\n${chalk.yellow("WARN:")} The registry couldn't find a resource for ${file}. Skipping.`
          );
        } else {
          if (body.success) {
            cb(body.success);
          } else {
            console.log(
              `\n${chalk.yellow("WARN:")} The registry couldn't find a resource for ${file}. Skipping.`
            );
            cb(false);
          }
        }
      });
    } else {
      console.log(
        `${chalk.yellow("WARN:")} ${file} expected to be downloaded from a registry, but no registry was provided.`
      );
      cb(false);
    }
  }
}
