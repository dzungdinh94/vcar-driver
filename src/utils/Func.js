import React, { Component } from "react";
import _ from 'lodash'
import polyline from '@mapbox/polyline';
import { ImageBackground, View, StatusBar, Image, Alert, Platform } from "react-native";
import Permissions from 'react-native-permissions'
import SimpleToast from 'react-native-simple-toast'
import { values, api_key_google, config, } from "../config";
import { GetNoToken, GetWithToken } from '../config/request'
export const clog = (message, data) => {
    console.log(`${message}: ` + JSON.stringify(data));
};
export function Toast(txt) {
    SimpleToast.show(txt)
}
export function checkPhoneNumber(phoneNumber) {
    const textRegex = /(09|01[2|6|8|9])+([0-9]{8})\b/g
    if (textRegex.test(phoneNumber)) {
        return true
    } else {
        return false
    }
};
export function checkPhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    console.log('phonephonephonephone: ' + (phone + '').length)
    if ((phone + '').length == 10 || (phone + '').length == 11) {
        return re.test(phone)
    } else {
        return false;
    }
};

export function _alertForPhotosAndCameraPermission(title, messeage) {
    if (values.platform === 'ios') {
        Alert.alert(title, messeage,
            [
                {
                    // text: 'No way',
                    text: 'Từ chối',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                {
                    text: 'Mở Cài Đặt',
                    //  text: 'Open Settings',
                    onPress: Permissions.openSettings
                }//vao setting xin quyen
                ,],
        )
    } else {
        SimpleToast.show('Ứng dụng chưa được cấp quyền truy cập vào thiết bị của bạn !');
    }
}


export function getAddressFromLatlng(latitude, longitude, callback) {
    // http://maps.googleapis.com/maps/api/geocode/json?latlng=21.100147,105.887545&sensor=true&key=
    GetNoToken("https://maps.googleapis.com/maps/api/geocode/json?latlng="
        + latitude + "," + longitude
        + "&sensor=true"
        // +"&key=" + api_key_google
        ,
        (data, status) => {
            console.log('--: ' + "https://maps.googleapis.com/maps/api/geocode/json?latlng="
                + latitude + "," + longitude
                + "&sensor=true"
                // +"&key=" + api_key_google
            )
            // console.log('Dữ liệu gợi ý địa chỉ: ' + JSON.stringify(data))
            if (status) {
                if (data.status == 'OK') {
                    callback(data.results, true)
                } else if (data.status == 'ZERO_RESULTS') {
                    callback([], true)
                } else {
                    // alert('0')
                    callback(data.status, false)
                }
            } else {
                SimpleToast.show('Lỗi kết nối!')
                callback('Lỗi kết nối!', false)
            }
        })
}

export function getLocationFromPlaceId(placeId, callback) {
    let error = 'Có lỗi xảy ra!'
    if (placeId) {
        GetNoToken(urlGetLocationFromPlaceId(api_key_google, placeId), (data, status) => {
            console.log('urlGetLocationFromPlaceId: ' + JSON.stringify(data))
            if (status) {
                if (data && data.status && data.status == 'OK') {
                    callback(data, true)
                } else {
                    callback(error, false)
                }
            } else {
                callback(error, false)
            }
        })
    }
};

export function getSuggestAddress(text, callback) {
    GetNoToken(getListSuggestAddress(api_key_google, text), (data, status) => {
        console.log('------- ======== ========--goi y: ======== ======== ======== getSuggestAddress: ' + JSON.stringify(data))
        if (status) {
            if (data.status == 'OK') {
                callback(data.predictions, true)
            } else if (data.status == 'ZERO_RESULTS') {
                callback([], true)
            } else if (data.status == 'OVER_QUERY_LIMIT') {
                callback([], true)
            } else {
                callback(data.status, false)
            }
        } else {
            SimpleToast.show('Lỗi kết nối!')
            callback('Lỗi kết nối!', false)
        }
    })
};

export function radToDeg(rad) {
    return parseFloat((180 * rad) / Math.PI);
}
export function getDegree(startPoint, endPoint) {
    let data = Math.atan2(endPoint.longitude - startPoint.longitude, endPoint.latitude - startPoint.latitude);
    let dt = (radToDeg(data + Math.PI / 2))
    if (dt < 0) {
        dt += 360;
    }
    console.log('dt: ' + dt)
    return dt;
}


export function getLinkDirectionsLine(startLocation, destinationLocation) {
    // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
    // api trả ra danh sách toạ độ để chỉ đường gữa 2 điểm
    return `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation}&destination=${destinationLocation}&key=${api_key_google}`
}
export function urlGetLocationFromPlaceId(key_api_map, placeid) {
    return "https://maps.googleapis.com/maps/api/place/details/json?key=" + key_api_map + "&placeid=" + placeid + "&language=vi"
}
export function getListSuggestAddress(api_key_map, text) {
    let type = 'json';//loai output tra ve
    {
        console.log("https://maps.googleapis.com/maps/api/place/autocomplete/"
            + type
            + "?input=" + text
            + "&types=geocode"
            + "&language=vi"
            + "&components=country:vn|"
            + ""
            + "&key=" + api_key_map)
    }
    return "https://maps.googleapis.com/maps/api/place/autocomplete/"
        + type
        + "?input=" + text
        + "&types=geocode"
        + "&language=vi"
        + "&components=country:vn|"
        + ""
        + "&key=" + api_key_map;
}

export function getPositionListDirection(fromLatlng, toLatlng, callback) {
    var self = this;
    // https://maps.googleapis.com/maps/api/directions/json?origin=10.883139,106.629758&destination=10.880002,106.619522
    // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
    let isFirst = true;
    console.log('link: ' + `https://maps.googleapis.com/maps/api/directions/json?` +
        `origin=` + fromLatlng.latitude + ',' + fromLatlng.longitude +
        `&destination=` +
        toLatlng.latitude + ',' + toLatlng.longitude + '&key=' + api_key_google)
    fetch(`https://maps.googleapis.com/maps/api/directions/json?` +
        `origin=` + fromLatlng.latitude + ',' + fromLatlng.longitude +
        `&destination=` +
        toLatlng.latitude + ',' + toLatlng.longitude + '&key=' + api_key_google, {
            method: "GET",
            timeout: 20 * 1000,
        })
        .then(function (response) {
            // console.log(response)
            if (response.status == 200) {
                return response.json()
            } else {
                console.log('An error occurred: ' + response.status + ' getPositionListDirection')
                SimpleToast.show('An error occurred: ' + response.status)
            }
        })
        .then(json => {
            console.log('~~~~~~~````getPointing```~~~ ' + JSON.stringify(json))
            if (json && json.routes[0]) {
                let points = polyline.decode(json.routes[0].overview_polyline.points);
                if (points.length > 0) { // neu co chi dg
                    let coords = points.map((point, index) => {
                        return {
                            latitude: point[0],
                            longitude: point[1]
                        }
                    })
                    // console.log('coords: ' + JSON.stringify(coords))
                    callback(coords, 1, true)
                } else { // k thay chi dg
                    callback([], 1, false)
                    console.log('01: fromLatlng: ' + JSON.stringify(fromLatlng) + ' toLatlng: ' + JSON.stringify(toLatlng))
                    console.log('No path found from Google Map!')
                }
            } else {
                callback([], 2, false)
                console.log('02: fromLatlng: ' + JSON.stringify(fromLatlng) + ' toLatlng: ' + JSON.stringify(toLatlng))
                console.log('No path found from Google Map.An error occurred.')
            }
        })
        .catch(error => {
            callback([], 3, false)
            // SimpleToast.show(error)
            // console.log(error)
        });
}
