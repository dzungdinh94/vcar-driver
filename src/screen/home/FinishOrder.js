import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { color, values, api } from '../../config';
import { observer, inject } from 'mobx-react'
import screenId from '../../config/screenId';
import ViewShadow from '../../component/ViewShadow'
import NavBarCustomBtnBack from '../../component/NavBarCustomBtnBack'
import { PostWithToken } from '../../config/request';
import { Toast } from '../../utils/Func';
import numeral from 'numeral'
import SimpleToast from 'react-native-simple-toast';
import { Navigation } from 'react-native-navigation';
@inject('Home', 'Order', 'User')
@observer
class FinishOrder extends Component {
    static navigatorStyle = {
        //     // navBarTranslucent: true,
        navBarHidden: true,

        // navBarBackgroundColor: 'white',
        // //     // navBarTextColor: 'white',
        // navBarButtonColor: color.primaryColor,
        //     // navBarTranslucent: true, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
        //     // navBarTransparent: true,
        //     // navBarBackgroundColor:'transparent',
        //     // navBarButtonColor: color.primaryColor,
        //     // drawUnderNavBar: true,
        // topBarElevationShadowEnabled: false,
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
        this.state = {
            loadding: false,
            dataUser: null,
            conformCancelOrder: false,
            active: 1
        }
        Navigation.setDefaultOptions({
            topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
            }
        });
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    };

    onNavigatorEvent(event) {

        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'back') {
                // this.props.navigator.pop()
            }
        }
    };
    componentDidMount() {
        let { User, Order } = this.props
        // Xóa đơn
        // User.socket.on('delorderbyuser', (data) => {
        //     console.log("ssssssssssssssssssssssssssssssssssssss")
        //     this.props.navigator.popToRoot({
        //         animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
        //         animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        //     });
        //     Order.setItemDetail(null)
        // })
        // User.socket.on('delorderbyuser', (data) => {
        //     // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
        //     // console.log("DAtatatatata", data)
        //     Order.delItemData(data)
        // })
        User.socket.on('delorderbyuser', (data) => {
            console.log("ssssssssssssssssssssssssssssssssssssss")
            // this.props.navigator.popToRoot({
            //     animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
            // });
            Navigation.popToRoot(this.props.componentId);
            Order.setItemDetail(null)
        })
        this.interval = setInterval(() => {
            this.props.Home.getWatchCurrentPosition(User.access_token, (data) => {
                console.log("getWatchCurrentPosition");
                let { Home, Order, User, active } = this.props;
                let item = Order.orderDetail


                if (data && data.status === true) {
                    let jsonFinish = { orderId: item.id, position: data.position }
                    User.socket.emit('updatePosition', jsonFinish);
                    console.log("vao updatePosition", jsonFinish)
                }

            })
        }, 10000)

    }
    getData = (callback) => {
        let { User, Order } = this.props
        console.log(Order.orderDetail.userId, User.access_token, "token hihi");
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
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    _onClickShowDetail = () => {
        let { Order } = this.props
        this.setState({ loadding: true }, () => {
            this.getData((status, data) => {
                this.setState({ loadding: false })

                if (status) {
                    Navigation.showOverlay({
                        component: {
                            name: 'OrderDetail',
                            passProps: {
                                dataUser: data,
                                dataOrder: Order.orderDetail
                            },
                            options: {

                                layout: {
                                    backgroundColor: '#00000080'
                                }
                            }
                        }
                    });
                    // alert(JSON.stringify(data))
                    // this.props.navigator.showLightBox({
                    //     screen: "OrderDetail", // unique ID registered with Navigation.registerScreen
                    //     passProps: {
                    //         dataUser: data,
                    //         dataOrder: Order.orderDetail
                    //     }, // simple serializable object that will pass as props to the lightbox (optional)
                    //     style: {
                    //         backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                    //         backgroundColor: "#00000080", // tint color for the background, you can specify alpha here (optional)
                    //         tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
                    //     },
                    //     // adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
                    // });

                } else {
                    SimpleToast.show('Lỗi kết nối xin thử lại')
                }
            })
        })
    }

    btnFinish = () => {
        // this.props.Home.setScreenType(screenId.HOME.screenType.listOrder)
        let { Home, Order, User } = this.props;
        let { active } = this.state;
        let item = Order.orderDetail
        let jsonFinish = { orderId: item.id }
        this.setState({
            loadding: true
        })
        if (item.status === 5) {
            PostWithToken(api.ORDER.finish, jsonFinish, User.access_token, (data, status) => {
                console.log(data, "data test");
                this.setState({
                    loadding: false
                })
                if (status) {
                    if (data.ResponseCode) {
                        // this.props.navigator.popToRoot({
                        //     animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                        //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                        // });
                        Navigation.popToRoot(this.props.componentId);
                        Order.setItemDetail(null)

                    } else {
                        Toast(data.ResponseText)
                    }
                } else {
                    Toast('Lỗi kết nối')
                }
            })
        } else {
            PostWithToken(api.ORDER.goCar, jsonFinish, User.access_token, (data, status) => {
                this.setState({
                    loadding: false
                })
                if (status) {
                    if (data.ResponseCode) {
                        item.status = 5;
                        // this.setState({
                        //     active: 2
                        // })
                    } else {
                        Toast(data.ResponseText)
                    }
                } else {
                    Toast('Lỗi kết nối')
                }
            })

        }


    }
    onClickCancel = () => {
        this.setState({
            conformCancelOrder: true
        })
    }
    onDissmissConform = () => {
        this.setState({
            conformCancelOrder: false
        })
    }
    btnCancel = () => {
        let { Home, Order, User } = this.props;
        let item = Order.orderDetail
        let jsonFinish = { orderId: item.id }
        // alert('sss')
        console.log("itemmm", JSON.stringify(item))
        this.setState({
            loadding: true
        })
        PostWithToken(api.ORDER.cancel, jsonFinish, User.access_token, (data, status) => {

            this.setState({
                loadding: false
            })
            if (status) {
                if (data.ResponseCode) {
                    // this.props.navigator.popToRoot({
                    //     animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                    //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                    // });
                    Navigation.popToRoot(this.props.componentId);
                    Order.setItemDetail(null);
                    this.getOrder()
                } else {
                    Toast(data.ResponseText)
                }
            } else {
                Toast('Lỗi kết nối')
            }
        })
    }
    getOrder = () => {
        let { Order, User, Home } = this.props
        if (Home.markerMe.latitude && Home.markerMe.longitude) {
            Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [], User.userInfo.id)
            console.log(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, "hihi3 1")
        } else {
            Home.getCurrentPosition(User.access_token, status => {
                if (status) {
                    Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [], User.userInfo.id)
                    console.log(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, "hihi3 2")
                } else {
                    this.getOrder()
                }
            })
        }
    }
    onClickBack = () => {
        // this.props.navigator.pop({
        //     animated: true, // does the pop have transition animation or does it happen immediately (optional)
        //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
        // });
        Navigation.pop(this.props.componentId);
    }
    render() {
        let { Home, Order } = this.props;
        let { active } = this.state;
        let item = Order.orderDetail
        console.log("active kaka", item)
        return (
            item &&
            <View style={{ flex: 1, width: '100%' }}>
                {/* <NavBarCustomBtnBack
                    onPress={this.btnFinish}
                    title=''
                    leftButton={require('../../assets/images/arrow-back.png')}
                    colorBtn={color.primaryColor}
                    backgroundColor={'white'}
                /> */}
                <View style={styles.container}>
                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24, color: color.textNormal, alignSelf: 'flex-start', fontWeight: '300' }}>Thanh toán</Text>
                        <TouchableOpacity onPress={this._onClickShowDetail}>
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={require('../../assets/images/ic_question.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                            <View style={{ paddingLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/receipt.png')} />
                                <Text style={{ marginLeft: 20, fontSize: 15, color: 'black' }}>Giá cước : </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{numeral(item.price).format('0,0')}</Text>
                                <Text style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>đ</Text>
                            </View>
                        </View>
                        {
                            item.serviceAttach.length > 0 &&
                            item.serviceAttach.map((v, k) => {
                                return (
                                    <View key={k}>
                                        <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, borderBottomColor: color.colorLine, borderBottomWidth: 1, paddingTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image style={{ height: 16, width: 15, resizeMode: 'contain', tintColor: '#e72f4c' }} source={require('../../assets/images/library-add.png')} />
                                                <Text style={{ marginLeft: 20, fontSize: 15, color: 'black' }}>{v.name} : </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                <Text style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>{numeral(v.price).format('0,0')}</Text>
                                                <Text style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.65)', fontWeight: 'bold' }}>đ</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })

                        }
                        <View style={{ paddingLeft: 12, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, color: '#c0392b', fontWeight: 'bold' }}>TỔNG CỘNG : </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ fontSize: 16, color: '#c0392b', fontWeight: 'bold' }}>{item.total ? numeral(item.total).format('0,0') : 0}</Text>
                                <Text style={{ fontSize: 12, color: '#c0392b', fontWeight: 'bold' }}>đ</Text>
                            </View>
                        </View>
                    </View>
                    {item.status == 5 ? (
                        <React.Fragment>
                            <View style={{ width: '100%', marginBottom: 20, marginTop: 20 }}>
                                <ViewShadow
                                    onPress={this.btnFinish}
                                    backgroundColor={color.primaryColor}
                                    shadowColor={color.primaryColor}
                                    colorText={'white'}
                                    textTitle={'HOÀN THÀNH'}
                                />
                            </View>
                            <View style={{ width: '100%', marginBottom: 20, }}>
                                <ViewShadow
                                    onPress={this.onClickCancel}
                                    backgroundColor={'grey'}
                                    shadowColor={'grey'}
                                    colorText={'white'}
                                    textTitle={'HỦY CHUYẾN'}
                                />
                            </View>
                        </React.Fragment>
                    ) : (
                            <View style={{ width: '100%', marginBottom: 20, marginTop: 20 }}>
                                <ViewShadow
                                    onPress={this.btnFinish}
                                    backgroundColor={color.primaryColor}
                                    shadowColor={color.primaryColor}
                                    colorText={'white'}
                                    textTitle={'LÊN XE'}
                                />
                            </View>
                        )}

                    {/* <TouchableOpacity style={[styles.btnConfirm, styles.shadowBtnFinish]}
    onPress={this.btnFinish}>
    <Text style={{ fontSize: 16, color: 'white', paddingVertical: 14 }}>HOÀN THÀNH</Text>
</TouchableOpacity> */}
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
                {
                    this.state.conformCancelOrder ?
                        <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: '#00000070' }}>
                            <TouchableOpacity activeOpacity={1}
                                style={{
                                    flex: 1, width: values.deviceWidth, paddingHorizontal: 20, backgroundColor: 'transparent',
                                    justifyContent: 'center', alignItems: 'center',
                                }}>
                                <View style={{ width: '100%', backgroundColor: '#E7E7E7', borderRadius: 12, }}>
                                    <Text style={{
                                        width: '100%', color: '#030303', fontSize: 16, fontWeight: 'normal',
                                        textAlign: 'center', paddingTop: 20, paddingBottom: 10, paddingHorizontal: 20,
                                    }}>{'Hủy chuyến'}</Text>
                                    <Text style={{
                                        width: '100%', color: 'rgba(0, 0, 0, 0.45)', fontSize: 13,
                                        fontWeight: 'normal', textAlign: 'center', paddingHorizontal: 15,
                                        marginBottom: 10
                                    }}>{'Bạn có chắc chắn hủy chuyến này không ?'}</Text>

                                    <View style={{ width: '100%', flexDirection: 'row', backgroundColor: 'transparent', borderTopColor: color.borderColor_gray, borderTopWidth: 0.5 }}>
                                        <TouchableOpacity onPress={this.onDissmissConform} activeOpacity={0.7} style={{ flex: 1, paddingVertical: 12, alignItems: 'center', justifyContent: 'center', borderRightColor: color.borderColor_gray, borderRightWidth: 0.5, }}>
                                            <Text style={{ fontSize: 17, fontWeight: 'normal', textAlign: 'center', color: color.primaryColor }}>{'Hủy'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.btnCancel} activeOpacity={0.7} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                                            <Text style={{ fontSize: 17, fontWeight: 'normal', textAlign: 'center', color: color.primaryColor }}>{'Chắc chắn'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity >
                        </View>
                        :
                        null
                }

            </View>

        );
    }
}
const styles = StyleSheet.create({
    btnConfirm: { marginTop: 10, marginBottom: 20, width: '100%', borderRadius: 42 / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primaryColor, alignSelf: 'center', },
    shadowBtnFinish:
        values.platform == 'ios' ? {
            shadowColor: color.btnFinishOrder,
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.65,
            shadowRadius: 7,
        }
            :
            { elevation: 5 },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        paddingTop: values.marginTopScreen + 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'white',
    }
});
export default FinishOrder