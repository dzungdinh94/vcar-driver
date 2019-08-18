import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { color, values } from '../config';

export default class ViewShadow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { onPress, backgroundColor, height, shadowColor, colorText, textTitle, styleText } = this.props
        return (
            <TouchableOpacity onPress={onPress} style={[styles.btnLogin, styles.shadowPhone,
            backgroundColor ? { backgroundColor: backgroundColor } : {},
            shadowColor ? { shadowColor: shadowColor } : {},
            height ? { height: height } : {}
            ]}>
                <Text style={[styles.txtLogin, { color: colorText, }, styleText]}>{textTitle}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    txtLogin: { color: 'white', fontSize: 16, fontWeight: '500' },
    btnLogin: {
        width: "100%",
        backgroundColor: color.primaryColor,
        height: 45,
        borderRadius: 22.5, justifyContent: 'center', alignItems: 'center',
    },
    shadowPhone:
        values.platform == 'ios' ? {
            shadowColor: color.primaryColor,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
        }
            :
            { elevation: 7, },
});
