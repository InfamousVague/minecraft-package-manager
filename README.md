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

## Setup
Want to setup your very own `mpm.json`? No problem man, just run

> mpm --init

and follow the on screen questions.

More features coming very soon! Have a cool request? Put in a issue.

## Features

### Global variables

If you have the need for dynamic variables in your config files, use the standard
format of `{{variable_name}}` anywhere in the config file and provide the variable
value in the `mpm.json` file under `"variables"`. (see example below)

### Jar Pulls

If you'd like to pull the jar listed in the `mpm.json` file simply add the `-j`
flag.

### Synchronous vs Asynchronous

Provide no flag after `-i` for asynchronous downloading, this process will be
slower but less load on the network and server. For speedy downloads provide the
`-s` flag when installing.

### Config files

Config files should be placed under the `"configs"` object in `mpm.json` and
follow the schema below.

```
{
  "rootLevel": false, // use this for things like server.properties
  "resource": "http://www.com/123.json", // This is where we download the file from.
  "location": "CoolPlugin" // This is appended to the plugin directory for nested config files.
}
```

## Sample `mpm.json`

```
{
  "name": "FullStackMC",
  "description": "One file to deploy all the things!",
  "version": "0.0.1",
  "jar": "http://getspigot.org/spigot19/spigot_server.jar",
  "variables": {
    "address": "127.0.0.1",
    "name": "FullStackMC",
    "port": "25565"
  },
  "plugins": {
    "pet-master": "http://dev.bukkit.org/bukkit-plugins/pet-master/files/4-pet-master-v1-0-3/"
  },
  "configs": {
    "mcmmo": {
      "location": "mcmmo",
      "resource": "http://mysweetcdn.io/FullStackMC/configs/mcmmo.yml"
    },
    "server.properties": {
      "rootLevel": true,
      "resource": "http://mysweetcdn.io/FullStackMC/configs/server.properties"
    }
  }
}

```
