import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { values, color } from '../../../config';
import { checkPhone } from '../../../utils/Func';
import SimpleToast from 'react-native-simple-toast';

class WarningCancel extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white',
    screenBackgroundColor: '#00000070',
    navBarButtonColor: color.primaryColor,
    navBarTitleTextCentered: true,
    navBarTextColor: '#FFFFFF',
    topBarElevationShadowEnabled: false,
  };
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
  hiddenView = () => {
    Linking.openURL(`${Platform.OS === 'ios' ? 'telprompt:' : 'tel:'}${'01296100196'}`)

  }


  confirmPhone = () => {
    //validate so dien thoai
    // alert(checkPhone(this.state.phone))
    if (this.props.type === 'confirm') {
      this.props.navigator.dismissLightBox({
        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
    } else {
      this.props.navigator.dismissLightBox({
        animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
      });
      this.props.navigator.popToRoot({
        animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
      });
    }


  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1}
        style={{
          flex: 1, width: values.deviceWidth, paddingHorizontal: 20, backgroundColor: 'transparent',
          justifyContent: 'center', alignItems: 'center',
        }}>
        <View style={{ width: '100%', backgroundColor: '#E7E7E7', borderRadius: 12, }}>
          <Text style={{
            width: '100%', color: '#030303', fontSize: 16, fontWeight: 'normal',
            textAlign: 'center', paddingTop: 20, paddingBottom: 10, paddingHorizontal: 20,
          }}>{'Bổ sung giấy tờ thủ tục'}</Text>
          <Text style={{
            width: '100%', color: 'rgba(0, 0, 0, 0.45)', fontSize: 13,
            fontWeight: 'normal', textAlign: 'center', paddingHorizontal: 15,
            marginBottom: 10
          }}>{'Mời bạn đến toà nhà Lorem Ipsum, số 12 đường Lê Thanh Nghị, phường Bách Khoa, quận Hai Bà Trưng, Hà Nội để hoàn tất thủ tục. Hoặc bấm Hotline bên dưới để được tư vấn.'}</Text>

          <View style={{ width: '100%', flexDirection: 'row', backgroundColor: 'transparent', borderTopColor: color.borderColor_gray, borderTopWidth: 0.5 }}>
            <TouchableOpacity onPress={this.hiddenView} activeOpacity={0.7} style={{ flex: 1, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', borderRightColor: color.borderColor_gray, borderRightWidth: 0.5, }}>
              <Text style={{ fontSize: 17, fontWeight: 'normal', textAlign: 'center', color: color.primaryColor }}>{'Hotline'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.confirmPhone} activeOpacity={0.7} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ fontSize: 17, fontWeight: 'normal', textAlign: 'center', color: color.primaryColor }}>{'OK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity >
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
  textInput: {
    backgroundColor: 'white', height: 35, paddingHorizontal: 5, borderRadius: 5,
    borderColor: color.borderColor_gray, borderWidth: 0.5
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default WarningCancel