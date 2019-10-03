import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { values, screenId, color, api, checkPhone } from '../../../config';
import SimpleToast from 'react-native-simple-toast';
import ViewShadow from '../../../component/ViewShadow'
import NavBarCustomBtnBack from '../../../component/NavBarCustomBtnBack'
import { PostNoToken } from '../../../config/request';
import { Navigation } from 'react-native-navigation';
export default class ForgotPasswordScreen extends Component {

  static navigatorStyle = {
    // navBarTranslucent: true,
    // navBarButtonColor: color.primaryColor,
    // navBarTranslucent: true, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
    // navBarTransparent: true,
    // drawUnderNavBar: true,
    // topBarElevationShadowEnabled: false,
    navBarHidden: true,


  };
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        icon: require('../../../assets/images/ic_arrow_left.png'),
      }
    ]
  }
  constructor(props) {
    super(props)

    this.state = {
      phoneNumber: '',
    };
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'back') {
        // this.props.navigator.pop()
      }
    }
  };

  onClickNext = () => {
    if (this.state.phoneNumber) {
      if (checkPhone(this.state.phoneNumber)) {
        PostNoToken(api.USER.forgotpass, { phone: this.state.phoneNumber }, (data, status) => {
          if (status) {
            console.log(data)
            if (data.ResponseCode) {
              SimpleToast.show(data.ResponseText,SimpleToast.LONG)
            } else {
              SimpleToast.show(data.ResponseText,SimpleToast.LONG)
            }
          } else {
            SimpleToast.show('Lỗi kết nối')
          }
        })
      } else {
        SimpleToast.show('Vui lòng nhập đúng định dạng số điện thoại')
      }

    } else {
      SimpleToast.show('Vui lòng nhập số điện thoại')
    }

  }

  onChangeText = (type, text) => {
    switch (type) {
      case 'username':
        this.setState({
          username: text
        })
        break;
      default:
        this.setState({
          password: text
        })
        break;
    }
  }
  onClickBack = () => {
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
      >
        <NavBarCustomBtnBack
          onPress={this.onClickBack}
          title={this.props.title}
          leftButton={require('../../../assets/images/arrow-back.png')}
          colorBtn={color.primaryColor}
          backgroundColor={'white'}
        />
        <KeyboardAvoidingView
          behavior='padding'
          style={styles.contain}
        >
          <View style={styles.parentLogo}>
            <Text style={{ fontSize: 24, color: color.textNormal, alignSelf: 'flex-start', fontWeight: '300' }}>Quên mật khẩu</Text>
            <Text style={{ marginTop: 20, marginBottom: 30, fontSize: 18, color: color.textHint }}>{'Vui lòng nhập số điện thoại đã đăng ký với quản trị viên.'}</Text>
            <View style={[styles.ViewTextInput, { marginTop: 40 }]}>
              <Image
                style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: color.primaryColor }}
                source={require('../../../assets/images/phone.png')}
              />
              <TextInput
                underlineColorAndroid='transparent'
                style={styles.textInput}
                placeholderTextColor={color.colorGrey}
                placeholder={'Số điện thoại*'}
                value={this.state.phoneNumber}
                keyboardType='phone-pad'
                onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              />
            </View>
            <View style={{ width: '100%', marginTop: 24 }}>
              <ViewShadow
                onPress={this.onClickNext}
                backgroundColor={color.primaryColor}
                shadowColor={color.primaryColor}
                colorText={'white'}
                textTitle={'GỬI ĐI'}
              />
            </View>
          </View>

        </KeyboardAvoidingView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    // justifyContent: 'center' 
  },
  ViewTextInput: {
    height: 40,
    width: '100%',
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: color.colorLine,
    // fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentLogo: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45, width: '100%',
    backgroundColor: color.primaryColor,
    marginTop: 45,
    borderRadius: 6,
  },
  textLogin: { textAlign: 'center', fontSize: values.fontSizeNormal, color: 'white' },
  buttonLoginFB: {
    justifyContent: 'center', alignItems: 'center', height: 45, width: '100%',
    backgroundColor: 'blue',
  },
  textLoginFB: { textAlign: 'center', fontSize: values.fontSizeNormal, color: 'white' },
  parentTextBottom: { width: '100%', height: 40, paddingHorizontal: 10, position: 'absolute', bottom: 10, left: 0, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'red' },
  textBottom: { backgroundColor: 'transparent', textDecorationLine: 'underline', color: 'black' },
  logo: { height: values.deviceHeight / 11, width: values.deviceWidth - 50, backgroundColor: 'transparent', resizeMode: 'contain', },
  textInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    paddingBottom: 0,
    marginBottom: 5,
    fontSize: 16
  },
})