import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  ScrollView,
  Linking,
  Keyboard
} from 'react-native';
import { values, screenId, color, api } from '../../../config';
import { Toast, checkPhone } from '../../../utils/Func';
import { observer, inject } from 'mobx-react'
import TypeCareModal from './TypeCareModal';
import NavBarCustomBtnBack from '../../../component/NavBarCustomBtnBack'
var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

import _ from 'lodash'
import { UploadImageAxios } from '../../../config/request';
import SimpleToast from 'react-native-simple-toast';
import { Navigation } from 'react-native-navigation';
@inject('User', 'Home')
@observer
export default class RegisterScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: color.primaryColor,
    // navBarTranslucent: true, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
    // navBarTransparent: true,
    // // drawUnderNavBar: true,
    // topBarElevationShadowEnabled: false,
    navBarHidden: true,

  };


  constructor(props) {
    super(props)
    let { width, height } = Dimensions.get('window');
    this.state = {
      nameCar: '',
      fullName: '',
      phoneNumber: '',
      BKS: '',
      password: '',
      rePass: '',
      width,
      height,
      avatarSource: '',
      avatar: '',// lưu lại đường dẫn ảnh khi upload xong để gửi lên đăng ký tài khoản
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

  componentDidMount() {
    this.props.Home.getTypeCar()
  }

  clickSend = () => {
    let { Home, User } = this.props
    let { fullName, phoneNumber, BKS, password, rePass, avatar, nameCar } = this.state
    if (nameCar && fullName && phoneNumber && BKS && password && rePass && Home.itemTypeCarSelected) {
      if (checkPhone(phoneNumber)) {
        if (password === rePass) {
          User.signin(fullName, phoneNumber, Home.itemTypeCarSelected.id, BKS, password, avatar, nameCar, (status) => {
            if (status) {
              Navigation.showOverlay({
                component: {
                  name: 'AlerWarningRigister',
                  passProps: {
                    type: 'register'
                  }, 
                  options: {
                    
                    layout: {
                      backgroundColor: '#00000080'
                    }
                  }
                }
              });
              // this.props.navigator.showLightBox({
              //   screen: "AlerWarningRigister", // unique ID registered with Navigation.registerScreen
              //   title: "Modal", // title of the screen as appears in the nav bar (optional)
              //   passProps: {
              //     type: 'register'
              //   }, // simple serializable object that will pass as props to the modal (optional)
              //   navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              //   animationType: 'slide-up',// 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
              //   style: {
              //     backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
              //     backgroundColor: "#00000080", // tint color for the background, you can specify alpha here (optional)
              //     tapBackgroundToDismiss: false // dismisses LightBox on background taps (optional)
              //   },
              // });
            }
          })
        } else {
          Toast("Mật khẩu không khớp")

        }
      } else {
        Toast("Vui lòng nhập đúng định dạng số điện thoại")
      }
    } else {
      Toast('Không được để trống những trường *')
    }






  };

  changeAvatar = () => {
    let { User } = this.props;
    Keyboard.dismiss()
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        UploadImageAxios(api.UPLOAD.fileupload, response.uri, User.access_token, (data) => {
          if (data.ResponseCode) {
            this.setState({
              avatarSource: api.domain + '/' + data.data,
              avatar: data.data
            })
            Toast('Tải ảnh lên thành công')
          } else {
            Toast('Tải ảnh lên thất bại')
          }
        }, (t) => {
          console.log(t)
        })
      }
    });
  }

  showModal = () => {
    Keyboard.dismiss()
    // if (values.platform == 'ios') {
    // Navigation.showModal({
    //   stack: {
    //     children: [{
    //       component: {
    //         name: 'TypeCareModal',

    //         options: {
    //           topBar: {
    //            visible:false
    //           },
    //           layout: {
    //             backgroundColor: '#00000080'
    //           }
    //         }
    //       }
    //     }]
    //   }
    // });
    Navigation.showOverlay({
      component: {
        name: 'TypeCareModal',
        options: {
          
          layout: {
            backgroundColor: '#00000080'
          }
        }
      }
    });
    // this.props.navigator.showLightBox({
    //   screen: "TypeCareModal", // unique ID registered with Navigation.registerScreen
    //   passProps: {}, // simple serializable object that will pass as props to the modal (optional)
    //   style: {
    //     // backgroundBlur: 'dark', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
    //     backgroundColor: '#00000080', // tint color for the background, you can specify alpha here (optional)
    //     tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
    //   },
    //   // navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    //   animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    // });
    // } else {
    //   this.props.navigator.showModal({
    //     screen: "TypeCareModal", // unique ID registered with Navigation.registerScreen
    //     passProps: {}, // simple serializable object that will pass as props to the modal (optional)
    //     // navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    //     animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    //   });
    // }


  }
  onClickBack = () => {
    // this.props.navigator.pop({
    //   animated: true, // does the pop have transition animation or does it happen immediately (optional)
    //   animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    // });
    Navigation.pop(this.props.componentId);
  }
  onClickDk = () => {
    if (this.props.Home.linkTermOfService) {
      Linking.openURL(this.props.Home.linkTermOfService)
    } else {
      SimpleToast.show('Không tìm thấy link đăng ký')
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBarCustomBtnBack
          onPress={this.onClickBack}
          title={this.props.title}
          leftButton={require('../../../assets/images/arrow-back.png')}
          colorBtn={color.primaryColor}
          backgroundColor={'white'}
        />
        <ScrollView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
        >
          <KeyboardAvoidingView
            behavior='padding'
            enabled={values.platform == 'ios' ? true : false}
            style={styles.contain}
          >
            <View style={{ width: '100%', paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 24, color: color.textNormal, marginTop: values.platform == 'android' ? 0 : 0, }}>Đăng ký tài khoản</Text>
              <Text style={{ marginTop: 16, fontSize: 18, color: color.textHint }}>Lái xe vui lòng cung cấp đầy đủ thông tin bên dưới để tiện liên hệ</Text>
            </View>
            <View style={styles.parentLogo}>
              <TouchableOpacity onPress={this.changeAvatar} style={{
                borderRadius: (values.deviceWidth / 3 + 10) / 2,
                overflow: 'hidden',
                height: values.deviceWidth / 3 + 10, backgroundColor: 'transparent',
                width: values.deviceWidth / 3 + 10, overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: color.RIGGISTER.colorLineAvatarRigister,
              }}>
                <View style={styles.imgAvatar}>
                  <Image source={this.state.avatarSource ? { uri: this.state.avatarSource } : require('../../../assets/images/icon_camera.png')}
                    style={this.state.avatarSource ? styles.imgAvatar : styles.logo} />
                </View>

              </TouchableOpacity>
              <View style={{ marginTop: 15, width: '100%' }}>
                <View style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/assignment-ind.png')}
                    style={styles.iconImage} />
                  <TextInput
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    onSubmitEditing={(event) => {
                      this.refs.textInputPhoneNumber.focus()
                    }}
                    returnKeyType="next"
                    placeholderTextColor={color.textHint}
                    placeholder={'Họ tên*'}
                    value={this.state.fullName}
                    onChangeText={(fullName) => this.setState({ fullName })}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/phone.png')}
                    style={styles.iconImage} />
                  <TextInput
                    ref="textInputPhoneNumber"
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    onSubmitEditing={(event) => {
                      this.showModal()
                    }}
                    returnKeyType="next"
                    placeholderTextColor={color.textHint}
                    placeholder={'Số điện thoại*'}
                    keyboardType='numeric'
                    value={this.state.phoneNumber}
                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                  />
                </View>
                <TouchableOpacity
                  onPress={this.showModal}
                  style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/directions-bike.png')}
                    style={styles.iconImage} />
                  <Text style={[{
                    fontSize: 15,
                    paddingLeft: 15,
                    flex: 1
                  }, this.props.Home.itemTypeCarSelected ? { color: color.textNormal } : { color: color.textHint }]}>{_.size(this.props.Home.itemTypeCarSelected) > 0 ? this.props.Home.itemTypeCarSelected.name : 'Chọn loại xe*'}</Text>
                  <Image source={require('../../../assets/images/arrow-drop-down.png')}
                    style={styles.iconImageDropDown} />
                </TouchableOpacity>
                <View style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/receipt.png')}
                    style={styles.iconImage} />
                  <TextInput
                    ref="textInputBKH"
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    onSubmitEditing={(event) => {
                      this.refs.nameCarInput.focus()
                    }}
                    returnKeyType="next"
                    placeholderTextColor={color.textHint}
                    placeholder={'Biển số xe*'}
                    value={this.state.BKS}
                    onChangeText={(BKS) => this.setState({ BKS })}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/receipt.png')}
                    style={styles.iconImage} />
                  <TextInput
                    ref="nameCarInput"
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    onSubmitEditing={(event) => {
                      this.refs.textInputPass.focus()
                    }}
                    returnKeyType="next"
                    placeholderTextColor={color.textHint}
                    placeholder={'Tên xe của bạn*'}
                    value={this.state.nameCar}
                    onChangeText={(nameCar) => this.setState({ nameCar })}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/lock-open.png')}
                    style={styles.iconImage} />
                  <TextInput
                    ref="textInputPass"
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    secureTextEntry={true}
                    onSubmitEditing={(event) => {
                      this.refs.textInputRePass.focus()
                    }}
                    returnKeyType="next"
                    placeholder={'Mật khẩu*'}
                    placeholderTextColor={color.textHint}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>
                <View style={styles.viewTextInput}>
                  <Image source={require('../../../assets/images/lock-open.png')}
                    style={styles.iconImage} />
                  <TextInput
                    ref="textInputRePass"
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    secureTextEntry={true}
                    onSubmitEditing={(event) => {
                      // this.clickSend()
                    }}
                    returnKeyType="done"
                    placeholder={'Xác nhận mật khẩu*'}
                    placeholderTextColor={color.textHint}
                    value={this.state.rePass}
                    onChangeText={(rePass) => this.setState({ rePass })}
                  />
                </View>
                <TouchableOpacity onPress={this.clickSend} style={styles.buttonLogin}>
                  <Text style={styles.textLogin}>{'ĐĂNG KÝ'}</Text>
                </TouchableOpacity>
              </View>
              <Text onPress={this.onClickDk} style={{ alignSelf: 'center', color: color.primaryColor, fontSize: 15, marginTop: 10, marginBottom: 30 }}>Điều khoản và điều kiện</Text>
            </View>
          </KeyboardAvoidingView>


        </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  imgAvatar: {
    borderRadius: (values.deviceWidth / 3) / 2,
    overflow: 'hidden',
    height: values.deviceWidth / 3, backgroundColor: 'pink',
    width: values.deviceWidth / 3, overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: color.colorLine,
    backgroundColor: '#eedce3'

  },
  viewTextInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.colorLine,
    marginBottom: 10,
  },
  iconImage: { width: 16, height: 16, resizeMode: 'contain', tintColor: color.primaryColor },
  iconImageDropDown: {
    width: 24,
    height: 24,
    resizeMode: 'contain', tintColor: color.primaryColor
  },
  contain: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  parentLogo: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 24,
    // position:'absolute'
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45, width: '100%',
    backgroundColor: color.primaryColor,
    marginTop: 30,
    borderRadius: 45 / 2,
  },
  textLogin: { textAlign: 'center', fontSize: values.fontSizeNormal, color: 'white' },
  buttonLoginFB: {
    justifyContent: 'center', alignItems: 'center', height: 45, width: '100%',
    backgroundColor: 'blue',
  },
  textLoginFB: { textAlign: 'center', fontSize: values.fontSizeNormal, color: 'white' },
  parentTextBottom: { width: '100%', height: 40, paddingHorizontal: 10, position: 'absolute', bottom: 10, left: 0, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'red' },
  textBottom: { backgroundColor: 'transparent', textDecorationLine: 'underline', color: 'black' },
  logo: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    tintColor: 'white'
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    height: '100%',
    backgroundColor: 'transparent',
    fontSize: 16,
  },
})