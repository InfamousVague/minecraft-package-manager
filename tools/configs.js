'use strict';

const http = require('http');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function(opts, yargs) {
  // Track how many configs have been downloaded for tracking concurrent download completion
  let downloaded = 0;

  const processNext = function(fileName, file) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      let newFile = data.replace(/\{\{(.*?)\}\}/g, function(match, token) {
        let eToken = '';

        if (opts.package.variables) {
          if (opts.package.variables[token]) {
            eToken = opts.package.variables[token];
          } else {
            console.log(
              chalk.yellow(
                `WARN: ${fileName} expected a variable ${token} to be present in your mpm.json, but it wasn't.`
              )
            );
          }
        } else {
          console.log(
            chalk.yellow(
              `WARN: ${fileName} expected a variable ${token} to be present in your mpm.json, but it wasn't.`
            )
          );
        }
        return eToken;
      });

      fs.writeFile(file, newFile, 'utf8', function (err) {
        if (err) return console.log(err);
        opts.bar.tick(1, {
          plugin: fileName,
          to: 'configs'
        });

        downloaded++;
        if (downloaded >= Object.keys(opts.package.configs).length) {
          process.exit();
        }
      });
    });
  };

  for (let i = 0; i < Object.keys(opts.package.configs).length; i++) {
    let configKey = Object.keys(opts.package.configs)[i];
    let configObj = opts.package.configs[configKey];

    let dest = (configObj.rootLevel) ?
      `${process.cwd()}` :
      (configObj.location) ?
        `${opts.location}/${configObj.location}` :
        `${opts.location}`;

    if (!fs.existsSync(dest)){
        fs.mkdirSync(dest);
    }

    let config = fs.createWriteStream(`${dest}/${configKey}`);
    let request = http.get(configObj.resource, function(response) {
      response.pipe(config);
      config.on('finish', function() {
        if (opts.verbose) {
          console.log(`Finished downloading ${configKey}`);
        }
        config.close(processNext(configKey, `${dest}/${configKey}`));
      });
    }).on('error', function(err) {
      fs.unlink(dest);
      console.log(
        `${chalk.yellow("WARN:")} Couldn\'t download the ${configKey} config. Check that the resource ${configObj.resource} is valid.`
      );
    });
  }
};
