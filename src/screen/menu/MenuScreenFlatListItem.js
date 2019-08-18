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
    Alert
} from 'react-native';
import color from '../../config/color'
import { observer, inject } from 'mobx-react'
import { showLogin } from '../../../App';
import RenderStart from '../../component/RenderStart';
import { values } from '../../config';
import screenId from '../../config/screenId';
import OnApp from '../../store/OnApp';
import User from '../../store/User';


@inject('User', 'OnApp')
@observer
class MenuScreenFlatListItem extends Component {

    constructor(props) {
        super(props);
        this.onItemPressed = this.onItemPressed.bind(this);
    };

    onItemPressed(e) {
        //Pressed json item
        const pressedItem = this.props.item;
        this.props.onClickItemMenu(pressedItem)
    };

    render() {
        let { OnApp, item } = this.props;
        return (
            <TouchableOpacity
                style={{ paddingLeft: 25, paddingRight: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, }}
                onPress={this.onItemPressed}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'
                }}>
                    <Image style={{ width: 25, height: 20, resizeMode: 'contain', tintColor: 'white' }} source={item.img} />
                    <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: '300', color: '#ffffff' }}>{item.title}</Text>
                </View >
                {
                    item.id == screenId.MENU.screenType.notification && parseInt(User.countNoti + '') > 0
                        ?
                        <View style={{
                            backgroundColor: 'white', minWidth: 24, height: 24,
                            borderRadius: 12, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={[{ color: color.primaryColor, fontSize: 14, fontWeight: 'normal' }, User.countNoti > 99 ? { paddingHorizontal: 5 } : {}]}>{User.countNoti}</Text>
                        </View>
                        :
                        null
                }
            </TouchableOpacity>

        )
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
export default MenuScreenFlatListItem;