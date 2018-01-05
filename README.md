
This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

// support platforms: android only
cordova plugin add https://github.com/DeshanKTD/cordova-plugin-lightsensor

// android and ios
$ ionic cordova plugin add cordova-plugin-gyroscope
$ npm install --save @ionic-native/gyroscope

This plugin provides access to the device’s accelerometer. The accelerometer is a motion sensor that detects the change (delta) in movement relative to the current device orientation, in three dimensions along the x, y, and z axis.
cordova plugin add cordova-plugin-device-motion

cordova plugin add https://github.com/DeshanKTD/cordova-plugin-lightsensor

npm i -S @types/firebase
$ ionic cordova plugin add cordova-sms-plugin
$ npm install --save @ionic-native/sms


=======
# mqtt-test
ionic v3

FormsModule is required to import for two-way binding
The Angular class binding makes it easy to add and remove a CSS class conditionally. Just add [class.some-css-class]="some-condition" to the element you want to style.
