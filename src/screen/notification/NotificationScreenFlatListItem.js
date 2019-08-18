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
import moment from 'moment'
import { values } from '../../config';
import { api } from '../../config';

class NotificationScreenFlatListItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onItemPressed = this.onItemPressed.bind(this);
    };

    onItemPressed(item, index) {
        //Pressed json item
        //Do something with that item
        this.props.onClickNotif(item, index)
    };

    render() {
        const { item, index } = this.props;
        let widthAvatar = values.deviceWidth / 7
        return (
            <TouchableOpacity onPress={() => this.onItemPressed(item, index)}
                style={[{
                    width: '100%', alignSelf: 'center', paddingHorizontal: 15,
                    justifyContent: 'center', alignItems: 'center', marginTop: 15
                },]}>
                <View
                    style={[{
                        width: '100%', paddingHorizontal: 10, paddingVertical: 15,
                        borderRadius: 12, width: '100%', flexDirection: 'row'
                    },
                    !item.status ? [{ backgroundColor: '#f1f3f7' }, styles.shadowSeen] : [{ backgroundColor: 'white' }, styles.shadow],

                    ]}>
                    <View style={{ width: widthAvatar }}>
                        <View style={{
                            width: widthAvatar, height: widthAvatar, borderRadius: widthAvatar / 2,
                            justifyContent: 'center', backgroundColor: 'white', alignItems: 'center',
                            borderWidth: 0.5, borderColor: '#dedede',overflow:'hidden'
                        }}>
                            <Image style={styles.image} source={
                                item.image
                                    ?
                                    { uri: api.domain + "/" + item.image }
                                    :
                                    require('../../assets/images/account-circle.png')
                            } />
                        </View>
                    </View>
                    <View style={{
                        flex: 1, paddingLeft: 10, height: widthAvatar + 15, justifyContent: 'space-between',
                        backgroundColor: 'transparent'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Text numberOfLines={2} style={[{ fontSize: 14, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.85)', flex: 1, },
                            !item.status ? { fontWeight: 'bold', } : { fontWeight: 'normal', }]}>
                                {item.content}
                            </Text>
                        </View>

                        <Text style={{ fontSize: 12, fontStyle: 'italic', fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.45)', marginTop: 10 }}>
                            {moment(item.createdAt).format('HH:mm, DD/MM/YYYY')}
                        </Text>
                    </View>
                </View >
            </TouchableOpacity >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    image: {
        height: 55,
        width: 55,
        borderRadius: 55 / 2
    },
    shadowSeen:
        values.platform == 'ios' ? {
            shadowColor: 'gray',
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.65,
            shadowRadius: 3,
        }
            :
            { elevation: 2, marginBottom: 3, },
    shadow:
        values.platform == 'ios' ? {
            shadowColor: 'gray',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
        }
            :
            { elevation: 2, marginBottom: 3, },
});
export default NotificationScreenFlatListItem;