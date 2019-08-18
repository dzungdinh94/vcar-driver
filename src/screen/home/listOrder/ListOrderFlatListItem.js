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
import { values, screenType, color } from '../../../config';
import Dash from 'react-native-dash';
import numeral from 'numeral'
class ListOrderFlatListItem extends React.PureComponent {

    constructor(props) {
        super(props);

    };

    onClickConfirm = (item) => {

        this.props.onClickConfirm(item)

    };

    render() {
        const { item, index } = this.props;

        console.log("item sssssssssssssssssss",JSON.stringify(item))
        return (
            <View style={[{ width: '100%', paddingHorizontal: 15, }, index == 0 && { paddingTop: 15, }]}>
                <TouchableOpacity onPress={() => this.onClickConfirm(item)} style={[styles.viewContainer, styles.shadowPhone, values.platform == 'android' && { overflow: 'hidden', }]}>
                    <View style={[styles.viewFather, values.platform == 'ios' && { borderRadius: 12, overflow: 'hidden' }]}>
                        <View style={{ flex: 1, paddingLeft: 20, paddingRight: 17, justifyContent: 'center' }}>
                            <Text style={{ fontStyle: 'italic', marginVertical: 10, fontSize: 12, color: color.LIST_ORDER.txt_time, fontWeight: '400' }}>{item.time}</Text>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: color.colorLine, borderWidth: 1 }} />
                                <Text numberOfLines={1} style={styles.txtAddress}>{item.fromLocation}</Text>
                            </View>
                            <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 15, width: '100%' }}>
                                <View style={{ width: 10, backgroundColor: 'transparent', alignItems: 'center', height: '100%', justifyContent: 'space-around' }} >
                                    <Dash
                                        dashThickness={2}//do day cua moi net dut
                                        dashColor={'#dce0ee'}
                                        style={{ width: 1, flex: 1, flexDirection: 'column', }} />
                                </View>
                                <View style={{ flex: 1, height: 2, paddingLeft: 15, paddingRight: 10 }} >
                                    <View style={{ backgroundColor: color.colorLine, height: 1, }} />
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: color.colorLine, borderWidth: 1 }} />
                                <Text numberOfLines={1} style={styles.txtAddress}>{item.toLocation}</Text>
                            </View>
                            {
                                item.description ?
                                    <View style={styles.viewContentElement}>
                                        <Image resizeMode='contain' style={styles.image} source={require('../../../assets/images/ic_note.png')} />
                                        <Text numberOfLines={2} style={styles.txtAddress}>{item.description}</Text>
                                    </View>
                                    :
                                    null
                            }

                            {
                                item.serviceAttach.length
                                    ?
                                    <View style={styles.viewContentElement}>
                                        <Image resizeMode='contain' style={styles.image} source={require('../../../assets/images/library-add.png')} />

                                        {
                                            item.serviceAttach.map((v, k) => {
                                                return (
                                                    <Text key={k} numberOfLines={2} style={styles.txtAddress}>{v.name}</Text>
                                                )
                                            })

                                        }

                                    </View>
                                    :
                                    null
                            }

                        </View>
                        <View style={styles.btnConfirm}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 13 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>{numeral(item.total).format('0,0')}</Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', justifyContent: 'flex-end' }}>đ</Text>
                            </View>

                            <Image resizeMode='contain' style={[styles.image, {
                                tintColor: 'white',
                            }]} source={require('../../../assets/images/ic_arrow_right.png')} />
                        </View>
                    </View>

                </TouchableOpacity >

            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewContentElement: { marginTop: 10, width: '100%', flexDirection: 'row', alignItems: 'center', },
    viewContainer: {
        marginBottom: 15, flex: 1, width: '100%', justifyContent: 'center',
        borderRadius: 10, alignSelf: 'center', backgroundColor: 'transparent', borderBottomColor: '#dedede'
    },
    viewFather: { width: '100%', justifyContent: 'flex-end', backgroundColor: 'white', },
    shadowPhone:
        values.platform == 'ios' ? {
            shadowColor: color.colorGrey,
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.65,
            shadowRadius: 7,
        }
            :
            { elevation: 5 },
    btnConfirm: { marginTop: 10, width: '100%', flexDirection: 'row', paddingLeft: 19, paddingRight: 17, justifyContent: 'space-between', alignItems: 'center', backgroundColor: color.primaryColor },
    txtAddress: { fontSize: 14, color: color.LIST_ORDER.textAddress, fontWeight: 'normal', flex: 1, paddingLeft: 10, textAlign: 'left', },
    container: {
        flex: 1,
        width: '100%',

        backgroundColor: 'white',
    },
    image: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        tintColor: '#b4bcc8'
    }
});

export default ListOrderFlatListItem;