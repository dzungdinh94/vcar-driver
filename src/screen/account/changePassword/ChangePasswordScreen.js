import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import { values, screenId, color } from '../../../config';
import SimpleToast from 'react-native-simple-toast';

export default class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
    };

  };

  onChangeText = (text) => {
    this.setState({
      username: text
    })
  }

  clickSend = () => {

  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.contain}
      >
        <View style={styles.parentLogo}>
          <Image source={require('../../../assets/images/ic_logo_1.png')}
            style={styles.logo} />
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.textInput}
            placeholderTextColor='#E6E6EA'
            placeholder={'TênÏ'}
            value={this.state.username}
            onChangeText={(text) => this.onChangeText('username', text)}
          />
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.textInput}
            placeholderTextColor='#E6E6EA'
            placeholder={'Mật khẩu'}
            value={this.state.password}
            onChangeText={(text) => this.onChangeText('password', text)}
          />
          <TouchableOpacity onPress={this.clickLogin} style={styles.buttonLogin}>
            <Text style={styles.textLogin}>{'Đăng nhâp'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  contain: { flex: 1, width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  parentLogo: { width: '100%', paddingHorizontal: 20, alignItems: 'center', },
  buttonLogin: {
    justifyContent: 'center', alignItems: 'center', height: 45, width: '100%',
    backgroundColor: color.primaryColor, marginVertical: 20,
  },
  textLogin: { textAlign: 'center', fontSize: values.fontSizeNormal, color: 'white' },
  buttonLoginFB: {
    justifyContent: 'center', alignItems: 'center', height: 45, width: '100%',
    backgroundColor: 'blue',
  },
  textLoginFB: { textAlign: 'center', fontSize: values.fontSizeNormal, color: 'white' },
  parentTextBottom: { width: '100%', height: 40, paddingHorizontal: 10, position: 'absolute', bottom: 10, left: 0, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'red' },
  textBottom: { backgroundColor: 'transparent', textDecorationLine: 'underline', color: 'black' },
  logo: { height: values.deviceHeight / 11, width: values.deviceWidth - 50, backgroundColor: 'transparent', resizeMode: 'contain' },
  textInput: { height: 40, width: '100%', paddingLeft: 5, backgroundColor: 'green', color: 'black', fontSize: 15, },
})