
import React, { Component, Alert } from 'react';
import { AsyncStorage } from 'react-native';
import { observable, action } from "mobx";
import SimpleToast from "react-native-simple-toast";
import { screenType, values } from '../config';
import screenId from '../config/screenId';
import _ from 'lodash'
import { PostWithToken, GetWithToken, GetNoToken } from '../config/request';
import { api } from '../config/index';
import { Toast } from '../utils/Func';
const status = { success: 'success', fail: 'fail' }
class Home {
    // @observable myPosition = (values.POSITION_DEFAULT);
    @observable markerMe = values.MARKER_ME_DEFAULT;
    @observable listCoords = null;

    @observable listAddress = [];
    @observable dataNotif = []
    @observable phone = ''
    //show màn hình chọn xe
    @observable myPosition = (values.POSITION_DEFAULT);
    @observable isShowChooseCar = false;
    @observable isShowVote = false;

    @observable isShowListOrder = false;
    @observable statusApp = 1; // các trạng thái của lái xe 0: Chưa nhận chuyến,1 nhận chuyến, 2 hoàn thành
    @observable isStatusDriver = false;
    @observable screenType = screenId.HOME.screenType.listOrder
    @observable itemTypeCarSelected = null;

    @observable step = 1;
    @observable indexArray = 0;
    @observable rotateMarkerDirect = 0;
    @observable hotline = '';
    @observable linkGuide = '';
    @observable linkTermOfService = '';
    @observable coordDirection = values.MARKER_ME_DEFAULT;//vị trí hiện tại
    @observable listCarAvailable = []

    @action setStatusApp(status) {
        this.statusApp = status
    }
    @action setScreenType(type) {
        this.screenType = type
    }
    @action setStatus(boolean) {
        this.isStatusDriver = boolean
    }
    @action seenNotif(index) {
        this.dataNotif[index].status = 1
    }

    @action
    setListCoords(coords) {
        this.listCoords = coords;
        if (_.size(this.listCoords) > 0) {
            if (_.size(this.listCoords) > 40) {
                this.step = Math.floor(_.size(this.listCoords) / 40);
            }
        }
    }

    @action
    setListCoordsAnimation() {
        this.listCoordsAnimation = listCoordsBK;

    }

    @action
    updateCoordMarkerDirect(coord) {
        this.coordDirection = coord
    }

    @action
    updateRotateCoordMarkerDirect(newRotate) {
        this.rotateMarkerDirect = newRotate - 90;
    }

    @action
    resetPlayBack() {
        this.indexArray = 0;
        this.rotateMarkerDirect = 0;
    }

    @action
    deleteCoordsAnimation() {
        this.listCoordsAnimation.splice(0, this.step);
    }
    @action
    getAllNotifi(token, dataOld, page, callback = null) {
        PostWithToken(api.NOTIFICATION.getall, { page }, token, (data, status) => {
            console.log(data)
            if (status) {
                if (data.ResponseCode && data.data.length > 0) {
                    this.dataNotif = [...dataOld, ...data.data]
                    callback &&
                        callback(true)
                } else {
                    // Toast(data.ResponseText)
                    callback &&
                        callback(false)
                }
            } else {
                console.log(data,"hihi2")
                Toast(data)
                callback &&
                    callback(false)
            }
        })
    }

    @action
    getTypeCar(callback = null) {
        GetNoToken(api.TYPE_CAR.getall, (data, status) => {
            console.log('api.TYPE_CAR.getall ' + api.TYPE_CAR.getall)
            console.log('data: ' + JSON.stringify(data))
            if (status) {
                if (data && _.size(data) > 0) {
                    if (data.ResponseCode == 1 && _.size(data.data) > 0) {
                        this.listCarAvailable = data.data
                        callback && callback(true)
                    } else {
                        callback && callback(false)
                        // SimpleToast.show(data.ResponseText)
                    }
                } else {
                    callback && callback(false)
                    console.log(data.ResponseText,"false hihi")
                    SimpleToast.show(data.ResponseText)
                }
            } else {
                callback && callback(false)
                SimpleToast.show("Lỗi kết nối. Vui lòng kiểm tra lại!")
            }
        })
    }
    @action
    getCurrentPosition(token, callback = null) {
        // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position,"position here");
            let json = {
                "longitude": position.coords.longitude,
                "latitude": position.coords.latitude
            }
            this.myPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: values.LATITUDE_DELTA,
                longitudeDelta: values.LONGITUDE_DELTA,
            }
            this.markerMe = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: values.LATITUDE_DELTA,
                longitudeDelta: values.LONGITUDE_DELTA,
            };
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // console.log('vi tri cua ban: ' + JSON.stringify(position))
            // this.markerMe = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            PostWithToken(api.LOCATION.updatelocation, json, token, (data, status) => {
                if (status) {
                    console.log(data)
                    if (data.ResponseCode) {
                        callback && callback(true)
                        console.log("Updateeeeeeeeeeeeeeeeeeeeeeee", "okokokokokoko")
                    } else {
                        callback && callback(false)
                        // SimpleToast.show(data.ResponseText)
                    }
                } else {
                    callback && callback(false)
                    // SimpleToast.show(data)
                }
            })
        }, error => {
            callback && callback(false)
            // console.log('Không thể lấy được vị trí của bạn.', error)
            Toast.show('Không thể lấy được vị trí của bạn.')
        }, { 
            enableHighAccuracy: false,
            timeout: 20000, 
            maximumAge: 10000 
        })
    };
    @action
    getWatchCurrentPosition(token, callback = null) {
        // console.log("cccccccccccccccccccccccccccc")

        navigator.geolocation.getCurrentPosition((position) => {
            console.log("watchPosition")
            let json = {
                "longitude": position.coords.longitude,
                "latitude": position.coords.latitude
            }
            this.myPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: values.LATITUDE_DELTA,
                longitudeDelta: values.LONGITUDE_DELTA,
            }
            this.markerMe = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: values.LATITUDE_DELTA,
                longitudeDelta: values.LONGITUDE_DELTA,
            };
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // console.log('vi tri cua ban: ' + JSON.stringify(position))
            // this.markerMe = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            // callback(position)
            PostWithToken(api.LOCATION.updatelocation, json, token, (data, status) => {
                if (status) {
                    console.log(data)
                    if (data.ResponseCode) {
                        callback && callback({status:true,position:{latitude: position.coords.latitude,
                            longitude: position.coords.longitude,}})
                      
                    } else {
                        callback && callback(false)
                        // SimpleToast.show(data.ResponseText)
                    }
                } else {
                    callback && callback(false)
                    // SimpleToast.show(data)
                }
            })
        }, error => {
            callback && callback(false)
            // console.log('Không thể lấy được vị trí của bạn.', error)
            // Toast.show('Không thể lấy được vị trí của bạn.')
        }, {
            maximumAge:60000, timeout:5000, enableHighAccuracy:true
         })
    };

    @action
    getAppInfo() {
        GetNoToken(api.getInfoApp, (data, status) => {
            if (status) {
                if (data.ResponseCode) {
                    this.hotline = data.data.hotline
                    this.linkGuide = data.data.linkGuide
                    this.linkTermOfService = data.data.linkTermOfService
                } else {
                    console.log("Errrrr", data)
                }
            } else {
                console.log("Errrrr", data)
            }
        })
    };
}

export default new Home();
