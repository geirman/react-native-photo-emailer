# React Native Photo Emailer
This is a cross-platform, proof-of-concept project with the following expected workflow

* user clicks a button
* user selects an image from the gallery or launches camera to take a new photo
* email launches with the following fields prefilled: to, subject, body, and photo attached
* user reviews and sends

## Key Dependencies

* [react-native-mail](https://github.com/chirag04/react-native-mail)
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

* Android works great
* iOS not so much - I can choose/take a photo and the email application launches, but...
    -- photo is not attached to the email
    -- regardless whether I 'send' or 'delete draft', I get an "Error - Email could not be sent [Ok] [Cancel]" alert, but the email does actually send.


