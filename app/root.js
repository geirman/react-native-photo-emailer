/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Button } from './components/button';
import { SpaceAround } from './components/wrappers';

import ImagePicker from 'react-native-image-picker';
import Mailer from 'react-native-mail';

export default class Root extends Component<{}> {
  pickerOptions = {
      title: 'Select Image',
      storageOptions: {
          skipBackup: true,
          path: 'images',
      }
  }

  // ****************************
  // Android
  // ****************************
  handleAndroid = (to, subject) => {
    ImagePicker.showImagePicker(this.pickerOptions, (response) => {
        const { path, type } = response;
        this.sendImageAndroid(to, subject, path, type);
    });
  }

  sendImageAndroid = (to, subject, path, type) => {
    Mailer.mail({
        subject,
        recipients: [to],
        body: 'Optional Comment: ',
        attachment: { path, type, name: subject },
        isHTML: true
    }, (error, event) => {
        console.log(error);
        Alert.alert(
          'Error',
          'Email could not be sent',
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
    });
  }

  // ****************************
  // IOS
  // ****************************
  handleIOS = (to, subject) => {
    ImagePicker.showImagePicker(this.pickerOptions, (response) => {
        const { uri } = response;
        this.sendImageIOS(to, subject, uri, 'jpeg');
    });
  }

  sendImageIOS = (to, subject, path, type) => {
    Mailer.mail({
        subject,
        recipients: [to],
        body: 'Optional Comment: ',
        attachment: { path, type, name: subject },
        isHTML: true
    }, (error, event) => {
        console.log(error);
        Alert.alert(
          'Error',
          'Email could not be sent',
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
    });
  }

  render() {
    return (
      <SpaceAround>
        <Button
          outline
          onPress={this.handleAndroid.bind(null, '72@test.frogquest.net', 'A1')}>
          Email Photo (Android)
        </Button>
        <Button
          outline
          onPress={this.handleIOS.bind(null, '72@test.frogquest.net', 'B1')}>
          Email Photo (iOS)
        </Button>
      </SpaceAround>
    );
  }
}
