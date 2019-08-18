import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,

} from 'react-native';
import { values, color } from '../../../config';

class EnterRegisterPhoneView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      phone: '',
    };
  };

  onChangeText = (text) => {
    this.setState({
      phone: text
    })
  }


  confirmPhone = () => {
    this.props.confirmPhone()
    
  }

  render() {
    return (
      <View style={{
        width: '100%', height: "100%", paddingHorizontal: 20, position: 'absolute',
        backgroundColor: '#00000070', justifyContent: 'center', alignItems: 'center',
      }}>
        <View style={{ width: '100%', backgroundColor: 'white', padding: 10, borderRadius: values.borderRadiusButtonLogin }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', width: '100%', paddingHorizontal: 10, paddingBottom: 10, textAlign: 'center' }}>Bạn chưa đăng nhập, Vui lòng nhập số điện thoại</Text>
          <TextInput
            underlineColorAndroid='transparent'
            style={styles.textInput}
            placeholderTextColor='#BBBDCB'
            value={this.state.phone}
            keyboardType='numeric'
            placeholder={'Số điện thoại của bạn...'}
            onChangeText={(text) => this.onChangeText(text)}
          />
          <TouchableOpacity
            onPress={this.confirmPhone}
            style={{
              marginTop: 15,
              justifyContent: 'center',
              height: 35, borderRadius: values.borderRadiusButtonLogin,
              alignItems: 'center', backgroundColor: color.primaryColor,
            }}>
            <Text style={{
              fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: "white"
            }}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default EnterRegisterPhoneView