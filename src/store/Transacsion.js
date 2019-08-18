import { observable, action } from "mobx";
import { api } from '../config'
import { PostWithToken } from "../config/request";
import { Toast } from "../utils/Func";
class Transaction {
    @observable transaction = [];
    @action getHistory(token, page, dataOld, callback = null) {
        // console.log("token  "+token)
        // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmY21JZCI6IjEyMzEiLCJpZCI6NCwidHlwZSI6MCwidXNlclR5cGUiOjEsImlhdCI6MTUzMzU0MDkyNn0.1xqYCIi-VcHGai_iBffo-lDF_Urblkk4mnP32fdihmY'
        PostWithToken(api.HISTORY.history, { page: page }, token, (data, status) => {
            console.log(data)
            if (status) {
                if (data.ResponseCode && data.data.length > 0) {
                    this.transaction = [...dataOld, ...data.data]
                    callback && callback(true)
                } else {
                    callback && callback(false)
                }

            } else {
                Toast(data)
                callback && callback(false)
            }
        })
    }

}
export default new Transaction();