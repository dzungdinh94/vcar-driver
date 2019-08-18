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
let listCoordsBK = null
class Map {

    @observable listCoords = null;
    @observable listCoordsAnimation = null;
    @observable step = 1;
    @observable indexArray = 0;
    @observable rotateMarkerDirect = 0;
    @observable coordDirection = { "latitude": 21.027180, "longitude": 105.835793 };

    @action
    setListCoords(coords) {
        this.listCoords = coords;
        this.listCoordsAnimation = coords;
        listCoordsBK = coords;
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

}

export default new Map();
