import axios from 'axios';
import moment from 'moment'
// import RNFetchBlob from 'react-native-fetch-blob'
import api from '../api/api'
import io from 'socket.io-client'
const domain = api.domain
var config={
    socket:null
};
// config.socket=null;
export function PostNoToken(url, json, callback) {
    var instance = axios.create({
        headers: { 'Content-Type': 'application/json' },
        timeout: 20 * 1000,
        baseURL: domain
    });
    instance.post(url, json).then(function (response) {
        callback(response.data, true);
    }).catch(function (error) {
        callback(error, true);
        if (error.response) {
            if (error.response.status === 500) {
                console.log(error)
            }
            if (error.response.status === 404) {
                console.log(error)
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
    // console.log(instance)
}

export function PostWithToken(url, json, token, callback) {
console.log(token,"x-access-token");
    var instance = axios.create({
        headers: { 'x-access-token': token, 'Content-Type': 'application/json; charset=utf-8' },
        timeout: 20 * 1000,
        baseURL: domain
    });
    instance.post(url, json).then(function (response) {
        // console.log(response.data);
        callback(response.data, true);
    }).catch(function (error) {
        callback(error, false);
        if (error.response) {
            if (error.response.status === 500) {
                console.log(error)
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error);
        }
    });
}

export function GetWithToken(url, token, callback) {
    var instance = axios.create({
        headers: { 'x-access-token': token },
        timeout: 20 * 1000,
        baseURL: domain
    });
    instance.get(url).then(function (response) {
        callback(response.data, true);
    }).catch(function (error) {
        console.log("error: " + JSON.stringify(error))
        callback(error, false);
        if (error.response) {
            console.log(error)
            if (error.response.status === 500) {
                console.log(error)
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
}

export function GetNoToken(link, callback) {
    var instance = axios.create({
        timeout: 20 * 1000,
        baseURL: domain
    });
    instance.get(link).then(function (response) {
        callback(response.data, true);
    }).catch(function (error) {
        callback(error.message, false);
    });
}

export function PostWithTokenChat(url, json, token, callback) {
    var instance = axios.create({
        headers: { 'Authorization': 'token=' + token, 'Content-Type': 'application/json' },
        timeout: 20 * 1000,
        baseURL: domain
    });
    instance.post(url, json).then(function (response) {
        // console.log(response.data);
        callback(response.data, true);
    }).catch(function (error) {
        callback(error, false);
        if (error.response) {
            if (error.response.status === 500) {
                console.log(error)
            }
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error);
        }
    });
}
export function UploadImageAxios(url, dataURI, token, callback, cb) {
    //Upload to server
    let data = new FormData();
    // "data:image/png;base64," +
    data.append('files',
        {
            uri: dataURI, type: 'image/jpg',
            name: `IMG_${moment(new Date()).format('YYYYMMDD_HHmmss')}.jpg`
        },
        `IMG_${moment(new Date()).format('YYYYMMDD_HHmmss')}.jpg`
    );
    var instance = axios.create({
        timeout: 20 * 1000,
        baseURL: domain,
        headers: { 'content-type': 'multipart/form-data', 'x-access-token': token },
        onUploadProgress: function (progressEvent) {
            let t = Math.floor(progressEvent.loaded / progressEvent.total * 100)
            cb(t)
        }
    });

    instance.post(url, data).then(function (response) {
        callback(response.data);
    });
}
export function connectSocketIO(fcm, token) {

    if (!config.socket) {//Neu chua connect socket 
        console.log('++++++++connecting socket++++++++++')
        config.socket = io(
            `${domain}/mobile`,
            {
                query: `fcmId=${fcm}&token=${token}`,
                jsonp: false,
                // keepalive: true,
                reconnection: true,
                reconnectionAttempts: 100,
                reconnectionDelay: 10000,
                // forceNew: true,
                pingInterval: 3000,
                pingTimeout: 7000,
                timeout: 10000
            }
        );

    } else {
        console.log('Đã connect socket')
    }
};