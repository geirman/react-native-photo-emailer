# React Native Photo Emailer
This is a cross-platform, proof-of-concept project with the following expected workflow

* user clicks a button
* user selects an image from the gallery or launches camera to take a new photo
* email launches with the following fields prefilled: to, subject, body, and photo attached
* user reviews and sends

## Key Dependencies

* [react-native-mail](https://github.com/chirag04/react-native-mail)
  ** see the modifications I made to this package in this [stackoverflow answer](https://stackoverflow.com/a/47171736/1349269)
* [react-native-image-picker](https://github.com/react-community/react-native-image-picker)

## Install

Should be pretty straight forward. Choose your poison, either install via npm or yarn.

```
npm install // via npm
yarn // via yarn
```

I have created a solidarity snapshot, so if a simple install doesn't work, you can run the following to check your environment config against the snapshot.

```
yarn solidarity
```
You can learn more about solidarity by reading [Solidarity--The CLI for Developer Sanity](https://shift.infinite.red/solidarity-the-cli-for-developer-sanity-672fa81b98e9)

## Known Issues

* No known issues

## Tested on these physical devices

* Moto Z (Android 7.0)
* Moto X (Android 5.1)
* iPhone 5s
* iPhone 6
* 10.5" iPad (v 11.0.2)


