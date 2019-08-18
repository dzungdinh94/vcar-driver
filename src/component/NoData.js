//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { values } from '../config'
// create a component
class NoData extends Component {
    render() {
        let {
            tintColor,
            imageSource,
            title

        } = this.props;
        return (
            <View style={{
                width: '100%', alignItems: 'center',
                marginVertical: 50,
                justifyContent: 'center', backgroundColor: 'transparent', alignSelf: 'center'
            }}>
                <Image
                    style={{ width: 80, resizeMode: 'contain', tintColor: tintColor }}
                    source={imageSource}
                />
                <Text style={{ fontSize: 20, color: 'black', backgroundColor: 'transparent', paddingVertical: 15, textAlign: 'center' }}>{'Thông báo'}</Text>
                <Text style={{
                    fontSize: values.fontSizeNormal, color: 'black', paddingHorizontal: 10,
                    backgroundColor: 'transparent', textAlign: 'center'
                }}>{title}</Text>
            </View>
        );
    }
}


//make this component available to the app
export default NoData;
