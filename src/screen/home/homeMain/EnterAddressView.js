import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { values } from '../../../config';

export default class EnterAddressView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                width: '100%', position: 'absolute', bottom: 20, paddingHorizontal: 15,
            }}>
                <TouchableOpacity onPress={this.props.clickEnterAddress} style={[{
                    width: '100%', borderRadius: 4, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                }, styles.shadow]}>
                    <Image style={{
                        width: 20, height: 20, marginHorizontal: 15,
                        resizeMode: 'contain'
                    }} source={require('../../../assets/images/ic_location.png')} />
                    <View style={{ flex: 1, height: 40, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                        <Text style={{ width: '100%', color: '#ccc', fontSize: 14, backgroundColor: 'transparent' }}>Bạn chuyển hàng tới đâu?</Text>
                    </View>
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
