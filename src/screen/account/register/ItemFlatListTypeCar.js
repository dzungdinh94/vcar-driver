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
import { values, color, api } from '../../../config';
import Carousel from 'react-native-snap-carousel';
import numeral from 'numeral'
import { inject, observer } from 'mobx-react'
@inject('Home')
@observer
class ItemFlatListTypeCar extends Component {
    constructor(props) {
        super(props);
        this.onItemPressed = this.onItemPressed.bind(this);
    };

    onItemPressed(e) {
        this.props.clickItem(this.props.item)
    };

    render() {
        let widthImage = values.deviceWidth / 8
        let { Home, item } = this.props;
        return (
            <View
                style={{ width: '100%', paddingHorizontal: 10, }}>
                <TouchableOpacity onPress={this.onItemPressed}
                    activeOpacity={values.activeOpacity}
                    style={[{
                        // width: '100%',
                        marginBottom: 10,
                        paddingVertical: 7,
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
                    }, Home.itemTypeCarSelected && Home.itemTypeCarSelected.id == item.id ? [{
                        borderWidth: 2, borderColor: color.primaryColor,
                    }, styles.shadow] : {
                            borderWidth: 0.5, borderColor: '#dce0ee',
                        },]}>
                    <View style={[{
                        width: widthImage, height: widthImage, borderRadius: widthImage / 2,
                        overflow: 'hidden', justifyContent: 'center', alignItems: 'center',
                    }, Home.itemTypeCarSelected && Home.itemTypeCarSelected.id == item.id ? { backgroundColor: color.primaryColor } : { backgroundColor: '#dce0ee' }]}>
                        <Image style={[{ width: widthImage * 2 / 3, height: 30, resizeMode: 'contain', }]}
                            source={

                                { uri: api.domain+'/'+item.img3x }
                                // require('../../../assets/images/xe-ba-gac.png')
                            }
                        />
                    </View>

                    <View style={{ flex: 1, backgroundColor: 'transparent', paddingLeft: 15, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', marginVertical: 5, }}>{(item.name + '').toUpperCase()}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: color.primaryColor, }}>{numeral(item.price).format('0,0')}</Text>
                                <Text style={{ fontSize: 11, fontWeight: 'bold', color: color.primaryColor, bottom: 2, }}>{'đ'}</Text> */}
                            </View>
                        </View>
                        {/* <Text style={{ fontSize: 11, color: 'rgba(0, 0, 0, 0.45)', fontWeight: 'normal', fontStyle: 'italic' }}>{item.time}</Text> */}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    shadow:
        values.platform == 'ios' ? {
            shadowColor: color.primaryColor,
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.6,
            shadowRadius: 5,
        }
            :
            { elevation: 2, marginBottom: 3, },

});
export default ItemFlatListTypeCar