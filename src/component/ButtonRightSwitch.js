import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch
} from 'react-native';
import { observer, inject } from 'mobx-react'

@inject('Home')
@observer
class ButtonRightSwitch extends Component {
    rncc
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.Home.statusApp === 0 &&
                    <Switch
                        onTintColor='green'
                        tintColor='grey'
                        value={this.props.Home.isStatusDriver}
                        onValueChange={(status) => { this.props.Home.setStatus(status) }}
                    />
                }

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});
export default ButtonRightSwitch