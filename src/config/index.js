//var DeviceInfo = require("react-native-device-info");
import {
    Platform
} from "react-native";
import api from '../api/api'
import color from "./color";
import values from './values'
import mapStyle from './mapStyle'
const api_key_google = 'AIzaSyDFo25Iifbmcf3TzTmOF6IR5adrQw4tY7o';
let config = {}
const status_api_google = { ZERO_RESULTS: 'ZERO_RESULTS', OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT', OK: 'OK' }
config.app_version = '0.0.1'
//  (values.platform == 'ios') ? 'AIzaSyDMtklmYyNLzRxZ4IX44DeqS87m8Zy4sao' : 'AIzaSyBGx9LQtZEdhDkm2JhA0coeiOws268T_Ts';
const screenType = { start: 0, chooseCar: 1, findCar: 2, carIsComming: 3, complete: 4, }
function checkPhone(phone) {
    let test = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/
    return test.test(phone)
}
export {
    api,
    color,
    screenType,
    values,
    config,
    api_key_google,
    mapStyle,
    checkPhone
}

