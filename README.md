# README #

## What is this repository for? ##
Visit our [wiki](https://bitbucket.org/jloureiro/ldso-grupo-3/wiki/Home) to know more


## How do I get set up? ##

### Configuration ###

```
#!bash
$ git clone <Repository URL>
$ cd /to/projectfolder/client
$ ionic platform add android
$ ./icons.sh
$ ionic plugin add com.ionic.keyboard
$ ionic plugin add org.apache.cordova.console
$ ionic plugin add org.apache.cordova.device
$ ionic plugin add org.apache.cordova.dialogs
$ ionic plugin add org.apache.cordova.geolocation
$ ionic plugin add org.apache.cordova.vibration
$ ionic plugin add org.apache.cordova.splashscreen
$ ionic build android
```

### Dependencies ###
You have to install the following:

* [Node.js](http://nodejs.org/)
* [Ionic and Cordova](http://ionicframework.com/getting-started/)

###How to run ###

You have three ways to run our project, either run it on a browse, an emulator or a physical device.

To run it on a browser:
```
#!bash
$ cd /to/projectfolder/client
$ ionic serve
```

To run it on an emulator(**VERY SLOW**):
```
#!bash
$ cd /to/projectfolder/client
$ ionic emulate android
```

To run it on a physical device:
```
#!bash
$ cd /to/projectfolder/client
$ ionic run android
```