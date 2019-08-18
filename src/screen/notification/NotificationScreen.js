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
    StatusBar,
    RefreshControl,
    BackHandler
} from 'react-native';
import NotificationScreenFlatListItem from './NotificationScreenFlatListItem'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx';
import { color, api } from '../../config';
import screenId from '../../config/screenId';
import NavBarCustom from '../../component/NavBarCustom';
import { PostWithToken } from '../../config/request';
import NoData from '../../component/NoData'
import { Navigation } from 'react-native-navigation';

@inject('Home', 'OnApp', 'User')
@observer
class NotificationScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            refreshing: false,
            loadding: false
        };
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.renderItem = this.renderItem.bind(this);
    };
    onRefresh = () => {
        let { OnApp, Home, User } = this.props;
        this.setState({
            refreshing: true,
            page: 1
        }, () => {
            Home.getAllNotifi(User.access_token, [], 1, (status) => {
                this.setState({
                    refreshing: false
                })
            })
        })
    }
    onToggleDrawer = () => {
        
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
              left: {
                visible: true
              }
            }
          });
    }

    componentWillMount() {
        let { OnApp, Home, User } = this.props;
        OnApp.screenCurrent = screenId.MENU.screenType.notification;
        console.log("OnApp.dataNoti", OnApp.dataNoti)
        // Đọc thông báo
        if(OnApp.dataNoti){
            PostWithToken(api.NOTIFICATION.read, { "notiId":OnApp.dataNoti && OnApp.dataNoti.id }, User.access_token, (data, status) => {
                User.getCountNotif()
            })
            
            // this.props.navigator.showModal({
            //     screen: 'NotificaionDetailScreen',
            //     passProps: { title:OnApp.dataNoti && OnApp.dataNoti.title, url:OnApp.dataNoti && OnApp.dataNoti.url }
            // });
            Navigation.showModal({
                stack: {
                  children: [{
                    component: {
                      name: 'NotificaionDetailScreen',
                      passProps: { title:OnApp.dataNoti && OnApp.dataNoti.title, url:OnApp.dataNoti && OnApp.dataNoti.url },
                      options: {
                        topBar: {
                          visible:false
                        }
                      }
                    }
                  }]
                }
              });
        }
        
        Home.getAllNotifi(User.access_token, [], this.state.page)
        OnApp.setDataNoti(null)


    }

    onClickNotif = (item, index) => {
        let { OnApp, Home, User } = this.props;
        // Đọc thông báo
        PostWithToken(api.NOTIFICATION.read, { "notiId": item.id }, User.access_token, (data, status) => {
            // alert(JSON.stringify(data))
            User.getCountNotif()
        })
        // this.props.navigator.showModal({
        //     screen: 'NotificaionDetailScreen',
        //     passProps: { title: item.title, url: item.url }
        // });
        Navigation.showModal({
            stack: {
              children: [{
                component: {
                  name: 'NotificaionDetailScreen',
                  passProps:{ title: item.title, url: item.url },
                  options: {
                    topBar: {
                      visible:false
                    }
                  }
                }
              }]
            }
          });
        this.props.Home.seenNotif(index)
        OnApp.screenCurrent = screenId.NOTIFICATION.screenType.detail
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    onLoadMore = () => {
        let { OnApp, Home, User } = this.props;
        let page = this.state.page
        if (!this.state.loadding) {
            this.setState({ loadding: true }, () => {
                Home.getAllNotifi(User.access_token, Home.dataNotif, page + 1, (status) => {
                    if (status) {
                        this.setState({
                            loadding: false,
                            page: page + 1
                        })
                    } else {
                        this.setState({
                            loadding: false
                        })
                    }

                })
            })
        }
    }

    renderItem({ item, index }) {
        return (
            <NotificationScreenFlatListItem item={item} index={index} onClickNotif={this.onClickNotif} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBarCustom
                    onPress={this.onToggleDrawer}
                    title='Thông báo'
                />
                {/* <StatusBar barStyle='light-content' translucent /> */}


                <FlatList
                    style={{ flex: 1, width: '100%', paddingVertical: 10, }}
                    data={toJS(this.props.Home.dataNotif)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.onLoadMore}
                    ListEmptyComponent={
                        <NoData
                            title='Thông báo'
                            tintColor={color.primaryColor}
                            imageSource={require('../../assets/images/icon_Notification.png')}
                            title='Hiện bạn chưa có thông báo nào.'
                        />
                    }
                // ListFooterComponent={
                //     toJS(this.props.Order.data).length > 0 ?
                //         < View
                //             style={{ height: 100, width: '100%', backgroundColor: 'white' }}
                //         />
                //         :
                //         <NoData
                //             title='Thông báo'
                //             tintColor={color.primaryColor}
                //             imageSource={require('../../assets/images/icon_Notification.png')}
                //             title='Hiện bạn chưa có thông báo nào.'
                //         />
                // }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default NotificationScreen;