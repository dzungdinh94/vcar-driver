import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    StatusBar,
    BackHandler,
    Platform,
    AsyncStorage,
    AppState,
    PermissionsAndroid
} from 'react-native';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';

import { inject, observer } from 'mobx-react/native'
import { values, color, api } from '../../../config';
import { getPositionListDirection, checkPhone } from '../../../utils/Func'
import ListOrder from '../listOrder/ListOrder'
import ConfirmOrder from '../ConfirmOrder'
import NavBarCustom from '../../../component/NavBarCustom'
import screenId from '../../../config/screenId';
// import FCM, {  } from 'react-native-fcm';
import firebase from 'react-native-firebase'
import type { Notification, NotificationOpen,FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-firebase';
import {connectSocketIO} from "../../../config/request";
import io from 'socket.io-client'
import {Navigation} from "react-native-navigation";
// let socket = null
@inject('User', 'Home', 'Map', 'EnterAddress', 'OnApp', 'Order')
@observer
class HomeMainScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };
    static navigatorButtons = {
        leftButtons: [
            {
                id: 'drawer',
                icon: require('../../../assets/images/ic_menu.png'),
            }
        ]
    }
    constructor(props) {
        super(props)
        this.state = {
            appState: AppState.currentState
        };
        this.props.User.socket = io(`${api.domain}/mobile`, {
            jsonp: false,
            // keepalive: true,
            reconnection: true,
            reconnectionAttempts: 100,
            reconnectionDelay: 10000,
            // forceNew: true,
            pingInterval: 3000,
            pingTimeout: 7000,
            timeout: 10000,
            query: `fcmId=${this.props.User.fcm}&token=${this.props.User.access_token}`
        })

        this.props.User.rootNavigator = this.props.navigator;
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    };

    onToggleDrawer = () => {
        // this.props.navigator.toggleDrawer({
        //     side: 'left',
        //     animated: true
        // });
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true
              }
            }
          });
    }

    // onToggleNavBar = () => {
    //     this.props.navigator.toggleNavBar({
    //         to: 'hidden', // required, 'hidden' = hide navigation bar, 'shown' = show navigation bar
    //         animated: true // does the toggle have transition animation or does it happen immediately (optional). By default animated: true
    //     });

    // }

    onNavigatorEvent(event) {
        console.log(JSON.stringify(event))
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'drawer') {
                this.onToggleDrawer()
            }
        }
    };
    componentWillMount() {
        let { OnApp, Order, User, EnterAddress, Map } = this.props
        OnApp.screenCurrent = screenId.MENU.screenType.home;
        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);
        this.props.User.socket.on('connect', function () {
            // alert('connect')

        });
        this.props.User.socket.on('disconnect', (reason) => {
        });
        Map.coordDirection = EnterAddress.startAddress;
        getPositionListDirection(EnterAddress.startAddress, EnterAddress.endAddress, (data, status) => {
            if (status) {
                console.log('dataKaka: ' + JSON.stringify(data))
                Map.setListCoords(data);
            }
        })

        // this.props.navigator.toggleTabs({
        //     to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
        //     animated: true // does the toggle have transition animation or does it happen immediately (optional)
        // });
    };
    componentWillUnmount() {
        // this.notificationDisplayedListener();
        // this.notificationOpenedListener();
        // this.notificationListener();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        var { Order, User, Home } = this.props
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground2!',this.props.User.access_token);
            socket = io(`${api.domain}/mobile`, { query: `fcmId=${this.props.User.fcm}&token=${this.props.User.access_token}` });
            Order.getStatusOrder(this.props.User.access_token, (status) => {
                if (status) {
                    Navigation.push(this.props.componentId, {
                        component: {
                          name: 'FinishOrder',
                        }
                      });
                    // this.props.navigator.push({
                    //     screen: 'FinishOrder', // unique ID registered with Navigation.registerScreen
                    //     animated: true, // does the push have transition animation or does it happen immediately (optional)
                    //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                    // });
                }
            })

            if (Home.markerMe.latitude && Home.markerMe.longitude) {
                Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [],User.userInfo.id)
                console.log(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude,"hihi3 3")
            }

        }
        this.setState({ appState: nextAppState });
    }
    getOrder = () => {
        let { OnApp, Order, User, Home } = this.props
        if (Home.markerMe.latitude && Home.markerMe.longitude) {
            Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [],User.userInfo.id)
            console.log(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude,"hihi3 1")
        } else {
            Home.getCurrentPosition(User.access_token, status => {
                if (status) {
                    Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [],User.userInfo.id)
                    console.log(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude,"hihi3 2")
                } else {
                    this.getOrder()
                }
            })
        }
    }
    async requestPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Xin quyền truy cập vị trí',
              message:
                'Cho chúng tôi biết vị trí của bạn',
              buttonNeutral: 'Hỏi lại tôi sau',
              buttonNegative: 'Hủy bỏ',
              buttonPositive: 'Đồng ý',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
   async componentDidMount() {
        let { OnApp, Order, User, Home } = this.props
        let self = this
        await this.requestPermission();
        AppState.addEventListener('change', this._handleAppStateChange);
        User.getCountNotif()
        Home.getAppInfo()
        Order.getStatusOrder(User.access_token, (status) => {
            if (status) {
                // this.props.navigator.push({
                //     screen: 'FinishOrder', // unique ID registered with Navigation.registerScreen
                //     animated: true, // does the push have transition animation or does it happen immediately (optional)
                //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                // });
                Navigation.push(this.props.componentId, {
                    component: {
                      name: 'FinishOrder',
                    }
                  });
            }
        })
        this.getOrder()

        // Có đơn hàng mới
        User.socket.on('neworder', (data) => {
            console.log("  ssssssssssssssssssssssssssssssss ")
            console.log("SOCKETTTTTT", data)
            let dataSend = { ...data }
            let serviceAttach = JSON.parse(data.serviceAttach)
            dataSend.serviceAttach = serviceAttach
            Order.addItemData(dataSend)
        })
        // // Xóa đơn
        User.socket.on('delorder', (data) => {
            console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
            console.log("DAtatatatata", data)
            Order.delItemData(data)
        })

        BackHandler.addEventListener('hardwareBackPress', function () {
            switch (OnApp.screenCurrent) {
                case screenId.MENU.screenType.home:
                case screenId.MENU.screenType.history:
                case screenId.MENU.screenType.notification:
                case screenId.MENU.screenType.guide:
                case screenId.MENU.screenType.hotline:
                case screenId.MENU.screenType.profile:
                    //trang chu
                    return true
                    break;
                default:
                    return false
                    break;
            }
        });
        console.log(OnApp.dataNoti,"onApp");
        if (OnApp.dataNoti) {
            console.log("van vao");
            if (OnApp.dataNoti.typeNoti === 'notification') {
                // User.rootNavigator.push({
                //     screen: 'NotificationScreen',
                //     title: "Thông báo"
                // });
                Navigation.push(this.props.componentId, {
                    component: {
                      name: 'NotificationScreen',
                    }
                  });
            } else {
                this.onClickNotifi(OnApp.dataNoti)
            }
        }
        if (values.platform === 'ios') {
            firebase.messaging().requestPermission().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
            this.notificationListener = firebase.messaging().onMessage(FCMEvent.Notification, async (notif) => { // bat o trong app
                console.log('----------------:' + JSON.stringify(notif))

                if (notif) {
                    if (notif.custom_notification) {
                        self.onClickNotifi(JSON.parse(notif.custom_notification).data)
                        // console.log('--------11--------:' + JSON.stringify(JSON.parse(notif.custom_notification)))
                    }

                    if (notif.local_notification) {
                        //this is a local notification
                    }
                    if (notif.opened_from_tray) {
                  
                    }
                    //     // await someAsyncCall();
                    if (Platform.OS === 'ios') {//Để ios nhận đc notif trong app
                       
                        switch (notif._notificationType) {
                            case NotificationType.Remote:
                                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                                break;
                            case NotificationType.NotificationResponse:
                                notif.finish();
                                break;
                            case NotificationType.WillPresent:
                                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                                break;
                        }
                    }
                }

            });

            // // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
            // // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
            // // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
            firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                if (notif) {
                   // self.onClickItemNotifi(notif);
                   if (notif.local_notification) {
                    //this is a local notification
                }
                if (notif.opened_from_tray) {
                    if (notif.custom_notification) {
                        if (JSON.parse(notif.custom_notification).data) {
                            self.onClickNotifi(JSON.parse(notif.custom_notification).data)
                        }
                    }
                }
                }
            });

            // FCM.getInitialNotification().then(notif => { // bat o ngoai app khi click vao notifi
            //     if (notif) {
                   
            //     }

            // });

        } else {
            this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
                const action = notificationOpen.action;
                const notification: Notification = notificationOpen.notification;
                if (JSON.parse(notificationOpen.notification._data.custom_notification).data.typeNoti === 'notification') {
                    console.log("van vao 2");
                    // User.rootNavigator.push({
                    //     screen: 'NotificationScreen',
                    //     title: "Thông báo"
                    // });
                    Navigation.push(this.props.componentId, {
                        component: {
                          name: 'NotificationScreen',
                        }
                      });
                    OnApp.setDataNoti(JSON.parse(notificationOpen.notification._data.custom_notification).data)

                } else {
                    this.onClickNotifi(JSON.parse(notificationOpen.notification._data.custom_notification).data)
                }
            });
            firebase.notifications().getInitialNotification()
                .then((notificationOpen: NotificationOpen) => {
                    if (notificationOpen) {
                        // App was opened by a notification
                        // Get the action triggered by the notification being opened
                        const action = notificationOpen.action;
                        // Get information about the notification that was opened
                        const notification: Notification = notificationOpen.notification;
                        console.log("a1111111111111", notificationOpen)
                    }
                });
          
            this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
                this.onClickNotifi(JSON.parse(notification._data.custom_notification).data)
                if (JSON.parse(notification._data.custom_notification).data.typeNoti == 'notification') {
                    const notificationss = new firebase.notifications.Notification()
                        .setTitle(JSON.parse(notification._data.custom_notification).data.title)
                        .setBody(JSON.parse(notification._data.custom_notification).data.content)
                        .setData(notification._data)
                    // notificationss.android.setCh
                    notificationss.android.setSmallIcon('ic_launcher');
                    if (values.platform === 'android') {
                        const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
                            .setDescription('My apps test channel');

                        // Create the channel
                        firebase.notifications().android.createChannel(channel);
                        notificationss.android.setChannelId(channel.channelId)
                        notificationss.android.setAutoCancel(true)
                        notificationss.android.setClickAction('OPEN_ACTIVITY')
                    }

                    firebase.notifications().displayNotification(notificationss)

                }
            });
        }

    };
    // onClickNotifi = () => {

    // }
    onClickNotifi = (notif) => {
        let { Order, User, OnApp } = this.props
        // console.log('notif.data.typeNoti',notif.data.typeNoti)
        User.getCountNotif()
        switch (notif.typeNoti) {
            case "neworder":
                // console.log("vao day k har")
                let dataSend = { ...notif }
                let serviceAttach = JSON.parse(notif.serviceAttach)
                dataSend.serviceAttach = serviceAttach
                // console.log("DAtatatatatat", JSON.stringify(dataSend))
                Order.addItemData(dataSend)
                break;
            case "delorder":
                // console.log("Vao day k????????????????")
                Order.delItemData(notif)
                break;
            case "delorderbyuser":
                // console.log("Vao day k????????????????")
                // this.props.navigator.popToRoot({
                //     animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                // });
                Navigation.popToRoot(this.props.componentId);
                break;

            default:
                break;


        }

    }



    hiddenView = () => {
        this.props.Home.isShowVote = false;
    }

    render() {
        let { Home, Order } = this.props
        return (
            <View
            >
                <NavBarCustom
                    onPress={this.onToggleDrawer}
                    title='Đơn hàng'
                />
                <ListOrder {...this.props} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',

    },
    shadow:
        values.platform == 'ios' ? {
            shadowColor: 'gray',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        }
            :
            { elevation: 2, marginBottom: 3, },
});

export default HomeMainScreen