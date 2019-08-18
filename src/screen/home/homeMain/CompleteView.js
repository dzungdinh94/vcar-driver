import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, } from 'react-native';
import { values, color } from '../../../config';
import RenderStart from '../../../component/RenderStart';
import RenderStartVote from '../../../component/RenderStartVote';
import SimpleToast from '../../../../node_modules/react-native-simple-toast';

export default class CompleteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowView: false,
      infoDriver: {
        time: '10 phút',
        des: 'Bạn vui lòng chờ giây lát, xe đang tới gần',
        id_cad: '29M1 - 20120',
        avatar: 'https://znews-photo-td.zadn.vn/w660/Uploaded/izhqv/2016_07_20/99.jpg',
        fullname: 'Trần Minh Tuấn',
        vote: 4,
        phone: '01296100196'
      },
      star: 0,
      heightViewParent: 50,
      heightViewChild: 50,
      heightView: new Animated.Value(50),
    };
  }

  clickCall = () => {

  };

  changeView = () => {
    this.setState({
      isShowView: !this.state.isShowView
    })
    // const move = Animated.timing(
    //     this.state.heightView,
    //     {
    //         toValue: 1,
    //         duration: 1000
    //     })
  }

  hiddenView = () => {
    this.props.hiddenView()
  }

  render() {
    // const heightView = this.state.heightView.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [this.state.heightViewChild, this.state.heightViewParent],
    // })
    return (
      <TouchableOpacity onPress={this.hiddenView} style={{ flex: 1, width: '100%', paddingHorizontal: 20, backgroundColor: '#00000070', justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ width: '100%', backgroundColor: 'white', borderRadius: values.borderRadiusButtonLogin, paddingBottom: 30, }}>
          <Text style={{ width: '100%', color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10, paddingHorizontal: 10, }}>CẢM ƠN!</Text>
          <Text style={{ width: '100%', color: 'black', fontSize: 14, textAlign: 'center', paddingHorizontal: 10, paddingBottom: 20, }}>Cảm ơn bạn đã sử dụng dịch vụ của chúng  tôi!</Text>
          <RenderStartVote
            voteStar={(star) => { this.setState({ star: star }) }}
          />
        </View>
      </TouchableOpacity>
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
