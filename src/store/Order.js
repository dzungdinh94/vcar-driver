import { observable, action, toJS } from "mobx";
import { api } from '../config'
import { PostWithToken, GetWithToken } from "../config/request";
import { Toast } from "../utils/Func";
import _ from 'lodash'
var arrayOrderFull = [];
class Order {
    @observable data = [];
    @observable orderDetail = null
    @observable statusOrder = false;
    @observable socket = null;

    @observable listCoords = [];

    @action setItemDetail(item) {
        this.orderDetail = item
    }
    @action resetData() {
        this.data = []
    }

    @action setStatusOrder(status) {
        this.statusOrder = status
    }
    @action addItemData(item) {
        this.data = [item, ...this.data]
    }
    @action delItemData(item) {
        let dataTemp = toJS(this.data)
        _.remove(dataTemp, (o) => {
            // console.log("O.ID", o)
            // console.log("item.orderId", item.orderId)
            return o.id == item.orderId
        })
        this.data = dataTemp
    }

    @action getListOrder(token, lat, long, dataOld,idDriver, callback = null) {
        this.data = [];
        console.log('idDriver', idDriver)
        // alert("sssssssssss")
        PostWithToken(api.ORDER.getall, { lat, long }, token, (data, status) => {
            console.log("getListOrder2", data);
            arrayOrderFull = [];
            if (status) {
                if (data.ResponseCode && data.data.length > 0) {
                    data.data.map((item,index) => {
                        if(item.driverId && item.status == 1){
                            
                            var arrayOrder = item.driverId.split(",");
                            console.log(arrayOrder,"array Order");
                            arrayOrder.map((data2,i) =>{
                                if(data2 == idDriver){
                                    console.log("da vao day roi",item)
                                    // this.data = [...dataOld, ...item]
                                    arrayOrderFull.push(item)   
                                }
                            })
                        }
                    })
                    var non_duplidated_data = _.uniqBy(arrayOrderFull, 'id'); 
                    var dataSort = non_duplidated_data.sort(function(a, b) {
                        return (b.id - a.id);
                    })
                    this.data = dataSort;
                    callback && callback(true)                    
                   
                } else {
                    console.log(data,"hihi3")
                    Toast(data.ResponseText)
                    callback && callback(false)
                }
            } else {
                console.log(data,"hihi4")
                Toast(data)
                callback && callback(false)
            }
        })

    }
    @action getStatusOrder(token, callback = null) {

        GetWithToken(api.ORDER.statusorder, token, (data, status) => {
            console.log("datatattataa",data)
            if (status) {
                if (data.ResponseCode) {
                    this.statusOrder = data.data.status
                    if (data.data.data) {
                        this.orderDetail = data.data.data
                        callback && callback(true)
                    } else {
                        callback && callback(false)
                    }
                } else {
                    callback && callback(false)
                }
            } else {
                // Toast(data)
                callback && callback(false)
            }
        })
    }

}


export default new Order();