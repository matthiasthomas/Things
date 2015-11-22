Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic cordova
$ npm install -g ios-sim
$ npm install -g ios-deploy --unsafe-perm
```

Then run:

```bash
$ cd mobile
$ npm install
$ bower install
$ ionic state restore // restore your application with those 
					  // platforms and plugins in package.json
$ ionic serve (--lab) // start chrome
$ ionic build // use build with xcode 
or 
$ ionic run //build and run emulator with default target ios
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Plugins

* cordova-plugin-device
* cordova-plugin-console
* cordova-plugin-whitelist
* cordova-plugin-splashscreen
* com.ionic.keyboard
* plugin.google.maps

If you need to add an other plugin  `ionic plugin add`


## Error build ios

```
ld: warning: object file (Things/Plugins/com.googlemaps.ios/GoogleMaps.framework/GoogleMaps(GMSCachedTile.o)) was built for newer iOS version (7.0) than being linked (6.0)
```

* Show the Project navigator
* Target the main project `Things`
* Tab General > Deployement info > Deployment target 9.1
* Tab Build Setting > Search with all target `bitcode` > change to `NO`
* Clean project `cmd + shift + K`
* Run `cmd + R`