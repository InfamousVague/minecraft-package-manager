'use strict';

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pf = {
};

module.exports = function() {
  rl.question('What shall we call the package file? (no extension): ', name => {
    pf.name = (name) ? name : 'an mpm package';
    rl.question(`Give us a short description of ${pf.name}: `, description => {
      pf.description = (description) ? description : '';
      rl.question(`What version of ${pf.name} is this: `, version => {
        pf.version = (version) ? version : '0.0.0';
        rl.question(`Great, Now lets add a plugin! What's the plugins name: `, pname => {
          pf.plugins = {};
          pf.plugins[pname] = '';
          rl.question(`Cool, What about the download link for ${pname}: `, resource => {
            pf.plugins[pname] = resource;
            (function pluginLoop() {
              rl.question(`Enter another plugin name, or press enter to save: `, pname => {
                if (pname.length) {
                  pf.plugins[pname] = '';
                  rl.question(`And it's download link: `, resource => {
                    pf.plugins[pname] = resource;
                    pluginLoop();
                  })
                } else {
                  fs.writeFile('plugins.json', JSON.stringify(pf, null, 2), function(err) {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log('You\'re all set, your plugins.json has been saved!');
                    }
                    process.exit();
                  });
                  rl.close();
                }
              });
            })();
          });
        });
      });
    });
  });
};
