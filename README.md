# minecraft-package-manager
It's kinda like npm, but it's for Minecraft. Cool right?

## Installation
mpm requires NodeJS to run, if you're new to node you can simply run the command
below on linux to get mpm up and running in one step.

> (coming soon)

Otherwise you can just run `npm i -g minecraft-package-manager`

## Usage
Did somebody give you a `mpm.json` file? Sweet! All you have to run is

> mpm -i

optionally you can provide a plugins directory (default is plugins)

> mpm -ip sweetPluginsGoHere

![Install Gif](https://fat.gfycat.com/ParchedRadiantApe.gif)

## Setup
Want to setup your very own `mpm.json`? No problem man, just run

> mpm --init

and follow the on screen questions.

More features coming very soon! Have a cool request? Put in a issue.

## Sample `mpm.json`

```
{
  "name": "FullStackMC",
  "description": "One file to deploy all the things!",
  "version": "0.0.1",
  "jar": "http://getspigot.org/spigot19/spigot_server.jar",
  "variables": {
    "replace": [
      ".json",
      ".yml"
    ],
    "with": {
      "address": "127.0.0.1",
      "name": "FullStackMC",
      "port": "25565"
    }
  },
  "plugins": {
    "pet-master": "http://dev.bukkit.org/bukkit-plugins/pet-master/files/4-pet-master-v1-0-3/"
  },
  "configs": {
    "mcmmo": {
      "location": "mcmmo",
      "resource": "http://mysweetcdn.io/FullStackMC/configs/mcmmo.yml"
    }
  }
}

```
