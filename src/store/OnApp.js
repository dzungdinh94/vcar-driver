import React, { Component } from "react";
import {
    AsyncStorage,
} from "react-native";
import { observable, action } from "mobx";
import {
    config,
    values,
    api,
} from "../config";
import _ from 'lodash'
import async from 'async';
import SimpleToast from "react-native-simple-toast";
import moment from 'moment'

const status = { success: 'success', fail: 'fail' }
class OnApp {
    @observable isConnect = false;
    //Trạng thái luồng ứng dụng; đang ở màn nào
    @observable screenCurrent = null;
    @observable numberOfNotification = 99;
    @observable dataNoti = null;
    @action setDataNoti(dataNoti) {
        this.dataNoti = dataNoti
        console.log("setDataNoti",dataNoti)
    }
}

export default new OnApp();
