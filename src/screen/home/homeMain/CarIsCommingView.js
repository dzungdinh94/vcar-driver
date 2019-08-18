import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, } from 'react-native';
import { values, color } from '../../../config';
import RenderStart from '../../../component/RenderStart';

export default class CarIsCommingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowView: true,
            infoDriver: {
                time: '10 phút',
                des: 'Bạn vui lòng chờ giây lát, xe đang tới gần',
                id_cad: '29M1 - 20120',
                avatar: 'https://znews-photo-td.zadn.vn/w660/Uploaded/izhqv/2016_07_20/99.jpg',
                fullname: 'Trần Minh Tuấn',
                vote: 4,
                phone: '01296100196'
            },
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

    componentDidMount() {

    }

    render() {
        // const heightView = this.state.heightView.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [this.state.heightViewChild, this.state.heightViewParent],
        // })
        return (
            <TouchableOpacity onPress={this.changeView}
                onLayout={(event) => {
                    this.setState({ heightViewParent: event.nativeEvent.layout.height })
                }}
                style={{
                    width: '100%', position: 'absolute', bottom: 0, backgroundColor: '#ccc',
                }}>
                {
                    this.state.isShowView
                        ?
                        <View>
                            <Text style={{
                                fontSize: 15, fontWeight: 'bold', width: '100%', color: 'red',
                                paddingHorizontal: 10, paddingTop: 10, textAlign: 'center'
                            }}>{this.state.infoDriver.time}</Text>
                            <Text style={{
                                fontSize: 13, width: '100%', color: 'black',
                                paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center'
                            }}>{this.state.infoDriver.des}</Text>
                            <Text style={{
                                fontSize: 14, width: '100%', color: 'black',
                                paddingHorizontal: 10, textAlign: 'center', fontWeight: 'bold'
                            }}>{this.state.infoDriver.id_cad}</Text>
                        </View>
                        :
                        null
                }

                <View
                    onLayout={(event) => {
                        this.setState({ heightViewChild: event.nativeEvent.layout.height })
                    }}
                    style={{ width: '100%', flexDirection: 'row', backgroundColor: 'transparent', marginBottom: 10, marginTop: 10, }}>
                    <View style={{ borderRadius: 25, overflow: 'hidden', marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ width: 50, height: 50, resizeMode: 'cover' }} source={require('../../../assets/images/avatar_default.jpg')} />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', }}>
                        <Text style={{
                            fontSize: 15, fontWeight: 'bold', width: '100%', color: 'black',
                        }}>{this.state.infoDriver.fullname}</Text>
                        <RenderStart numberOfStar={this.state.infoDriver.vote} />
                        {/* <View style={{ height: 30, width: 100, backgroundColor: 'pink' }} /> */}
                    </View>
                    <TouchableOpacity onPress={this.clickCall} style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ width: 35, height: 35, resizeMode: 'cover' }} source={require('../../../assets/images/ic_hotline.png')} />
                    </TouchableOpacity>
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
