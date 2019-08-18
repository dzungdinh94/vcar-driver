//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { inject, observer } from 'mobx-react/native'
import { toJS } from "mobx"
import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import { values, color, getTimeBetweenTwoDatetimes, } from '../../../config';
import _ from 'lodash'
import screenId from '../../../config/screenId';

@inject('Home')
@observer
class MarkerMeView extends Component {

    render() {
        let { Home } = this.props;
        console.log("Mackerrrrrr",Home.markerMe)
        return (
            Home.markerMe && _.size(Home.markerMe) > 0 && Home.markerMe.latitude &&Home.markerMe.longitude
                ?
                <Marker
                    // onPress={}
                    coordinate={toJS(Home.markerMe)}
                    ref={(ref) => { this.mapRef = ref }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    image={require('../../../assets/images/ic_markerMe.png')}
                />
                :
                null
        );
    }
}

export default MarkerMeView;
