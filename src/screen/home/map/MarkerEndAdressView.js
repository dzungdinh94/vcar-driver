//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { inject, observer } from 'mobx-react/native'
import { toJS } from "mobx"
import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import { values, color, getTimeBetweenTwoDatetimes, } from '../../../config';
import _ from 'lodash'
import screenId from '../../../config/screenId';

@inject('Order')
@observer
class MarkerEndAdressView extends Component {

    render() {
        let { Order } = this.props;
        let coordinate = {};
        if (Order.orderDetail) {
            coordinate = { latitude: Order.orderDetail.toLat, longitude: Order.orderDetail.toLog }
        }
        return (
            (Order.orderDetail && coordinate != {} && coordinate.latitude &&coordinate.longitude)
                ?
                <Marker
                    // onPress={}
                    coordinate={coordinate}
                    ref={(ref) => { this.mapRef = ref }}
                    anchor={{ x: 0.5, y: 0.5 }}
                    image={require('../../../assets/images//endLocation.png')}
                />
                :
                null
        );
    }
}

export default MarkerEndAdressView;
