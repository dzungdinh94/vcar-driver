import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  Dimensions
} from 'react-native';
import { values, screenId, color, api } from '../../../config';
import SimpleToast from 'react-native-simple-toast';
import { showApp } from '../../../../App';
import ViewShadow from '../../../component/ViewShadow'
import { PostWithToken, PostNoToken } from '../../../config/request'
import { Toast, checkPhone } from '../../../utils/Func';
import { observer, inject } from 'mobx-react'
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
// import FCM from 'react-native-fcm'
let { height, width } = Dimensions.get('window')
@inject('User')
@observer
export default class LoginScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
    // navBarBackgroundColor: 'white',
    // navBarButtonColor: color.primaryColor,
    // navBarTitleTextCentered: true,
    // navBarTextColor: '#FFFFFF',
    // topBarElevationShadowEnabled: false,
  };
  constructor(props) {
    super(props)
    
    this.state = {
      // username: '013355651123',
      // password: '123456',
      height, width,
      username: '',
      password: '',
    };

  };

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

  clickLogin = () => {
    // showApp()
    // this.props.navigator.push(
    //   {
    //     screen: 'Main', // unique ID registered with Navigation.registerScreen
    //     // title: screenId.LOGIN.title.forgotPassword,
    //   })
    let { User } = this.props

    AsyncStorage.getItem('fcm').then(fcm => {
      if (fcm) {
        console.log("FCM", fcm)
        this.login(fcm)
      } else {
        firebase.messaging().getToken().then(token => {
          AsyncStorage.setItem('fcm', token)
          this.login(fcm)
        });
      }
    })
  };
  login = fcm => {
    let { User } = this.props
    if (this.state.username && this.state.password) {
      if (checkPhone(this.state.username)) {
        let jsonLogin = {
          username: this.state.username,
          password: this.state.password,
          fcmId: fcm
        }
        PostNoToken("/mobile/driver/login", jsonLogin, (data, status) => {
          if (status) {
            if (data.ResponseCode) {
              console.log(data.data,"userLogin")
              User.setUserInfo(data.data)
              User.setToken(data.data.token)
              AsyncStorage.setItem('token', data.data.token)
              showApp()
            } else {
              Toast('Số điện thoại hoặc mật khẩu không chính xác')
            }
          } else {
            Toast('Đăng nhập thất lại')
          }
        })
      } else {
        Toast('Vui lòng nhập đúng định dạng số điện thoại')
      }

    } else {
      Toast('Không được để trống số điện thoại hoặc mật khẩu')
    }

  }

  clickLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(["public_profile"])
      .then(result => {
        console.log('result: ' + JSON.stringify(result))
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          this.loginAccountToServer();
          console.log(
            "Login success with permissions 1: " + JSON.stringify(result)
          );
        }
      })
      .catch(error => {
        console.log("Login fail with error: " + error);
      });
  };

  loginAccountToServer() {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        // alert('token: ' + data.accessToken.toString());
        // this.props.User.loginFBAccount(data.accessToken.toString());
      })
      .catch(error => {
        console.log("error: " + error);
      });
  }

  clickForgotPassword = () => {
    
    // this.props.navigator.push(
    //   {
    //     screen: 'ForgotPasswordScreen', // unique ID registered with Navigation.registerScreen
    //     // title: 'Quên mật khẩu',
    //   })
      Navigation.push(this.props.componentId, {
        component: {
          name: 'ForgotPasswordScreen',
          options: {
            topBar: {
              visible:false
            }
          }
        }
      });
  };

  clickCreacteAccount = () => {
    // this.props.navigator.push(
    //   {
    //     screen: 'RegisterScreen', // unique ID registered with Navigation.registerScreen
    //   }
    // )
    Navigation.push(this.props.componentId, {
      component: {
        name: 'RegisterScreen',
        options: {
          topBar: {
            visible:false
          }
        }
      }
    });
  }


  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        enabled={values.platform === 'ios' ? true : false}
        style={{ width: '100%', height: '100%' }}
      >
        <ScrollView
          style={{ width: '100%', height: '100%' }}
          keyboardShouldPersistTaps='always'
        >

          <View
            style={[styles.contain]}
          >

            <View style={styles.parentLogo}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  textAlign: 'center', fontWeight: '300', fontSize: 24, color: color.primaryColor,
                  paddingHorizontal: 20, paddingBottom: 20,
                }}>Xin chào!</Text>
                <Text style={{
                  textAlign: 'center', fontWeight: '300', fontSize: 18, paddingHorizontal: 20,
                  color: color.LOGIN.colorTextDes
                }}>Đăng nhập vào tài khoản của bạn</Text>
              </View>
              <View style={[styles.ViewTextInput, { marginTop: 40 }]}>
                <Image
                  style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: color.primaryColor }}
                  source={require('../../../assets/images/phone.png')}
                />
                <TextInput
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  placeholderTextColor={color.colorGrey}
                  placeholder={'Số điện thoại'}
                  keyboardType='phone-pad'
                  value={this.state.username}
                  onChangeText={(text) => this.onChangeText('username', text)}
                />
              </View>
              <View style={[styles.ViewTextInput, { marginTop: 15 }]}>
                <Image
                  style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: color.primaryColor }}
                  source={require('../../../assets/images/lock-open.png')}
                />
                <TextInput
                  underlineColorAndroid='transparent'
                  style={styles.textInput}
                  placeholderTextColor={color.colorGrey}
                  placeholder={'Mật khẩu'}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => this.onChangeText('password', text)}
                />
                <TouchableOpacity onPress={this.clickForgotPassword}>
                  <Text style={{ fontSize: 12, color: color.primaryColor, fontStyle: 'italic' }}>{'Quên mật khẩu?'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 40, width: '100%' }}>
                <View style={{ width: '100%', marginBottom: 20, marginTop: 10 }}>
                  <ViewShadow
                    onPress={this.clickLogin}
                    backgroundColor={color.primaryColor}
                    shadowColor={color.primaryColor}
                    colorText={'white'}
                    textTitle={'ĐĂNG NHẬP'}
                  />
                </View>
                <View style={styles.parentTextBottom}>
                  <View>
                    <Text
                      onPress={this.clickCreacteAccount}
                      style={styles.textRigister}>{'Bạn chưa có tài khoản?'}</Text>
                  </View>
                  <View>
                    <Text
                      onPress={this.clickCreacteAccount}
                      style={styles.textBottom}>{'Đăng ký ngay'}</Text>
                  </View>
                </View>
              </View>

            </View>


          </View>
        </ScrollView>

      </KeyboardAvoidingView >
    );
  }
}


const styles = StyleSheet.create({
  contain: {
    height: height,
    width: width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtLogin: { color: 'white', fontSize: 16, fontWeight: '500', },

  parentLogo: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonLogin: {
    justifyContent: 'center', alignItems: 'center', height: 45, width: '100%',
    backgroundColor: color.primaryColor, borderRadius: 25,
  },
  textLogin: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  },
  buttonLoginFB: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 0.7,
    borderColor: '#FFFFFF'
  },
  parentTextBottom: {
    width: '100%',
    paddingHorizontal: 20,
    // position: 'absolute',
    // bottom: 10,
    // left: 0,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textBottom: {
    backgroundColor: 'transparent',
    paddingTop: 20,
    color: color.primaryColor,
    fontSize: 14
  },
  textRigister: {
    backgroundColor: 'transparent',
    paddingTop: 20,
    color: 'rgba(0, 0, 0, 0.45)',
    fontSize: 14
  },
  logo: {
    height: (values.deviceWidth - 50) / 4,
    width: values.deviceWidth - 50,
    backgroundColor: 'transparent',
    resizeMode: 'contain'
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
  textInput: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    paddingBottom: 0,
    marginBottom: 5,
    fontSize: 16
  },
  btnLogin: {
    width: "100%",
    backgroundColor: color.primaryColor, height: 45,
    borderRadius: 22.5, justifyContent: 'center', alignItems: 'center',
    marginVertical: 20,
  },
  shadowPhone:
    values.platform == 'ios' ? {
      shadowColor: color.primaryColor,
      shadowOffset: { width: 0, height: 7 },
      shadowOpacity: 0.65,
      shadowRadius: 7,
    }
      :
      { elevation: 7, marginBottom: 10, },
})