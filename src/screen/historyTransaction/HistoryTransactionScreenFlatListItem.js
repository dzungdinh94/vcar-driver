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
import { toJS } from 'mobx'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import { values, color } from '../../config';
import Dash from 'react-native-dash';
import numeral from 'numeral'
let widthCircle = 10;

@inject('User')
@observer
class HistoryTransactionScreenFlatListItem extends React.Component {

    constructor(props) {
        super(props);
        this.onItemPressed = this.onItemPressed.bind(this);
    };

    onItemPressed(e) {
        //Pressed json item
        const pressedItem = this.props.item;
        //Do something with that item
        // Alert.alert(pressedItem.title);
        this.props.onClickTransaction(pressedItem)
    };

    render() {
        let { item, index, length, User } = this.props;
        // console.log('{ item, index, length } : ' + JSON.stringify({ item }))
        return (
            <TouchableOpacity onPress={this.onItemPressed} activeOpacity={1}
                style={[styles.viewParent, values.platform === 'android' && { marginBottom: 10 }]}>
                <View style={{
                    width: 30, height: '100%', backgroundColor: 'transparent',
                    alignItems: 'center',
                }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, borderWidth: 2, borderColor: '#c0392b', marginVertical: 5, }} />
                    {
                        index != length - 1
                            ?
                            // < Dash
                            //     dashThickness={1.5}//do day cua moi net dut
                            //     dashColor={'#dce0ee'}
                            //     style={{ marginRight: 1.5, width: 0.5, flex: 1, flexDirection: 'column', }} />
                            <View style={{
                                height: '100%', width: 1.5, borderColor: '#dce0ee', borderWidth: 0.75, borderRadius: 5,
                                borderStyle: 'dotted'
                            }} />
                            :
                            null
                    }
                </View>
                <View style={[{
                    flex: 1, paddingHorizontal: 10, backgroundColor: 'white', elevation: 3,
                    borderRadius: 12, marginBottom: 15, paddingBottom: 7
                }, , styles.shadow]}>
                    <View style={{
                        flexDirection: 'row', paddingTop: 15, paddingBottom: 10,
                        // borderBottomColor: color.lineColor, borderBottomWidth: 0.5, backgroundColor: 'transparent',
                    }}>
                        <Text style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', fontStyle: 'italic', fontWeight: 'normal' }}>{moment(item.timeStart).format('HH:mm, DD/MM/YYYY')}</Text>
                        <Text style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', fontStyle: 'italic', fontWeight: 'normal' }}>{" - "}</Text>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>{numeral(item.price).format('0,0')}đ</Text>
                    </View>
                    <View style={[{
                        flexDirection: 'row', width: '100%',
                        backgroundColor: 'transparent', height: 60,
                    },]}>
                        <View style={{
                            backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-end',
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center', alignItems: 'center', paddingVertical: 10,
                            }}>
                                <View style={{
                                    width: widthCircle, height: widthCircle,
                                    borderRadius: widthCircle / 2, borderWidth: 1.5, borderColor: '#BFC6D0'
                                }} />
                                <Dash
                                    dashThickness={1.5}//do day cua moi net dut
                                    dashColor={'#BFC6D0'}
                                    style={{ marginRight: 1.5, width: 0.5, flex: 1, marginVertical: 3, flexDirection: 'column', }} />
                                <View style={{
                                    width: widthCircle, height: widthCircle, borderRadius: widthCircle / 2,
                                    borderWidth: 1.5, borderColor: '#BFC6D0',
                                }} />
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'transparent', paddingLeft: 10, }}>
                            <View style={{
                                backgroundColor: 'transparent', justifyContent: 'center', width: '100%',
                                borderBottomColor: color.lineColor, borderBottomWidth: 0.5, height: 30,
                            }}>
                                <Text numberOfLines={1} style={{ color: 'black', fontSize: 13, }}>{item.fromLocation}</Text>
                            </View>
                            <View style={{
                                backgroundColor: 'transparent', justifyContent: 'center', width: '100%', height: 30,
                            }}>
                                <Text numberOfLines={1} style={{ color: 'black', fontSize: 13, }}>{item.toLocation}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', paddingVertical: 7, alignItems: 'center' }}>
                        <Image style={{ width: 15, height: 15, marginRight: 5, tintColor: '#b4bcc8' }}
                            source={require('../../assets/images/receipt.png')} />
                        <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 'normal', marginRight: 10, }}>{item.carType}</Text>
                        <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)', fontWeight: 'normal' }}>{User.userInfo.numberCar}</Text>
                    </View>
                    {
                        item.description
                            ?
                            <View style={{ flexDirection: 'row', paddingVertical: 7, justifyContent: 'center' }}>
                                <Image style={{ width: 15, height: 15, marginRight: 5, tintColor: '#b4bcc8' }}
                                    source={require('../../assets/images/description.png')} />
                                <Text numberOfLines={4} style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 'normal', marginRight: 10, flex: 1, }}>{item.description ? item.description : 'Bạn không có yêu cầu nào!'}</Text>
                            </View>
                            :
                            null
                    }


                    {
                        item.serviceAttach.length > 0
                            ?
                            <View style={{ flexDirection: 'row', paddingVertical: 7, alignItems: 'center' }}>
                                <Image style={{ width: 15, height: 15, marginRight: 5, tintColor: '#b4bcc8' }}
                                    source={require('../../assets/images/library-add.png')} />
                                {item.serviceAttach.map((v, k) => {
                                    return (
                                        <Text key={k} style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.85)', fontWeight: 'normal', marginRight: 10, }}>
                                            {v.name}
                                        </Text>
                                    )

                                })}

                            </View>
                            :
                            null
                    }


                </View>


            </TouchableOpacity >
        )
    }
}


const styles = StyleSheet.create({
    viewParent: { flex: 1, marginTop: 10, paddingHorizontal: 10, backgroundColor: 'white', flexDirection: 'row' },
    txtAddress: { fontSize: 14, color: 'black', flex: 1, paddingLeft: 10, textAlign: 'left', },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#dedede',
    },
    image: {
        height: 15,
        width: 15
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
export default HistoryTransactionScreenFlatListItem;