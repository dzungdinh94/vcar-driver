import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import NavBarCustom from '../../component/NavBarCustom';

class HistoryTransactionDetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavBarCustom
          leftButton={require('../../assets/images/ic_arrow_left.png')}
          onPress={() => { this.props.navigator.pop() }}
          title={this.props.id}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
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

export default HistoryTransactionDetailScreen