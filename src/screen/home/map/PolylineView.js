//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { toJS } from "mobx"
import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';
import { values, color, getTimeBetweenTwoDatetimes, } from '../../../config';
import _ from 'lodash'

import { inject, observer } from 'mobx-react/native'
import screenId from '../../../config/screenId';
@inject('Home')
@observer
class PolylineView extends Component {
    render() {
        let { Home } = this.props;
        return (

            Home.listCoords && _.size(Home.listCoords) > 0
                ?
                <Polyline
                    // key={item.beginX + '-' + item.beginY + (new Date())}
                    // coordinates={toJS(this.props.Monitor.coordsPolyline)}
                    coordinates={toJS(Home.listCoords)}
                    fillColor={'#E23553'}//ios
                    strokeColor={'#E23553'}//android
                    strokeWidth={3}
                    lineCap="round"
                    lineJoin="round"
                />
                :
                null
        )
    }
}

export default PolylineView;
