import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { values, color, screenType } from '../../../config';
import { AnimationMap } from '../..';
import * as Animatable from 'react-native-animatable';

import { inject, observer } from 'mobx-react/native'

@inject('User', 'Home')
@observer
export default class FindCarScreen extends Component {
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
        super(props);
        this.state = {
            start: '21 Lê  Đức  Thọ,phường Mĩ Đình,quận Nam Từ Liêm, Từ Liêm, Hà Nội, Việt Nam',
            end: '11 Hoàng  Minh  Giám, Thanh  Xuân',
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    };

    componentWillMount() {

    };

    componentDidMount() {
        setTimeout(() => {
            this.props.Home.screenType = screenType.carIsComming;
            this.goBack();
        }, 4000);
    };

    componentWillUnmount() {

    }

    goBack = () => {
        this.props.navigator.dismissModal();
    }


    onNavigatorEvent(event) {

        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'back') {
                this.goBack()
            }
        }
    };

    cancelBooking = () => {
        this.goBack();
        this.props.Home.screenType = screenType.start;
        // this.props.cancelBooking()
    }

    render() {
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', paddingHorizontal: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                <AnimationMap
                    numberView={4} // số lớp toa toa
                    colors={color.primaryColor}  //màu toa toa 
                    children={
                        <Animatable.Image
                            animation='pulse'
                            iterationCount={'infinite'}
                            style={{ width: 25, resizeMode: 'contain' }}
                            source={require('../../../assets/images/ic_pin.png')}
                        />
                    } //component con nam trong
                    width={values.deviceWidth / 2}  //chieu rong 
                    height={values.deviceWidth / 2}
                    // duration: duration, //len animaton ma doc
                    // delay  //len animaton ma doc
                    // iterations // true or number : số lần lặp,
                    styleCustom={{//bỏ đi thì mất border
                        // borderColor: "#a4a5ca",
                        // borderWidth: 0.5,
                        alignSelf: 'center',
                    }} // styleView border
                />
                <Text style={{ color: 'black', fontSize: 17, paddingVertical: 10, }}>Xe ba gác</Text>
                <View style={{
                    flexDirection: 'row', width: '100%', backgroundColor: 'white',
                    borderRadius: values.borderRadiusButtonLogin, borderWidth: 0.5, borderColor: 'gray',
                }}>
                    <View style={{ width: 50, height: '100%', backgroundColor: 'transparent' }}>

                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <View style={{ backgroundColor: 'transparent', justifyContent: 'center', width: '100%', minHeight: 40, paddingVertical: 7, paddingHorizontal: 5, borderBottomColor: 'gray', borderBottomWidth: 1, }}>
                            <Text numberOfLines={4} style={{ color: 'black', fontSize: 13, }}>{this.state.start}</Text>
                        </View>
                        <View style={{ backgroundColor: 'transparent', justifyContent: 'center', width: '100%', minHeight: 40, paddingVertical: 7, paddingHorizontal: 5, }}>
                            <Text numberOfLines={4} style={{ color: 'black', fontSize: 13, }}>{this.state.end}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.cancelBooking}
                    style={{
                        marginTop: 15, position: 'absolute',
                        bottom: 10,
                        width: '100%',
                        justifyContent: 'center',
                        height: 40, borderRadius: values.borderRadiusButtonLogin,
                        alignItems: 'center', backgroundColor: '#cf2a27',
                    }}>
                    <Text style={{
                        fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: "white"
                    }}>Huỷ chuyến</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
