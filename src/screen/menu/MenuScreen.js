import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    ImageBackground,
    AsyncStorage,
    Linking
} from 'react-native';
import color from '../../config/color'
import { observer, inject } from 'mobx-react'
import { showLogin } from '../../../App';
import RenderStart from '../../component/RenderStart';
import { values, config } from '../../config';
import screenId from '../../config/screenId';
import MenuScreenFlatListItem from './MenuScreenFlatListItem';
import Communication from '../../utils/Communication'
import request, { PostWithToken } from '../../config/request'
import { api } from '../../config/index';
import SimpleToast from 'react-native-simple-toast';
import { Navigation } from 'react-native-navigation';
@inject('User', 'OnApp', 'EnterAddress', 'Home')
@observer
class MenuScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    'id': screenId.MENU.screenType.home,
                    'title': 'Trang chủ',
                    'img': require('../../assets/images/home.png')

                },
                {
                    'id': screenId.MENU.screenType.history,
                    'title': 'Lịch sử giao dịch',
                    'img': require('../../assets/images/history.png')

                },
                {
                    'id': screenId.MENU.screenType.notification,
                    'title': 'Thông báo',
                    'img': require('../../assets/images/notification-important.png')

                },
                {
                    'id': screenId.MENU.screenType.guide,
                    'title': 'Hướng dẫn',
                    'img': require('../../assets/images/info.png')

                },
                {
                    'id': screenId.MENU.screenType.hotline,
                    'title': 'Tổng đài',
                    'img': require('../../assets/images/headset-mic.png')

                },
                {
                    'id': screenId.MENU.screenType.logout,
                    'title': "Đăng xuất",
                    'img': require('../../assets/images/googleplus-reshare.png')
                },
            ]
        };

        this.renderItem = this.renderItem.bind(this);
    };

    onSetDrawerEnabled = () => {
        // this.props.navigator.toggleDrawer({
        //     side: 'left',
        //     enabled: false
        // });
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        });
    }

    onClickItemMenu = (item) => {
        let { User, OnApp, Home } = this.props;
        console.log("hshshshs")

        switch (item.id) {
            case screenId.MENU.screenType.home:
                //trang chu
                this.onSetDrawerEnabled()
                console.log(OnApp.screenCurrent)
                if (OnApp.screenCurrent != item.id) {
                    // User.rootNavigator.push({
                    //     screen: 'HomeMainScreen',
                    //     title: "Đơn hàng"
                    // });
                    Navigation.setRoot({
                        root: {
                            sideMenu: {
                                id: "sideMenu",
                                left: {
                                    component: {
                                        id: "Drawer",
                                        name: "MenuScreen"
                                    }
                                },
                                center: {
                                    stack: {
                                        id: "AppRoot",
                                        children: [{
                                            component: {
                                                name: "HomeMainScreen",
                                                options: {
                                                    topBar: {
                                                      visible: false,
                                                    },
                                                  }
                                            },
                                        }]
                                    }
                                }
                            }
                        }
                    });
                }
                
                break;
            case screenId.MENU.screenType.history:
                //lich su giao dich
                this.onSetDrawerEnabled()
                console.log(OnApp.screenCurrent)
                if (OnApp.screenCurrent != item.id) {
                    // User.rootNavigator.push({
                    //     screen: 'HistoryTransactionScreen',
                    //     title: "Lịch sử giao dịch"
                    // });
                    Navigation.setRoot({
                        root: {
                            sideMenu: {
                                id: "sideMenu",
                                left: {
                                    component: {
                                        id: "Drawer",
                                        name: "MenuScreen"
                                    }
                                },
                                center: {
                                    stack: {
                                        id: "AppRoot",
                                        children: [{
                                            component: {
                                                name: "HistoryTransactionScreen",
                                                options: {
                                                    topBar: {
                                                      visible: false,
                                                    },
                                                  }
                                            },
                                        }]
                                    }
                                }
                            }
                        }
                    });
                }
                break;
            case screenId.MENU.screenType.notification:
                //thong bao
                this.onSetDrawerEnabled()
                if (OnApp.screenCurrent != item.id) {
                    console.log(item.id,"vao menuScreen",OnApp.screenCurrent);
                    // User.rootNavigator.push({
                    //     screen: 'NotificationScreen',
                    //     title: "Thông báo"
                    // });
                    Navigation.setRoot({
                        root: {
                            sideMenu: {
                                id: "sideMenu",
                                left: {
                                    component: {
                                        id: "Drawer",
                                        name: "MenuScreen"
                                    }
                                },
                                center: {
                                    stack: {
                                        id: "AppRoot",
                                        children: [{
                                            component: {
                                                name: "NotificationScreen",
                                                options: {
                                                    topBar: {
                                                      visible: false,
                                                    },
                                                  }
                                            },
                                        }]
                                    }
                                }
                            }
                        }
                    });
                }
                break;
            case screenId.MENU.screenType.guide:
                if (Home.linkGuide) {
                    Linking.openURL(Home.linkGuide);
                } else {
                    SimpleToast.show('Không tìm thấy đường dẫn')
                }
                break;
            case screenId.MENU.screenType.hotline:
                if (Home.hotline) {
                    Communication.phonecall(Home.hotline, true);
                } else {
                    SimpleToast.show('Không tìm thấy số điện thoại')
                }
                break;
            case screenId.MENU.screenType.logout:
                this.logout();
                break;
            default:
                this.onSetDrawerEnabled()
                showLogin()
                break;

        }
        // alert(JSON.stringify(item))
    }

    logout = () => {
        let { User } = this.props;
        var self = this;
        Alert.alert('Đăng xuất', 'Bạn thực sự muốn đăng xuất?',
            [
                {
                    text: 'Huỷ', onPress: () => {
                        console.log('huỷ đăng xuất')
                        self.onSetDrawerEnabled()
                    }, style: 'cancel'
                },
                {
                    text: 'Đồng ý', onPress: () => {
                        // AsyncStorage.removeItem('userInfo')
                        PostWithToken(api.logout, {}, this.props.User.access_token, (data, status) => {
                            if (status) {

                            }
                        })
                        AsyncStorage.removeItem('token')
                        this.onSetDrawerEnabled()
                        showLogin()
                    }, style: 'destructive'
                },
            ],
        )
    }

    onClickProfile = () => {
        this.onSetDrawerEnabled()
        // this.props.User.rootNavigator.push({
        //     screen: 'ProfileScreen',
        // });
        Navigation.setRoot({
            root: {
                sideMenu: {
                    id: "sideMenu",
                    left: {
                        component: {
                            id: "Drawer",
                            name: "MenuScreen"
                        }
                    },
                    center: {
                        stack: {
                            id: "AppRoot",
                            children: [{
                                component: {
                                    name: "ProfileScreen",
                                    options: {
                                        topBar: {
                                          visible: false,
                                        },
                                      }
                                },
                            }]
                        }
                    }
                }
            }
        });
    }
    renderItem({ item }) {
        return (
            <MenuScreenFlatListItem item={item} onClickItemMenu={this.onClickItemMenu} />
        );
    }

    render() {
        // const params = this.props.navigation.state.params;
        let { User } = this.props
        let widthAvatar = values.deviceWidth / 6.5
        return (
            <View style={styles.container}>
                <ImageBackground style={{
                    marginTop: values.contentToolbarHeight,
                    width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                }}
                    source={require('../../assets/images/menu-bg.png')}
                >
                    <TouchableOpacity
                        onPress={this.onClickProfile} style={{
                            width: "100%", backgroundColor: 'transparent',
                            paddingHorizontal: 10,
                            flexDirection: 'row',

                            justifyContent: 'center', alignItems: 'center'
                        }}>
                        <View
                            style={{ justifyContent: 'center', alignItems: 'center', height: (widthAvatar + 24), width: (widthAvatar + 24), borderRadius: (widthAvatar + 24) / 2, backgroundColor: '#d32c46', overflow: 'hidden' }}>
                            <View
                                style={{ justifyContent: 'center', alignItems: 'center', height: (widthAvatar + 16), width: (widthAvatar + 16), borderRadius: (widthAvatar + 16) / 2, backgroundColor: 'rgba(255, 255, 255, 0.25)', overflow: 'hidden' }}>
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', height: (widthAvatar + 8), width: (widthAvatar + 8), borderRadius: (widthAvatar + 8) / 2, backgroundColor: '#eedce3', overflow: 'hidden' }}>
                                    <View
                                        style={{
                                            height: widthAvatar, width: widthAvatar, justifyContent: 'center', alignItems: 'center',
                                            borderRadius: widthAvatar / 2, backgroundColor: 'grey', overflow: 'hidden'
                                        }}>
                                        <Image source={
                                            User.userInfo.avatar
                                                ?
                                                { uri: api.domain + '/' + User.userInfo.avatar }
                                                :
                                                require('../../assets/images/avatar_default.jpg')
                                        } style={{ width: widthAvatar, height: widthAvatar, resizeMode: 'cover' }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'transparent', paddingLeft: 15, flex: 1, }}>
                            <Text numberOfLines={1} style={{ fontSize: 20, color: 'white', backgroundColor: 'transparent', fontWeight: '300', paddingBottom: 15 }}>{User.userInfo.fullname}</Text>
                            <RenderStart numberOfStar={Math.round(User.userInfo.rate)} />
                        </View>

                    </TouchableOpacity>
                    <FlatList
                        style={{ width: '100%', marginTop: 40 }}
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                </ImageBackground>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', position: "absolute", bottom: 10, paddingHorizontal: 10 }}>
                    <Text style={{ textAlign: 'center', fontSize: 11, color: 'white', }}>
                        <Text style={{}}>Phiên bản </Text>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{config.app_version}</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: color.primaryColor,
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20
    }
});
export default MenuScreen;