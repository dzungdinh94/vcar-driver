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

class SuggestAddressFlatListItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onItemPressed = this.onItemPressed.bind(this);
    };

    onItemPressed(e) {
        //Pressed json item
        const pressedItem = this.props.item;
        //Do something with that item
        // Alert.alert(pressedItem.title);
    };

    render() {
        const item = this.props.item;
        return (
            <TouchableOpacity onPress={this.onItemPressed}
                style={{
                    flex: 1, height: 50,
                    borderBottomColor: '#ccc', borderBottomWidth: 0.5,
                    marginBottom: 5, flexDirection: 'row', alignItems: 'center',
                }}>
                <View style={{
                    height: '100%', backgroundColor: 'transparent',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Image style={{
                        height: 20,
                        width: 20,
                        marginRight: 10,
                        resizeMode: 'contain',
                    }} source={require('../../../assets/images/ic_pin.png')} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent', }}>
                    <Text numberOfLines={2} style={{ fontSize: 14, color: 'black', width: '100%', }}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={2} style={{ fontSize: 11, color: 'gray', width: '100%', }}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity >
        )
    }
}

class SuggestAddressView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.renderItem = this.renderItem.bind(this);
    };

    renderItem({ item }) {
        return (
            <SuggestAddressFlatListItem item={item} />
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    style={{ width: '100%', flex: 1, paddingHorizontal: 10,backgroundColor: '#EFEFEF', }}
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItem}
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
        backgroundColor: 'transparent',
    },
    image: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    }
});
export default SuggestAddressView;