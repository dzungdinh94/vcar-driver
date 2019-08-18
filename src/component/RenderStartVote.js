//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { values } from '../config';
var numberOfStar = 0;
// create a component

class RenderStartVote extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
        this.clickStar = this.clickStar.bind(this);
    };
    clickStar(index) {
        numberOfStar = index;
        this.props.voteStar(index);
    }
    render() {
        return (
            <Animatable.View
                animation={'fadeIn'}
                duration={1000}
                style={[{
                    flexDirection: 'row', width: '100%', justifyContent: 'center',
                    alignItems: 'center', backgroundColor: 'transparent'
                }, this.props.styleParent]}>

                <TouchableOpacity activeOpacity={values.activeOpacity} onPress={() => this.clickStar(1)} style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}>
                    <Image style={[styles.img_star, this.props.styleImgStart]} source={
                        numberOfStar >= 1
                            ?
                            require('../assets/images/start_icon.png')
                            :
                            require('../assets/images/start_iconGray.png')
                    } />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={values.activeOpacity} onPress={() => this.clickStar(2)} style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}>
                    <Image style={[styles.img_star, this.props.styleImgStart]} source={
                        numberOfStar >= 2
                            ?
                            require('../assets/images/start_icon.png')
                            :
                            require('../assets/images/start_iconGray.png')} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={values.activeOpacity} onPress={() => this.clickStar(3)} style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}>
                    <Image style={[styles.img_star, this.props.styleImgStart]} source={
                        numberOfStar >= 3
                            ?
                            require('../assets/images/start_icon.png')
                            :
                            require('../assets/images/start_iconGray.png')} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={values.activeOpacity} onPress={() => this.clickStar(4)} style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}>
                    <Image style={[styles.img_star, this.props.styleImgStart]} source={
                        numberOfStar >= 4
                            ?
                            require('../assets/images/start_icon.png')
                            :
                            require('../assets/images/start_iconGray.png')} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={values.activeOpacity} onPress={() => this.clickStar(5)} style={{ backgroundColor: 'transparent', marginHorizontal: 5 }}>
                    <Image style={[styles.img_star, this.props.styleImgStart]} source={
                        numberOfStar >= 5
                            ?
                            require('../assets/images/start_icon.png')
                            :
                            require('../assets/images/start_iconGray.png')} />
                </TouchableOpacity>
            </Animatable.View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    img_star: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default RenderStartVote;
