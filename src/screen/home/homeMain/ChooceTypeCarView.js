import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { values, color } from '../../../config';
import Carousel from 'react-native-snap-carousel';

class ChooceTypeCarViewFlatListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onItemPressed = this.onItemPressed.bind(this);
  };

  onItemPressed(e) {
    //Pressed json item
    const pressedItem = this.props.item;
    //Do something with that item
    // Alert.alert(pressedItem.title);
  };

  render() {
    const item = this.props.item;
    return (
      <TouchableOpacity onPress={this.onItemPressed}
        style={{
          width: (values.deviceWidth - 40) / 3, marginLeft: 10,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={{ uri: item.thumbnailUrl }} />
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black', marginVertical: 5, }}>{item.title}</Text>
          <Text style={{ fontSize: 11, color: 'grey', marginBottom: 3, }}>{item.price}</Text>
          <Text style={{ fontSize: 11, color: 'grey' }}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

class ChooceTypeCarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        'id': 1,
        'title': 'Xe ba gác',
        'thumbnailUrl': 'http://placehold.it/150/92c952',
        price: '90.000 đồng',
        time: '10 phút'
      },
      {
        'id': 2,
        'title': 'Xe tải',
        'thumbnailUrl': 'http://placehold.it/150/771796',
        price: '140.000 đồng',
        time: '11 phút'
      },
      {
        'id': 3,
        'title': 'Xe bán tải',
        'thumbnailUrl': 'http://placehold.it/150/24f355',
        price: '120.000 đồng',
        time: '9 phút'
      }]
    };

    this.renderItem = this.renderItem.bind(this);
  };

  renderItem({ item }) {
    return (
      <ChooceTypeCarViewFlatListItem item={item} />
    );
  }

  findCar = () => {
    this.props.findCar()
  }

  render() {

    return (
      <View style={{
        width: '100%', position: 'absolute', bottom: 0, backgroundColor: '#ccc',
      }}>
        <Text style={{
          fontSize: 15, fontWeight: 'bold', width: '100%',
          paddingHorizontal: 10, paddingBottom: 10, textAlign: 'center'
        }}>Loại xe</Text>

        <FlatList
          style={{ flex: 1, width: '100%', backgroundColor: 'transparent', }}
          data={this.state.data}
          // numColumns={3}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
        {/* <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.data}
          renderItem={this.renderItem}
          sliderWidth={values.deviceWidth}
          itemWidth={values.deviceWidth/3}
        /> */}
        <TouchableOpacity
          onPress={this.findCar}
          style={{
            marginTop: 15,
            justifyContent: 'center',
            height: 35,
            // borderRadius: values.borderRadiusButtonLogin,
            alignItems: 'center', backgroundColor: color.primaryColor,
          }}>
          <Text style={{
            fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: "white"
          }}>Đặt xe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  shadow:
    values.platform == 'ios' ? {
      shadowColor: 'gray',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    }
      :
      { elevation: 2, marginBottom: 3, },
});
export default ChooceTypeCarView;