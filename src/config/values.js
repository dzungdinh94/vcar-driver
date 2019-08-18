import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
    platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
const isAPILest21 =
    platform === 'android' && Platform.Version < 21;
const aspectRatio = deviceHeight / deviceWidth;
const deviceIsIphone = aspectRatio > 1.6 ? true : false;

//for map

// const ASPECT_RATIO = width / height;
let LATITUDE = 0;
let LONGITUDE = 0;
let LATITUDE_DELTA = 0.01;
let LONGITUDE_DELTA = LATITUDE_DELTA * aspectRatio;
// let LONGITUDE_DELTA = 0.01;
let POSITION_DEFAULT = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
};
let MARKER_ME_DEFAULT = {
    latitude: LATITUDE,
    longitude: LONGITUDE
}

const addressDefault = { latitude: 0, longitude: 0, title: '' };
const values = {
    addressDefault,
    typeAddress: { startAddress: 0, endAddress: 1 },
    status: { account: '0', changePassword: '1' },
    platform, isIphoneX, deviceIsIphone, isAPILest21,
    deviceHeight, deviceWidth, aspectRatio,
    LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA, POSITION_DEFAULT, MARKER_ME_DEFAULT,
    status_bar_height_android: 24,
    contentToolbarHeight: platform === "ios" ? 44 : 44,
    toolbar: 45,
    marginTopScreen: platform === "ios" ? (isIphoneX ? 35 : 20) : 24,
    toolbarHeight: platform === "ios" ? (isIphoneX ? 74 : 64) : (isAPILest21 ? 44 : 60),//56

    borderRadiusButtonLogin: 3.5,
    activeOpacity: 0.7,
    fontSizeNormal: 14,
    marginHeader: 13,
    minZoomLevel: 8,
    maxZoomLevel: 20,
    widthButton: 45,
    navBarTextFontSize: 20,
    widthCar: 45,

};
export default values