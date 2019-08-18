import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,
    AppState
} from 'react-native';
import { observer, inject } from 'mobx-react'
import { color, values, mapStyle, api } from '../../config';
import Dash from 'react-native-dash'
import screenId from '../../config/screenId';
import ViewShadow from '../../component/ViewShadow'
import MapView, { Marker, Callout, Polyline, PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';
import MarkerMeView from './map/MarkerMeView';
import PolylineView from './map/PolylineView';
import MarkerDirectView from './map/MarkerDirectView';
import MarkerStartAdressView from './map/MarkerStartAdressView';
import MarkerEndAdressView from './map/MarkerEndAdressView';
import NavBarCustomBtnBack from '../../component/NavBarCustomBtnBack'
import Communication from '../../utils/Communication';
import { getPositionListDirection, Toast } from '../../utils/Func';
import { PostWithToken } from '../../config/request';
import moment from 'moment';
import 'moment/locale/vi'  // without this line it didn't work
import SimpleToast from 'react-native-simple-toast';
import { toJS } from 'mobx';
import { Navigation } from 'react-native-navigation';
moment.locale('vi')

@inject('Order', 'Home', 'User')
@observer
class ConfirmOrder extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };
    static navigatorButtons = {
        leftButtons: [
            {
                id: 'back',
                icon: require('../../assets/images/ic_arrow_left.png')
            }
        ]
    }
    constructor(props) {
        super(props);
        Navigation.setDefaultOptions({
            topBar: {
              visible: false,
            }
          });
        this.state = {
            isShowDirect: false,
            isMapReady: false,
            loadding: false,
            region: {
                latitude: 47.6062,
                longitude: 122.3321,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            },
            dataUser: null,
            isGetOrder: false // khi nào click nhận chuyến thì sẽ thành true và sẽ k bị quay lại trang trước
        }
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    };

    onNavigatorEvent(event) {
        console.log("event",event);
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'back') {
                // this.props.navigator.pop()
            }
        }
    };

    onClickConfirm = () => {
        // this.props.Home.setStatusApp(2)
        // alert('s')
        // console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        let { User } = this.props
        let item = this.props.Order.orderDetail
        let jsonGetOrder = {
            "orderId": item.id
        }
        this.setState({ loadding: true, isGetOrder: true }, () => {
            // this.setState({ isGetOrder: true })
            // console.log('User.userInfo', JSON.stringify(User.userInfo))
            if (User.userInfo.status) {
                PostWithToken(api.ORDER.getorder, jsonGetOrder, User.access_token, (data, status) => {
                    // tắt loadding
                    this.setState({ loadding: false })
                    // console.log("sssssssssssssssss", data)
                    if (status) {
                        if (data.ResponseCode) {

                            // this.props.navigator.push({
                            //     screen: 'FinishOrder', // unique ID registered with Navigation.registerScreen
                            //     animated: true, // does the push have transition animation or does it happen immediately (optional)
                            //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                            // });
                              Navigation.push(this.props.componentId, {
                                component: {
                                  name: 'FinishOrder',
                                  options: {
                                    topBar: {
                                        visible:false
                                    }
                                  }
                                }
                              });
                        } else {
                            this.setState({isGetOrder: false })

                            Toast(data.ResponseText)
                        }
                    } else {
                        this.setState({isGetOrder: false })
                        console.log(data)
                        Toast('Lỗi kết nối')
                    }
                })
            } else {
                this.setState({ loadding: false, isGetOrder: false })
                // this.props.navigator.showLightBox({
                //     screen: "AlerWarningRigister", // unique ID registered with Navigation.registerScreen
                //     title: "Modal", // title of the screen as appears in the nav bar (optional)
                //     passProps: {
                //         type: 'confirm'
                //     },
                //     navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                //     animationType: 'slide-up', // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
                //     style: {
                //         backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                //         backgroundColor: "#00000080", // tint color for the background, you can specify alpha here (optional)
                //         tapBackgroundToDismiss: false // dismisses LightBox on background taps (optional)
                //     },
                // });
                Navigation.showOverlay({
                    component: {
                      name: 'AlerWarningRigister',
                      passProps: {
                        type: 'confirm'
                    },
                      options: {
                        layout: {
                            backgroundColor: '#00000080'
                          }
                      }
                    }
                  });
            }
        })


    }

    componentWillMount() {
        let { Order, Home, User } = this.props;
        let startAddress = { latitude: Order.orderDetail.fromLat, longitude: Order.orderDetail.fromLog };
        let endAddress = { latitude: Order.orderDetail.toLat, longitude: Order.orderDetail.toLog };
        getPositionListDirection(startAddress, endAddress, (data, status) => {
            console.log('111111data: ' + JSON.stringify(data))
            if (status) {
                Home.setListCoords(data);
            } else {
            }
        })
        this.getData((status, data) => {
            if (status) {
                this.setState({
                    dataUser: data
                })
            }
        })
        // BackHandler.addEventListener('hardwareBackPress', function () {
        // //    alert('aaa')
        //     return false
        // });


    }
    getData = (callback) => {
        let { User, Order } = this.props
        PostWithToken(api.USER.infouser, { id: Order.orderDetail.userId }, User.access_token, (data, status) => {
            if (status) {
                console.log("datatata", data)
                if (data.ResponseCode) {

                    callback(true, data.data)
                } else {
                    console.log("ERRRR", data)
                    callback(false, null)
                }
            } else {
                callback(false, null)
                console.log("ERRRR", data)

            }
        })
    }

    componentDidMount() {
        let { User, Order } = this.props
        this.focusMaker(70)
        // Xóa đơn
        User.socket.on('delorder', (data) => {
            // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", Order.orderDetail)
            // console.log("DAtatatatata", data)
            Order.delItemData(data)
            // alert(this.state.isGetOrder)
            if (Order.orderDetail && Order.orderDetail.id === data.id && !this.state.isGetOrder) {
                // this.props.navigator.pop({
                //     animated: true, // does the pop have transition animation or does it happen immediately (optional)
                //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
                // });
                Navigation.pop(this.props.componentId);
                // SimpleToast.show('Người dùng đã hủy đơn hàng này')
            }
        })

    }

    focusMaker = (bottom) => {
        let { Home, EnterAddress, Order } = this.props
        let self = this;

        if (Order.orderDetail) {
            let arrayFocus = [
                { latitude: Order.orderDetail.fromLat, longitude: Order.orderDetail.fromLog },
                { latitude: Order.orderDetail.toLat, longitude: Order.orderDetail.toLog }
            ]
            let edgePadding = { top: 50, right: 50, bottom: bottom, left: 50 }

            if (self.mapRef) {
                // console.log('arrayFocus', arrayFocus)
                setTimeout(() => {
                    self.mapRef.fitToCoordinates(arrayFocus,
                        { edgePadding: edgePadding, animated: true })
                }, 500)

            }
        }
    };

    onClickBack = () => {
        if (this.state.isShowDirect) {
            this.setState({
                isShowDirect: false
            })
        } else {
            // this.props.navigator.pop({
            //     animated: true, // does the pop have transition animation or does it happen immediately (optional)
            //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
            // });
            Navigation.pop(this.props.componentId);
        }

    }

    onLayout = () => {
        this.focusMaker(70)
        this.setState({ isMapReady: true });
    }

    clickCall = () => {
        if (this.state.dataUser) {
            // console.log("jsjsjsjss", this, this.state.dataUser)
            Communication.phonecall(this.state.dataUser.phone, true);
        }

    }

    clickDirect = () => {
        let { Home, Order } = this.props;
        Home.updateCoordMarkerDirect({ latitude: Order.orderDetail.fromLat, longitude: Order.orderDetail.fromLog })
        this.setState({
            isShowDirect: true
        })
    }

    render() {
        let { Home, Order } = this.props;
        let item = Order.orderDetail
        // 
        console.log("sssssssssssssssssssss", JSON.stringify(item))
        
        return (
            item &&
            <View style={styles.container}>
                <View style={{ width: '100%', flex: 1 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={toJS(Home.myPosition)}
                        customMapStyle={mapStyle}
                        loadingEnabled
                        ref={(ref) => this.mapRef = ref}
                        onLayout={this.onLayout}
                    >

                        <MarkerStartAdressView />
                        <MarkerEndAdressView />
                        <MarkerMeView />
                        {this.state.isShowDirect && <MarkerDirectView />}
                        <PolylineView />



                    </MapView >
                </View>

                {
                    !this.state.isShowDirect
                        ?
                        <View style={[styles.viewContent, styles.shadowPhone]}>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: color.colorLine, borderWidth: 1 }} />
                                <Text numberOfLines={1} style={styles.txtAddress}>{item.fromLocation}</Text>
                            </View>
                            <View style={{ marginVertical: 3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 15, width: '100%' }}>
                                <View style={{ width: 10, backgroundColor: 'transparent', alignItems: 'center', height: '100%', justifyContent: 'space-around' }} >
                                    <Dash
                                        dashThickness={2}//do day cua moi net dut
                                        dashColor={'#dce0ee'}
                                        style={{ width: 1, flex: 1, flexDirection: 'column', }} />
                                </View>
                                <View style={{ flex: 1, height: 2, paddingLeft: 15, paddingRight: 10 }} >
                                    <View style={{ backgroundColor: color.colorLine, height: 1, }} />
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ height: 10, width: 10, borderRadius: 5, borderColor: color.colorLine, borderWidth: 1 }} />
                                <Text numberOfLines={1} style={styles.txtAddress}>{item.toLocation}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', marginVertical: 15, paddingHorizontal: 20 }} >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={styles.titleDirection}>KHOẢNG CÁCH</Text>
                                    <Text style={styles.txtDirection}>{item.long ? item.long + 'Km' : '0Km'}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                                    <Text style={styles.titleDirection}>THỜI GIAN</Text>
                                    <Text style={styles.txtDirection}>{moment.duration(item.duration, "minutes").humanize()}</Text>
                                </View>
                            </View>
                            <View style={styles.viewBtnMapCall} >
                                <TouchableOpacity onPress={this.clickDirect} style={styles.viewBtn}>
                                    <Image style={styles.imageBtn} source={require('../../assets/images/directions.png')} />
                                    <Text style={styles.txtTitleBtn}>CHỈ ĐƯỜNG</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={[styles.viewBtn, { marginLeft: 10 }]}> */}
                                    {/* <Image style={styles.imageBtn} source={require('../../assets/images/phone.png')} /> */}
                                    {/* <Text style={styles.txtTitleBtn}>GỌI ĐIỆN</Text> */}
                                {/* </TouchableOpacity> */}
                            </View>
                            <View style={{ width: '100%', marginBottom: 20, marginTop: 10 }}>
                                <ViewShadow
                                    onPress={this.onClickConfirm}
                                    backgroundColor={color.primaryColor}
                                    shadowColor={color.primaryColor}
                                    colorText={'white'}
                                    textTitle={'NHẬN CHUYẾN'}
                                />
                            </View>


                        </View>
                        :
                        null
                }

                <View style={{
                    position: 'absolute',
                    marginTop: values.marginTopScreen,
                    alignSelf: 'flex-start'
                }}>
                    <TouchableOpacity activeOpacity={1} onPress={this.onClickBack}
                        style={{
                            height: 44, width: 44, paddingLeft: 10, backgroundColor: 'transparent',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                        <Image source={
                            require('../../assets/images/arrow-back.png')}
                            style={[
                                { width: 24, resizeMode: 'contain', tintColor: color.primaryColor }
                            ]
                            } />
                    </TouchableOpacity>
                </View>

                {
                    this.state.loadding ?
                        <View style={{
                            zIndex: 100, width: '100%',
                            backgroundColor: '#00000045',
                            height: '100%',
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 6
                        }}>
                            <ActivityIndicator size='large' color={color.primaryColor} />
                        </View>
                        :
                        null

                }
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
    map: {
        flex:1
    },
    txtTitleBtn: { fontSize: 12, fontWeight: '500', marginLeft: 3, color: color.primaryColor },
    imageBtn: { height: 15, width: 15, resizeMode: 'contain', tintColor: color.primaryColor },
    viewBtn: { flex: 1, paddingVertical: 7, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', borderColor: color.primaryColor, borderWidth: 1, borderRadius: 32 / 2 },
    viewBtnMapCall: { marginBottom: 10, width: '100%', flexDirection: 'row', paddingHorizontal: 20 },
    titleDirection: { fontSize: 12, marginBottom: 3, fontWeight: 'bold', color: color.CONFIRM_ORDER.txt_title_km_time },
    viewLineGrey: { backgroundColor: color.colorLine, height: 1, },
    viewLine: { flex: 1, height: 2, paddingLeft: 15, paddingRight: 10 },
    viewChildDot: { height: 2, width: '100%', backgroundColor: 'grey' },
    viewFatherDot: { width: 1, height: '100%', justifyContent: 'space-around' },
    viewTo: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    viewFrom: { width: '100%', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    viewDot: { marginVertical: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 15, width: '100%', paddingLeft: 5 },
    viewCricle: { width: 10, height: 10, borderRadius: 10 / 2, borderColor: 'grey', borderWidth: 2 },
    viewContent: {
        width: '100%', paddingTop: 10, backgroundColor: 'white',
        paddingHorizontal: 20, borderTopColor: 'black',
        borderRadius: 10
        //  bottom: 15, overflow: 'hidden', position: 'absolute'
    },

    btnConfirm: {
        marginTop: 10, marginBottom: 20, width: '100%',
        borderRadius: 42 / 2, justifyContent: 'center', alignItems: 'center',
        backgroundColor: color.primaryColor, alignSelf: 'center',
    },
    txtAddress: { fontSize: 14, color: color.LIST_ORDER.textAddress, fontWeight: 'normal', flex: 1, paddingLeft: 10, textAlign: 'left', },
    txtDirection: { fontSize: 14, color: color.textNormal, fontWeight: 'normal' },
    image: {
        height: 15,
        width: 15
    },
    shadowPhone:
        values.platform == 'ios' ? {
            shadowColor: 'grey',
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.65,
            shadowRadius: 7,
        }
            :
            { elevation: 5 },
    shadowBtnFinish:
        values.platform == 'ios' ? {
            shadowColor: color.btnFinishOrder,
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.65,
            shadowRadius: 7,
        }
            :
            { elevation: 5 },
});

export default ConfirmOrder