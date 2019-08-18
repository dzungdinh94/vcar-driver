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
    RefreshControl
} from 'react-native';
import { toJS } from 'mobx'
import moment from 'moment'
import { observer, inject } from 'mobx-react'
import HistoryTransactionScreenFlatListItem from './HistoryTransactionScreenFlatListItem'
import { color, api } from '../../config';
import screenId from '../../config/screenId';
import NavBarCustom from '../../component/NavBarCustom';
import { PostWithToken } from '../../config/request';
import NoData from '../../component/NoData'
import { Navigation } from 'react-native-navigation';

@inject('Transaction', 'OnApp', 'User', 'Transaction')
@observer
class HistoryTransactionScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true,
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

    componentWillMount() {
        let { OnApp, User, Transaction } = this.props;
        OnApp.screenCurrent = screenId.MENU.screenType.history;
        Transaction.getHistory(User.access_token, this.state.page, [])
    }
    onPress = () => {
        this.setState({
            refreshing: true,
            page: 1
        }, () => {
            Transaction.getHistory(User.access_token, 1, [], (status) => {
                this.setState({ refreshing: false })
            })
        })
    }
    onLoadMore = () => {
        let { Home, User, Transaction } = this.props;
        let page = this.state.page
        if (!this.state.loadding) {
            this.setState({ loadding: true }, () => {
                Transaction.getHistory(User.access_token, page + 1, [], (status) => {
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
    onClickTransaction = (item) => {
        // alert('ss')
        // this.props.navigator.push({
        //     screen: 'HistoryTransactionDetailScreen',
        //     title: "Chi tiết lịch sử",
        //     passProps: { id: item.id }
        // });
    }

    renderItem({ item, index }) {
        return (
            <HistoryTransactionScreenFlatListItem
                length={this.props.Transaction.transaction.length}
                index={index}
                item={item} onClickTransaction={this.onClickTransaction} />
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <NavBarCustom
                    onPress={this.onToggleDrawer}
                    title='Lịch sử giao dịch'
                />
                {/* <StatusBar barStyle='light-content' translucent /> */}

                <FlatList
                    style={{ width: '100%', paddingVertical: 10, }}
                    data={toJS(this.props.Transaction.transaction)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={this.onLoadMore}
                    ListEmptyComponent={
                        <NoData
                            title='Lịch sử đơn hàng'
                            tintColor={color.primaryColor}
                            imageSource={require('../../assets/images/icon_Notification.png')}
                            title='Hiện bạn chưa có đơn nào.'
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
    }
});
export default HistoryTransactionScreen;