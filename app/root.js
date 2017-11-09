/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Alert, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { Button } from './components/button';
import { GroupAtTop, Spacer } from './components/layout';

import ImagePicker from 'react-native-image-picker';
import Mailer from 'react-native-mail';

export default class Root extends Component<{}> {
  state = {
      uri: '',
      result: ''
  }

  pickerOptions = (subject) => ({
    title: `Photo for ${subject}`,
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 1,
    storageOptions: {
      skipBackup: true,
      cameraRoll: true
    },
    permissionDenied: {
      title: 'Permission Denied',
      text: 'To take photos using your camera or select photos from your gallery',
      reTryTitle: 'Retry',
      okTitle: 'I\'m Sure!'
    }
  })

  // ****************************
  // Android
  // ****************************
  handleAndroid = (to, subject) => {
    ImagePicker.showImagePicker(this.pickerOptions(subject), (response) => {
        const { path, type } = response;
        this.setState({uri: path});
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
      if(error) {
          console.log('Error: Email could not be sent', error);
          Alert.alert(
            'Error',
            'Email could not be sent',
            [
              {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
              {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
            ],
            { cancelable: true }
          )
        }
    });
  }

  // ****************************
  // IOS
  // ****************************
  handleIOS = (to, subject) => {
    ImagePicker.showImagePicker(this.pickerOptions(subject), (response) => {
        const { uri } = response;
        const _uri = uri.replace('file://', '');
        this.setState({ uri, _uri });
        this.sendImageIOS(to, subject, uri, 'jpg');
    });
  }

  sendImageIOS = (to, subject, path, type) => {
    Mailer.mail({
        subject,
        recipients: [to],
        body: 'Optional Comment: ',
        attachment: { path, type, name: subject },
        isHTML: true
    }, (err, res) => {
      console.log('Callback Event:', {err, res});
      if(err) {
        Alert.alert(
          'Error',
          'Email could not be sent',
          [
            {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
            {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
          ],
          { cancelable: true }
        )
      }

      if(res) {
        this.setState({result: res});
      }

    });
  }

  getImage = () => !this.state.uri ? null : (
    <Image
        source={{uri: this.state.uri}}
        style={{width: 200, height: 200}}
        resizeMode='cover' />
  );

  render() {
    const stateStr = JSON.stringify(this.state, null, 2);
    const image = this.getImage();
    console.log('STATE: ', stateStr);
    return (
      <GroupAtTop>
        <Spacer height={50} />

        <Button
        onPress={this.handleAndroid.bind(null, '72@test.frogquest.net', 'A1')}>
        Email Photo (Android)
        </Button>
        <Button
        outline
        onPress={this.handleIOS.bind(null, '72@test.frogquest.net', 'B1')}>
        Email Photo (iOS)
        </Button>
        {image}
        <Text>
            {this.state.result}
        </Text>
      </GroupAtTop>
    );
  }
}
