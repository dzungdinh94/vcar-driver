import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, } from 'react-native'
import { values, color } from '../config';

export default class NavBarCustom extends Component {
    render() {
        let { onPress, title, leftButton } = this.props;
        return (
            <View style={[{
                height: values.toolbarHeight, width: '100%',
                justifyContent: 'flex-end', alignItems: 'center', backgroundColor: color.primaryColor,
            }
            ]
            }>
                <View style={[{ width: '100%', flexDirection: 'row', alignItems: 'center', },
                values.platform === 'android' ? { height: values.toolbarHeight } : { height: 44, }
                ]}>
                    <TouchableOpacity activeOpacity={1} onPress={onPress}
                        style={{
                            height: 44, width: 44, paddingLeft: 10, backgroundColor: 'transparent',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                        <Image source={
                            leftButton
                                ?
                                leftButton
                                :
                                require('../assets/images/ic_menu.png')} style={{ width: 24, resizeMode: 'contain', tintColor: '#ffffff' }} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ flex: 1, textAlign: 'center', fontSize: 16, color: '#ffffff' }}>{title}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={this.onToggleDrawer} style={{ height: 44, width: 44, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Image source={require('../assets/images/ic_menu.png')} style={{ width: 24, resizeMode: 'contain', tintColor: color.primaryColor }} /> */}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}