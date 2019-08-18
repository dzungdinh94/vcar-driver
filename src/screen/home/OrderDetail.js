//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { color, values } from '../../config';
import { phonecall } from '../../utils/Communication'
import { Navigation } from 'react-native-navigation';

// create a component
class OrderDetail extends Component {

    
    onDismiss = () => {
        Navigation.dismissOverlay(this.props.componentId);
    }
    onClickCall = (phone) => () => {
        phonecall(phone, true)
    }
    render() {
        let { dataUser, dataOrder } = this.props
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.onDismiss} style={styles.container}>
                <View style={{
                    width: '100%', backgroundColor: 'transparent', borderRadius: 7,
                    overflow: 'hidden'
                }}>
                    <View
                        style={{
                            height: 50,
                            width: '100%',
                            backgroundColor: color.primaryColor,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>Thông tin chuyến đi</Text>
                    </View>
                    <View style={{ width: '100%', backgroundColor: 'white', paddingRight: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                            <View style={{ paddingLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/receipt.png')} />
                                <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Điểm đi : </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ flex: 1, fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{dataOrder.fromLocation}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                            <View style={{ paddingLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/receipt.png')} />
                                <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Điểm đến : </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ flex: 1, fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{dataOrder.toLocation}</Text>
                            </View>
                        </View>
                        {
                            dataOrder.description ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                                    <View style={{ paddingLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/receipt.png')} />
                                        <Text style={{ flex: 1, marginLeft: 10, fontSize: 15, color: 'black' }}>Mô tả : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={{ flex: 1, fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{dataOrder.description}</Text>
                                    </View>
                                </View>
                                : null
                        }

                        {
                            dataUser.fullname ?
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                                    <View style={{ paddingLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/receipt.png')} />
                                        <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Khách hàng : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{dataUser.fullname}</Text>
                                    </View>
                                </View>
                                : null
                        }

                        {
                            dataUser.phone ?
                                <TouchableOpacity onPress={this.onClickCall(dataUser.phone)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                                    <View style={{ paddingLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/receipt.png')} />
                                        <Text style={{ marginLeft: 10, fontSize: 15, color: 'black' }}>Số điện thoại : </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{dataUser.phone}</Text>
                                    </View>
                                </TouchableOpacity>
                                : null
                        }

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        width: values.deviceWidth,
        height: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#00000045'
    },
});

//make this component available to the app
export default OrderDetail;
