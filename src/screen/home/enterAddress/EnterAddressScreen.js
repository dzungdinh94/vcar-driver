import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { values, color, screenType } from '../../../config';
import SuggestAddressView from './SuggestAddressView';
import EnterRegisterPhoneView from './EnterRegisterPhoneView'

import { inject, observer } from 'mobx-react/native'

@inject('Home', 'User')
@observer
class EnterAddressScreen extends Component {
  static navigatorStyle = {
  };

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        icon: require('../../../assets/images/ic_arrow_left.png'),
      }
    ],
  }
  constructor(props) {
    super(props)

    this.state = {
      start: '',
      end: '',
      note: '',
      phone: '',
      isShowEnterPhone: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  };

  goBack = () => {
    this.props.navigator.dismissModal();
  }

  onChangeText = (type, text) => {
    switch (type) {
      case 'start':
        this.setState({
          start: text
        })
        break;

      case 'end':
        this.setState({
          end: text
        })
        break;

      case 'note':
        this.setState({
          note: text
        })
        break;

      default:
        //phone
        this.setState({
          phone: text
        })
        break;
    }
  }

  onNavigatorEvent(event) {

    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'back') {
        this.goBack()
      }
    }
  };

  clickNext = () => {
    if (!this.props.User.isLogin) {
      this.setState({
        isShowEnterPhone: true
      })
    }
  }

  confirmPhone = () => {
    this.props.Home.screenType = screenType.chooseCar;
    this.goBack();

  }

  render() {
    let { User, Home } = this.props;
    return (
      <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <View style={{ width: 40, backgroundColor: 'transparent' }}>
          </View>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ width: '100%', marginBottom: 5, paddingRight: 15, }}>
              <TextInput
                underlineColorAndroid='transparent'
                style={styles.textInput}
                placeholderTextColor='#BBBDCB'
                value={this.state.start}
                placeholder={'Địa điểm nhận hàng'}
                onChangeText={(text) => this.onChangeText('start', text)}
              />

            </View>

            <View style={{ width: '100%', marginBottom: 5, paddingRight: 15, }}>
              <TextInput
                underlineColorAndroid='transparent'
                style={styles.textInput}
                placeholderTextColor='#BBBDCB'
                value={this.state.end}
                placeholder={'Bạn chuyển hàng tới đâu?'}
                onChangeText={(text) => this.onChangeText('end', text)}
              />
            </View>

            <View style={{ width: '100%', marginBottom: 5, paddingRight: 15, }}>
              <TextInput
                underlineColorAndroid='transparent'
                style={styles.textInput}
                placeholderTextColor='#BBBDCB'
                value={this.state.note}
                placeholder={'Mô tả'}
                onChangeText={(text) => this.onChangeText('note', text)}
              />
            </View>
          </View>
        </View>
        <SuggestAddressView data={this.props.Home.listAddress} />
        <TouchableOpacity
          onPress={this.clickNext}
          style={{
            position: 'absolute', bottom: 15, right: 15, justifyContent: 'center', alignItems: 'center',
            width: 46, height: 46, borderRadius: 23, backgroundColor: color.primaryColor,
          }}>
          <Image style={{ width: 25, height: 25, resizeMode: 'contain' }}
            source={require('../../../assets/images/ic_next.png')}
          />
        </TouchableOpacity>
        {
          this.state.isShowEnterPhone
            ?
            <EnterRegisterPhoneView confirmPhone={this.confirmPhone} />
            :
            null
        }

      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    width: '100%', height: 35, backgroundColor: '#E8EAF6',
    paddingLeft: 5,
  }

});

export default EnterAddressScreen