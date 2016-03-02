# minecraft-package-manager
It's kinda like npm, but it's for Minecraft. Cool right?

## Installation
mpm requires NodeJS to run, if you're new to node you can simply run the command
below on linux to get mpm up and running in one step.

> curl https://mpm.io/install.sh | sh

Otherwise you can just run `npm i -g minecraft-package-manager`

## Usage
Did somebody give you a plugins.json file? Sweet! All you have to run is

> mpm -i

optionally you can provide a plugins directory (default is plugins)

> mpm -ip sweetPluginsGoHere

![Install Gif](http://i.imgur.com/pJ37P1Q.gifv)

## Setup
Want to setup your very own `plugins.json`? No problem man, just run

> mpm --init

and follow the on screen questions.

More features coming very soon! Have a cool request? Put in a issue.
