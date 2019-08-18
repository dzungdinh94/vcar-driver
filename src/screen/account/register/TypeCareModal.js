import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { values, screenId, color } from '../../../config';
import { Toast } from '../../../utils/Func';
import { observer, inject } from 'mobx-react'
import ItemFlatListTypeCar from './ItemFlatListTypeCar'
import ViewShadow from '../../../component/ViewShadow'
import { toJS } from 'mobx';
import { Navigation } from 'react-native-navigation';
@inject('User', 'Home')
@observer
class TypeCareModal extends Component {
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
      data: [{
        'id': 1,
        'title': 'Xe thương binh',
        'icon': require('../../../assets/images/xe-ba-gac.png'),
        price: '90000',
        time: '10 phút'
      },
      {
        'id': 2,
        'title': 'Xe tải',
        'icon': require('../../../assets/images/xe-tai.png'),
        price: '140000',
        time: '11 phút'
      },
      {
        'id': 3,
        'title': 'Xe bán tải',
        'icon': require('../../../assets/images/xe-ban-tai.png'),
        price: '120000',
        time: '9 phút'
      }]
    };
  };
  onDismiss = () => {
    
    Navigation.dismissOverlay(this.props.componentId);
    
  }
  clickItem = (item) => {
    // alert('ss')
    // this.props.User.setTypeCareTemple(item)
    this.props.Home.itemTypeCarSelected = item;
    Navigation.dismissOverlay(this.props.componentId);
  }
  renderItem = ({ item, index }) => {
    return (
      // <TouchableOpacity onPress={(item) => this.clickItem(item)}
      //   style={[{ width: '100%', paddingHorizontal: 10, flexDirection: 'row', borderRadius: 5, height: 50, marginBottom: 10, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' },
      //   this.props.User.typeCareTemple.id === item.id ? { borderColor: 'red' } : { borderColor: color.colorLine }
      //   ]}>
      //   <Image style={{ height: 30, width: 30, resizeMode: 'contain' }} source={item.image} />
      //   <Text style={{ flex: 1, paddingLeft: 10, color: 'black', fontSize: 17, textAlign: 'left' }}>{item.name}</Text>
      // </TouchableOpacity>
      <ItemFlatListTypeCar item={item} index={index} clickItem={this.clickItem} onDismiss={this.onDismiss} />
    )
  }
  render() {
    let { Home } = this.props
    // console.log("sssssssssssssssssssssss")
    // console.log(JSON.stringify(Home.listCarAvailable))
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={this.closeModal}
        style={styles.container}>
        <View style={{ backgroundColor: 'white', width: '100%', borderRadius: 10, overflow: 'hidden', }}>
          <Text style={{ fontSize: 17, paddingVertical: 20, alignSelf: 'center', color: 'black' }}>Chọn loại xe</Text>
          <FlatList
            style={{ width: '100%', paddingHorizontal: 10 }}
            data={toJS(Home.listCarAvailable)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
        <View style={{ width: '100%', marginTop: 10 }}>
          <ViewShadow
            onPress={this.onDismiss}
            backgroundColor={'white'}
            shadowColor={'#ccc'}
            colorText={color.textHint}
            textTitle={'HỦY BỎ'}
          />
        </View>
        {/* <TouchableOpacity
          onPress={this.onDismiss}
          style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 40, width: '100%', borderRadius: 20, overflow: 'hidden', }}>
          <Text style={{ fontSize: 17, paddingVertical: 20, alignSelf: 'center', color: color.colorGrey }}>HỦY BỎ</Text>
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: values.deviceWidth,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 20,
  }
});
export default TypeCareModal