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
    RefreshControl,
    ScrollView
} from 'react-native';
import ListOrderFlatListItem from './ListOrderFlatListItem'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import NoData from '../../../component/NoData'
import { color } from '../../../config'
import { Navigation } from 'react-native-navigation';

@inject('Order', 'Home', 'User')
@observer
class ListOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            refreshing: false
        };
    };
    onClickConfirm = (item) => {
        // this.props.Home.setStatusApp(1)
        this.props.Order.setItemDetail(item)
        console.log(item,"item hihi");
        // console.log('item: ' + JSON.stringify(item))
        // getPositionListDirection(EnterAddress.startAddress, EnterAddress.endAddress, (data, status) => {
        //     if (status) {
        //         Home.setListCoords(data);
        //     } else {
        //     }
        // })

        // alert(JSON.stringify(item))
        
        // this.props.navigator.push({
        //     screen: 'ConfirmOrder', // unique ID registered with Navigation.registerScreen
        //     animated: true, // does the push have transition animation or does it happen immediately (optional)
        //     animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
        // });
          Navigation.push(this.props.componentId, {
            component: {
              name: 'ConfirmOrder',
              options: {
                topBar: {
                    visible:false
                }
              }
            }
          });
          
    }
    componentWillMount() {
        let { Order, Home, User } = this.props

        if (Home.markerMe.latitude && Home.markerMe.longitude) {
            console.log("MACKERRRRRRRRRRRRRR", JSON.stringify(Home.markerMe))
            Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [],User.userInfo.id)
        }

        if (Home.markerMe.latitude && Home.markerMe.longitude) {
            Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [],User.userInfo.id)
        }


    }

    onRefresh = () => {
        let { Order, User, Home } = this.props
        this.setState({ refreshing: true }, () => {

            if (Home.markerMe.latitude && Home.markerMe.longitude) {
                Order.getListOrder(User.access_token, Home.markerMe.latitude, Home.markerMe.longitude, [],User.userInfo.id, (status) => {
                    this.setState({ refreshing: false })
                })
                this.setState({ refreshing: false })
            } else {
                this.setState({ refreshing: false })
            }
        })
    }

    renderItem = ({ item, index }) => {
        return (
            <ListOrderFlatListItem item={item} index={index} onClickConfirm={this.onClickConfirm} />
        );
    }
    render() {
        // console.log(toJS(this.props.Order.data),"order data");
        return (
            <FlatList
                style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
                data={toJS(this.props.Order.data)}
                keyExtractor={(item, index) => index + ""}
                renderItem={this.renderItem}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                ListEmptyComponent={
                    <NoData
                        title='Đơn hàng'
                        tintColor={color.primaryColor}
                        imageSource={require('../../../assets/images/description.png')}
                        title='Hiện bạn chưa có đơn nào.'
                    />
                }
            // ListFooterComponent={
            //     toJS(this.props.Order.data).length > 0 ?
            //         < View
            //             style={{ height: 100, width: '100%', backgroundColor: 'white' }}
            //         />
            //         :
            //         <NoData
            //             title='Đơn hàng'
            //             tintColor={color.primaryColor}
            //             imageSource={require('../../../assets/images/description.png')}
            //             title='Hiện bạn chưa có đơn nào.'
            //         />

            // }
            />
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',

    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20
    }
});

export default ListOrder;