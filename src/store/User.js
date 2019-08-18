
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { observable, action } from "mobx";
import { PostNoToken, GetWithToken, PostWithToken } from '../config/request';
import { api } from '../config';
import { Toast } from '../utils/Func';
// import SimpleToast from "react-native-simple-toast";

const status = { success: 'success', fail: 'fail' }
class User {
  @observable access_token = '';
  @observable fcm = '';
  @observable userInfo = {};
  @observable isTheFirst = false;
  @observable isLogin = false;
  @observable rootNavigator = null;
  @observable typeCareTemple = { id: 0, name: 'Xe ba gác', image: require('../assets/images/ic_takePhoto.png') }

  @observable countNoti = 0
  @action setTypeCareTemple(item) {
    this.typeCareTemple = item
  }
  @action setUserInfo(data) {
    this.userInfo = data
  }
  @action setToken(token) {
    this.access_token = token
  }
  @action setAvatar(avatar) {
    this.userInfo.avatar = avatar
  }
  @action setFcm(fcm) {
    this.fcm = fcm
  }

  @action signin(fullname, phoneNumber, typeCarId, numberCar, password, avatar,nameCar, cb) {
    let dataSignin = {
      "phone": phoneNumber,
      "password": password,
      "fullname": fullname,
      "numberCar": numberCar,
      "typeCarId": typeCarId,
      "avatar": avatar,
      "nameCar":nameCar
    }
    // console.log(dataSignin)
    PostNoToken(api.signin, dataSignin, (data, status) => {
      if (status) {
        if (data.ResponseCode) {
          console.log("data Signnnn")
          console.log(JSON.stringify(data))

          Toast('Hệ thống đã ghi nhận thông tin của bạn!')
          setTimeout(() => {
            cb(true)
          }, 700);
        } else {
          cb(false)
          console.log(data.ResponseText,"hihi5");
          Toast(data.ResponseText)
        }
      } else {
        cb(false)
        Toast('Lỗi kết nối')
        console.log('err_signin')
        console.log(JSON.stringify(data))
      }
    })
  }

  @action getCountNotif() {

    PostWithToken(api.NOTIFICATION.count, {}, this.access_token, (data, status) => {

      if (status) {
        if (data.ResponseCode) {
          this.countNoti = data.data.total


        } else {
          console.log("Errrr", data)
        }
      } else {
        console.log("Errrr", data)
      }
    })
  }
}

export default new User();
