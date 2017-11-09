/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Alert, Image, Platform, Text } from 'react-native';
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

  isAndroid = Platform.OS === 'android';

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

  pickImage = (to, subject) => {
    const options = this.pickerOptions(subject);
    ImagePicker.showImagePicker(options, (response) => {

      const { path, type, uri } = response;
      const filePath = this.isAndroid ? path : uri;
      const _type = this.isAndroid ? type : 'jpg'; // TODO: might not want to hard code iOS value

      this.setState({uri});
      this.sendEmail(to, subject, filePath, _type);
    });
  }

  sendEmail = (to, subject, path, type) => {
    console.log('sendEmail args:', {to, subject, path, type}, {isAndroid: this.isAndroid});
    Mailer.mail({
        subject,
        recipients: [to],
        body: 'Optional Description:',
        attachment: { path, type, name: subject },
        isHTML: true
    },  (error, result) => {
      console.log('Callback Event:', {error, result});
      if(error) {
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

      if(result) {
        this.setState({result});
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

    return (
      <GroupAtTop>
        <Spacer height={50} />

        <Button
        onPress={this.pickImage.bind(null, '72@test.frogquest.net', 'A1')}>
        Email Photo (A1)
        </Button>
        <Button
        outline
        onPress={this.pickImage.bind(null, '72@test.frogquest.net', 'B1')}>
        Email Photo (B1)
        </Button>
        {image}
        <Text>
            {this.state.result}
        </Text>
      </GroupAtTop>
    );
  }
}
