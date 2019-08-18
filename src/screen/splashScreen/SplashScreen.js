//import liraries
import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    Dimensions, Platform,
    Image, Animated,
    Easing, AsyncStorage,
    StatusBar,
    Alert, NetInfo,
    PermissionsAndroid,
    ImageBackground,
    BackAndroid
} from 'react-native';
// import _ from 'lodash'
// import polyline from '@mapbox/polyline';
// import { hasInternetConnection } from 'react-native-connection-status';

import Permissions from 'react-native-permissions'
import { inject, observer } from "mobx-react/native";
import styles from './StyleSheet'
import _ from 'lodash'
import { values, color, config, api, } from '../../config'
import Toast from 'react-native-simple-toast';
import moment from 'moment'
import { showLogin, showApp } from '../../../App';
// import FCM from 'react-native-fcm'
import { PostWithToken, GetWithToken, PostNoToken } from '../../config/request';
import firebase from 'react-native-firebase'
import type { Notification, NotificationOpen } from 'react-native-firebase';

// import geolib from 'geolib'
var isGoLogin = false;
// create a component
var isShowAlert = false;
@inject("User", 'Home', 'OnApp')
@observer
class SplashScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        statusBarTextColorSchemeSingleScreen: 'light',
        statusBarTextColorScheme: 'light'
    };

    constructor(props) {
        super(props)
        this.state = {
            permissionLocation: false,
        };
        // this.onLetGo = this.onLetGo.bind(this);
        this.getData = this.getData.bind(this);
        this.requestLocationPermission = this.requestLocationPermission.bind(this);
        this.checkLocationPermissionAccess = this.checkLocationPermissionAccess.bind(this);
        this.requestLocationPermissionAccess = this.requestLocationPermissionAccess.bind(this);
        this.checkNetWork = this.checkNetWork.bind(this)
    };

    async getData() {
        let self = this;

        this.props.Home.getTypeCar()

        // await FCM.getFCMToken().then(token => {
        //     AsyncStorage.setItem('fcm', token)
        //     console.log("FCMMMMMM", token)
        //     this.props.User.setFcm(token)
        //     if (token) {
        //         this.subscribeToTopic(token, (status) => {
        //             // alert(status)
        //             if (!status) {
        //                 setTimeout(() => {
        //                     showLogin()
        //                 }, 1000);
        //             }
        //         })
        //     }
        // });
        await firebase.messaging().getToken()
            .then(token => {
                AsyncStorage.setItem('fcm', token)
                console.log("FCMMMMMM", token)
                this.props.User.setFcm(token)
                if (token) {
                    this.subscribeToTopic(token, (status) => {
                        // alert(status)
                        if (!status) {
                            setTimeout(() => {
                                showLogin()
                            }, 1000);
                        }
                    })
                }
            });


        await AsyncStorage.getItem('token').then((token) => {
            //da login
            if (token) {
                // console.log("tokennnnn")
                console.log("tokennnnn", token)
                GetWithToken(api.USER.info, token, (data, status) => {
                    if (status) {
                        console.log("GETUSERRRRRRRRRRRRRRR", data)
                        if (data.ResponseCode) {
                            this.props.User.setUserInfo(data.data)
                            this.props.User.setToken(token)
                            this.getPosition()
                            // showApp()
                        } else {
                            setTimeout(() => {
                                showLogin()
                            }, 1000);
                        }
                    } else {
                        setTimeout(() => {
                            showLogin()
                        }, 1000);
                    }
                })
            } else {//chua login
                setTimeout(() => {
                    showLogin()
                }, 1000);
            }
        })


    }
    subscribeToTopic(fcm, cb) {
        PostNoToken(api.subscribeToTopic, {
            "type": "driver",
            "fcmId": fcm
        }, (data, status) => {
            if (status) {
                if (data.ResponseCode) {
                    cb(true)
                } else {
                    cb(false)
                }
            } else {
                cb(false)
            }
        })
    }
    getPosition = () => {
        let { User, Home } = this.props
        this.props.Home.getCurrentPosition(User.access_token, (status) => {
            if (Home.markerMe && Home.markerMe.latitude != 0 && Home.markerMe.longitude != 0) {
                showApp()
            } else {
                // this.getPosition()
                this.props.Home.getWatchCurrentPosition(User.access_token, (status) => {
                })
                Alert.alert('Vị trí', 'Không thể lấy được vị trí của bạn',
                    [
                        { text: 'Thoát', onPress: () => { BackAndroid.exitApp() } },
                        { text: 'Lấy lại vị trí', onPress: () => this.getPosition() },
                    ])

            }
        })
    }
    // getWatchPosition = () => {
    //     let { User, Home } = this.props
    //     this.props.Home.getWatchCurrentPosition(User.access_token, (status) => {
    //         if (status) {
    //             showApp()
    //         } else {
    //             // this.getWatchPosition()
    //             Alert.alert('Vị trí', 'Không thể lấy được vị trí của bạn',
    //                 [
    //                     { text: 'Thoát', onPress: () => { BackAndroid.exitApp() } },
    //                     { text: 'Lấy lại vị trí', onPress: () => this.getWatchPosition() },
    //                 ])

    //         }
    //     })
    // }

    checkLocationPermissionAccess() {
        var self = this;
        Permissions.check('location', { type: 'whenInUse' }).then(response => {
            console.log(' -------=========check quyen=======----------- ' + JSON.stringify(response))
            if (response != 'authorized') {
                self.requestLocationPermissionAccess()
            } else {
                self.setState({ permissionLocation: true })
                this.getData()
            }
        })
    };

    requestLocationPermissionAccess() {
        var self = this;
        var check = true;
        if (!isShowAlert) {
            Permissions.request('location', { type: 'whenInUse' }).then(response => {
                if (response != 'authorized') {
                    isShowAlert = true;
                    // Alert.alert('Open Settings', 'Please allow the app to use your location',
                    Alert.alert('Mở Cài đặt', 'Vui lòng cho phép ứng dụng sử dụng vị trí của bạn',
                        [
                            {
                                // text: 'Cancel',
                                text: 'Huỷ',
                                onPress: () => {
                                    isShowAlert = false;
                                    self.requestLocationPermissionAccess()
                                },
                                style: 'cancel',
                            },
                            {
                                // text: 'Open Settings',
                                text: 'Mở Cài đặt',
                                onPress: () => {
                                    isShowAlert = false;
                                    Permissions.openSettings();
                                    check = true;
                                }
                            }//vao setting xin quyen
                            ,],
                    )
                } else {
                    self.setState({ permissionLocation: true })
                    this.getData()
                }
            })
        }
    };


    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                'android.permission.ACCESS_FINE_LOCATION',
                'android.permission.ACCESS_COARSE_LOCATION'
            ],
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("vao day1")
                this.setState({
                    permissionLocation: true
                })
            } else {
                console.log("vao day2")
                this.setState({
                    permissionLocation: false
                })
            }

        } catch (err) {
            console.log("vao day3")
            console.warn(err)
        }
        try {
            const checkACCESS_FINE_LOCATION = await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')
            const CheckACCESS_COARSE_LOCATION = await PermissionsAndroid.check('android.permission.ACCESS_COARSE_LOCATION')
            if (checkACCESS_FINE_LOCATION && CheckACCESS_COARSE_LOCATION) {
                console.log("vao day4")
                this.setState({
                    permissionLocation: true
                })
            } else {
                console.log("vao day5")
                this.setState({
                    permissionLocation: false
                })
            }
        } catch (err) {
            console.log("vao day6")
            console.warn(err)
        }
        if (this.state.permissionLocation) {
            this.getData()
        } else {
            Alert.alert('Vị trí', 'Không lấy được vị trí của bạn')
        }
    }

    componentDidMount() {
        this.checkNetWork()
        firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                if (notificationOpen) {
                    this.props.OnApp.setDataNoti(JSON.parse(notificationOpen.notification._data.custom_notification).data)

                }
            });

    }

    // componentDidMount() {
    //     hasInternetConnection((isConnected: boolean) => {
    //         console.log('ket noi isConnected: ' + isConnected)
    //     })
    // }
    async checkNetWork() {
        let self = this
        let checkNet = (isConnected) => {
            console.log("isConnectedddddddd", isConnected)
            if (isConnected) {
                //Check token
                this.props.OnApp.isConnect = true;
                if (values.platform === 'ios') {
                    this.checkLocationPermissionAccess()
                } else {
                    this.requestLocationPermission()
                }
            } else {
                setTimeout(() => {
                    this.props.OnApp.isConnect = false;
                }, 5000);
            }
        }
        NetInfo.isConnected.fetch().then(isConnected => checkNet(isConnected));
        NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => checkNet(isConnected));
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', () => { });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={require('../../assets/images/logo.png')}
                        style={styles.logo} />
                </View>
                {
                    !this.props.OnApp.isConnect ? <Text style={styles.textDisconnect}>Đường truyền mạng trên thiết bị đã mất kết nối. Vui lòng kiểm tra và thử lại!</Text> : null
                }
            </View>
        );
    }
}

//make this component available to the app
export default (SplashScreen);
