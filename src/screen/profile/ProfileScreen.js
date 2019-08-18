import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { color, values, screenType, api } from '../../config'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import RenderStart from '../../component/RenderStart'
import screenId from '../../config/screenId';
import NavBarCustom from '../../component/NavBarCustom'
import { UploadImageAxios, PostWithToken } from '../../config/request';
import { Toast } from '../../utils/Func';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8
};


@inject('User', 'OnApp', 'Home')
@observer
class ProfileScreen extends Component {
    // static navigatorButtons = {
    //     leftButtons: [
    //         {
    //             id: 'drawer',
    //             icon: require('../../assets/images/ic_menu.png'),
    //             // icon: require('../../assets/images/ic_arrow_left.png'),
    //         }
    //     ]
    // }
    static navigatorStyle = {
        navBarHidden: true,
    };
    constructor(props) {
        super(props);
        // Navigation.setStyle({
        //     // navBarHidden:true,
        //     navBarBackgroundColor: color.primaryColor,
        //     topBarElevationShadowEnabled: false,
        //     navBarButtonColor: "white",
        //     statusBarHidden: false,
        //     navBarTextColor: "#FFFFFF",
        //     statusBarTextColorScheme: "light"
        // });
        this.state = {
            avatarSource: this.props.User.userInfo.avatar ? api.domain + "/" + this.props.User.userInfo.avatar : "",
            typeCar: '',
            percent: 0,
        }
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));


    };
    componentWillMount() {
        let { OnApp } = this.props;
        OnApp.screenCurrent = screenId.MENU.screenType.profile;
    }
    componentDidMount() {
        let { Home, User } = this.props
        // Home.listCarAvailable[0].name
        let index = _.findIndex(toJS(Home.listCarAvailable), (o) => { return o.id === User.userInfo.typeCarId })
        if (index >= 0) {
            this.setState({
                typeCar: Home.listCarAvailable[index].name
            })
        }
        // console.log("list",Home.listCarAvailable)
    }

    updateProfile = (avatar) => {
        let { User } = this.props
        let jsonUpdateProfile = {
            avatar
        }

        PostWithToken(api.USER.updateinfo, jsonUpdateProfile, User.access_token, (data, status) => {
            console.log('updateProfile: ' + JSON.stringify(data))
            if (status) {
                if (data.ResponseCode) {

                } else {
                    // Toast(data.ResponseText)
                }
            } else {
                Toast('Lỗi kết nối')
            }
        })
    }


    onClickChangeAvatar = () => {
        if (this.state.percent == 0) {
            this.changeAvatar()
        }
    }

    changeAvatar = () => {
        let self = this;
        let { User } = this.props
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: response.uri
                });
                UploadImageAxios(api.UPLOAD.fileupload, response.uri, User.access_token, (data) => {
                    // console.log("jsjsjsjsjsjsjsjjs")
                    // console.log(JSON.stringify(data))
                    if (data.ResponseCode) {
                        this.setState({
                            avatarSource: api.domain + '/' + data.data
                        })
                        User.setAvatar(data.data)
                        this.updateProfile(data.data)
                        this.setState({ percent: 0 })
                        Toast('Cập nhật ảnh đại diện thành công')
                    } else {
                        Toast('Thay đổi thất bại')
                    }
                }, (percent) => {
                    console.log(percent)
                    self.setState({ percent })
                })
            }
        });
    }
    onToggleDrawer = () => {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true
              }
            }
          });
        // this.props.navigator.toggleDrawer({
        //     side: 'left',
        //     animated: true
        // });
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'drawer') {
                // this.props.navigator.pop()
                this.onToggleDrawer()
            }
        }
    };
    onClickEditName = () => {
        let { User } = this.props
        console.log('User.userInfo: ' + JSON.stringify(User.userInfo))
        // this.props.navigator.push({
        //     screen: 'EditProfileScreen',
        //     title: 'Họ và tên',
        //     passProps: { values: User.userInfo.fullname, type: 'name', title: 'Số điện thoại' }
        // });
        Navigation.push(this.props.componentId, {
            component: {
              name: 'EditProfileScreen',
              passProps: { values: User.userInfo.fullname, type: 'name', title: 'Số điện thoại' },
              options: {
                topBar: {
                  visible:false
                }
              }
            }
          });
    }
    onClickEditPhone = () => {
        let { User } = this.props
        // this.props.navigator.push({
        //     screen: 'EditProfileScreen',
        //     title: 'Số điện thoại',
        //     passProps: { values: User.userInfo.phone, type: 'phone', title: 'Số điện thoại' }
        // });
        Navigation.push(this.props.componentId, {
            component: {
              name: 'EditProfileScreen',
              passProps:{ values: User.userInfo.phone, type: 'phone', title: 'Số điện thoại' },
              options: {
                topBar: {
                  visible:false
                }
              }
            }
          });
    }

    render() {
        let { User, Home } = this.props
        let widthAvatar = values.deviceWidth / 4
        console.log(JSON.stringify(User.userInfo,"userInfo"))
        // console.log("CArrrrrr", JSON.stringify(Home.listCarAvailable))
        return (
            <View style={styles.container}>
                <NavBarCustom
                    onPress={this.onToggleDrawer}
                    title=''
                />
                <View
                    style={{ alignItems: 'center', backgroundColor: color.primaryColor, width: '100%', }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ justifyContent: 'center', alignItems: 'center', height: (widthAvatar + 24), width: (widthAvatar + 24), borderRadius: (widthAvatar + 24) / 2, backgroundColor: '#d32c46', overflow: 'hidden' }}
                        onPress={this.onClickChangeAvatar}
                    >
                        <View
                            style={{ justifyContent: 'center', alignItems: 'center', height: (widthAvatar + 16), width: (widthAvatar + 16), borderRadius: (widthAvatar + 16) / 2, backgroundColor: 'grey', overflow: 'hidden' }}>
                            <View
                                style={{ justifyContent: 'center', alignItems: 'center', height: (widthAvatar + 8), width: (widthAvatar + 8), borderRadius: (widthAvatar + 8) / 2, backgroundColor: 'white', overflow: 'hidden' }}>
                                <View
                                    style={{
                                        height: widthAvatar, width: widthAvatar, borderRadius: widthAvatar / 2,
                                        backgroundColor: 'grey', overflow: 'hidden', justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    <Image source={
                                        this.state.avatarSource
                                            ?
                                            { uri: this.state.avatarSource }
                                            :
                                            require('../../assets/images/avatar_default.jpg')
                                    } style={{ height: widthAvatar, width: widthAvatar, resizeMode: 'cover' }} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{
                        fontSize: 25, color: 'white',
                        fontWeight: '300', paddingTop: 15,
                        paddingHorizontal: 20,
                    }}>{User.userInfo.fullname || ''}</Text>
                    <RenderStart numberOfStar={Math.round(User.userInfo.rate)} styleParent={{ justifyContent: 'center', paddingBottom: 15, paddingTop: 5, }} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 10 }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.btnEditName}
                    // onPress={this.onClickEditName}
                    >
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 14, color: 'grey', fontWeight: '400' }}>Họ và tên</Text>
                            <Text style={{ marginTop: 3, fontSize: 18, color: 'black', }}>{User.userInfo.fullname || ''}</Text>
                        </View>
                        {/* <Image style={{ height: 15, width: 10, resizeMode: 'contain' }} source={require('../../assets/images/ic_arrow_right.png')} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.btnEditName}
                    //  onPress={this.onClickEditPhone}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, color: 'grey', fontWeight: '400' }}>Số điện thoại</Text>
                            <Text style={{ marginTop: 3, fontSize: 18, color: 'black', }}>{User.userInfo.phone || ''}</Text>
                        </View>
                        {/* <Image style={{ height: 15, width: 10, resizeMode: 'contain' }} source={require('../../assets/images/ic_arrow_right.png')} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.btnEditName} >
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, color: 'grey', fontWeight: '400' }}>Biển số xe</Text>
                            <Text style={{ marginTop: 3, fontSize: 18, color: 'black', }}>{`${User.userInfo.numberCar} - ${User.userInfo.nameCar}`|| ''}</Text>
                        </View>
                        {/* <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={require('../../assets/images/ic_arrow_right.png')} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.btnEditName} >
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, color: 'grey', fontWeight: '400' }}>Loại xe</Text>
                            <Text style={{ marginTop: 3, fontSize: 18, color: 'black', }}>{this.state.typeCar || ''}</Text>
                        </View>
                        {/* <Image style={{ height: 20, width: 10, resizeMode: 'contain' }} source={require('../../assets/images/ic_arrow_right.png')} /> */}
                    </TouchableOpacity>

                </View>
                {
                    this.state.percent != 0 && this.state.percent != 100
                    &&
                    <View style={{ position: 'absolute', bottom: values.isIphoneX ? 35 : 15, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 13, color: 'black', textAlign: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{'Ảnh được cập nhật '}</Text>
                            <Text>{this.state.percent + '%'}</Text>
                        </Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnEditName: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#dedede' },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
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

export default ProfileScreen