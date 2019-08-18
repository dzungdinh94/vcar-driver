import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import color from '../../config/color'
import { checkPhoneNumber, Toast } from '../../utils/Func';
import NavBarCustomBtnBack from '../../component/NavBarCustomBtnBack'
class EditProfileScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true,
    };
    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values,
            type: this.props.type
        }
    };
    onClickUpdate = () => {
        switch (this.state.type) {
            case 'name':
                // alert('name')
                break;

            case 'phone':
                if (checkPhoneNumber(this.state.values)) {
                    // alert('phone')
                } else {
                    Toast('Không phải số điện thoại')
                }

                break;

        }
    }
    onClickBack = () => {
        this.props.navigator.pop({
            animated: true, // does the pop have transition animation or does it happen immediately (optional)
            animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBarCustomBtnBack
                    onPress={this.onClickBack}
                    title={this.props.title}
                    leftButton={require('../../assets/images/arrow-back.png')}
                    colorBtn={'white'}
                    backgroundColor={color.primaryColor}
                />
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TextInput style={{ width: '100%', height: 50, borderRadius: 7, paddingHorizontal: 5, borderColor: '#dedede', borderWidth: 0.5 }}
                        underlineColorAndroid="transparent"
                        value={this.state.values}
                        onChangeText={(values) => { this.setState({ values }) }}
                    />
                    <TouchableOpacity onPress={this.onClickUpdate} style={{ height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 26, backgroundColor: color.primaryColor, marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'white' }}>Cập nhật</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
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

export default EditProfileScreen