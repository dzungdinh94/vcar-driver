import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';
import { inject, observer } from 'mobx-react/native'
import MarkerMeView from './MarkerMeView';
import PolylineView from './PolylineView';
import { config, mapStyle } from '../../../config';
import MarkerDirectView from './MarkerDirectView';
import MarkerStartAdressView from './MarkerStartAdressView';
import MarkerEndAdressView from './MarkerEndAdressView';

@inject('Home')
@observer
class MapViewScreen extends Component {

    render() {
        let { Home } = this.props;
        return (
            <MapView.Animated
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={Home.myPosition}
                customMapStyle={mapStyle}
                loadingEnabled
                ref={(ref) => this.mapRef = ref}
            >
                <MarkerStartAdressView />
                <MarkerEndAdressView />
                <MarkerMeView />
                <MarkerDirectView />
                <PolylineView />
            </MapView.Animated >
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

export default MapViewScreen