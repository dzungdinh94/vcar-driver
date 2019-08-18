import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native';
import NavBarCustom from '../../component/NavBarCustom';
import { Navigation } from 'react-native-navigation';
class NotificaionDetailScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };
  render() {
    return (
      <View style={styles.container}>
        <NavBarCustom
          leftButton={require('../../assets/images/ic_arrow_left.png')}
          onPress={() => {Navigation.dismissModal(this.props.componentId) }}
          title={this.props.title}
        />
        <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent' }}>
          <WebView
            source={{ uri: this.props.url }}
            style={{ width: '100%', flex: 1, }}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default NotificaionDetailScreen