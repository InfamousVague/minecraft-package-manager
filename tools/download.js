'use strict';

const http = require('http');
const fs = require('fs');

module.exports = function(opts, callback) {
  if (opts.name) {
    if (opts.verbose) {
      console.log(`Starting download of ${opts.name}.jar`);
    }

    let dest = `${opts.opts.location}/${opts.name}.jar`;
    let plugin = fs.createWriteStream(dest);
    let request = http.get(opts.resource, function(response) {
      response.pipe(plugin);
      plugin.on('finish', function() {
        if (opts.verbose) {
          console.log(`Finished downloading ${opts.name}.jar`);
        }
        plugin.close(callback);
      });
    }).on('error', function(err) {
      fs.unlink(dest);
      console.warn(
        `Couldn\'t download the ${opts.name} plugin. Check that the resource ${opts.resource} is valid.`
      );
    });  
  }
};
