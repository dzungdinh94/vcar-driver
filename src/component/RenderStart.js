//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
class RenderStart extends Component {
    render() {
        return (
            <View style={[{
                flexDirection: 'row', width: '100%',
                // justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
            }, this.props.styleParent]}>
                <Image style={[styles.img_star, this.props.styleImgStart,{tintColor:'#ffffff'}]}
                    source={this.props.numberOfStar >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-border.png')} />
                <Image style={[styles.img_star, this.props.styleImgStart,{tintColor:'#ffffff'}]}
                    source={this.props.numberOfStar >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-border.png')} />
                <Image style={[styles.img_star, this.props.styleImgStart,{tintColor:'#ffffff'}]}
                    source={this.props.numberOfStar >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-border.png')} />
                <Image style={[styles.img_star, this.props.styleImgStart,{tintColor:'#ffffff'}]}
                    source={this.props.numberOfStar >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-border.png')} />
                <Image style={[styles.img_star, this.props.styleImgStart,{tintColor:'#ffffff'}]}
                    source={this.props.numberOfStar >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-border.png')} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    img_star: {
        width: 15,
        height: 15,
        marginRight: 5,
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default RenderStart;
