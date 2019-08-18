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
class EnterAddress {
  @observable isGetSuggestAddressStart = false;
  @observable isGetSuggestAddressEnd = false;
  // @observable startAddress = { latitude: 0, longitude: 0, title: '' };
  // @observable endAddress = { latitude: 0, longitude: 0, title: '' };
  @observable startAddress = { "latitude": 21.027764, "longitude": 105.83416, "title": "72 Tôn Đức Thắng, Quốc Tử Giám, Đống Đa, Hà Nội, Vietnam" };
  @observable endAddress = { "latitude": 21.027329, "longitude": 105.842604, "title": "114 Hai Bà Trưng, Cửa Nam, Hoàn Kiếm, Hà Nội, Việt Nam" };
  @observable description = '';
  @observable typeAddress = values.typeAddress.startAddress
  //gợi ý khi search vị trí
  @observable listAddress = [];
  @observable listServiceExtra = [
    { id: 'a1', title: 'Bốc xếp (theo số lượng người)', price: 100000, description: 'Chọn dịch vụ này khi khách hàng cần hỗ trợ chuyển hàng hóa. Khách hàng chọn số lượng người hỗ trợ bốc xếp.' },
    { id: 'a2', title: 'Bốc xếp lên lầu', price: 200000, description: 'Chọn dịch vụ này khi khách hàng cần hỗ trợ chuyển hàng hóa lên nhà cao tầng' },
  ]
  @observable serviceExtraSelected = null;

  @action
  onIsGetSuggestAddressStart() {
    this.isGetSuggestAddressStart = true
  }

  @action
  offIsGetSuggestAddressStart() {
    this.isGetSuggestAddressStart = false
  }

  @action
  onIsGetSuggestAddressEnd() {
    this.isGetSuggestAddressEnd = true
  }

  @action
  offIsGetSuggestAddressEnd() {
    this.isGetSuggestAddressEnd = false
  }


  @action
  setStartAddress(latitude, longitude, title) {
    this.startAddress = { latitude: latitude, longitude: longitude, title: title };
  }
  @action
  setEndAddress(latitude, longitude, title) {
    this.endAddress = { latitude: latitude, longitude: longitude, title: title };
  }

  @action
  setEndAddressTitle(title) {
    let endAddress = { latitude: this.endAddress.latitude, longitude: this.endAddress.longitude, title: title };
    this.endAddress = endAddress;
  };

  @action
  setListAddress(data) {
    this.listAddress = data;
  }

  @action
  clearStartAddress() {
    this.startAddress = { latitude: 0, longitude: 0, title: '' };
  }

  @action
  clearEndAddress() {
    this.endAddress = { latitude: 0, longitude: 0, title: '' };
  }

  @action
  clearLissAddress() {
    this.listAddress = []
  }

  @action
  clearDescription() {
    this.description = '';
  }
}

export default new EnterAddress();
