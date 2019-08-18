let domain = "http://128.199.236.30:3001"
// let domain = "http://192.168.0.109:3000"

const api = {
    domain: domain,
    login: "/mobile/driver/login",
    logout: "/mobile/logout",
    signin: "/mobile/driver/signin",
    getInfoApp: "/mobile/AppInfo",
    subscribeToTopic: '/mobile/subscribeToTopic',
    USER: {
        updateinfo: "/mobile/updateinfo",
        info: "/mobile/info",
        forgotpass: '/mobile/driver/forgotpass',
        infouser: '/mobile/user/infouser'
    },
    TYPE_CAR: {
        getall: '/mobile/typecar/getall',
    },
    PriceTimeSlot: {
        getall: '/mobile/pricetimeslot/getall',
    },
    NOTIFICATION: {
        getall: '/mobile/notify/getall',
        read: '/mobile/notify/read',
        count: "/mobile/notify/count"
    },
    SERVICE_ATTACH: {
        getall: '/mobile/serviceattach/getall',
    },
    HISTORY: {
        history: "/mobile/order/history"
    },
    ORDER: {
        getall: "/mobile/order/getall",
        getorder: "/mobile/order/getorder",
        statusorder: "/mobile/driver/statusorder",
        finish: "/mobile/order/finish",
        cancel: "/mobile/order/cancel",
        goCar:"/mobile/order/gocar"
    },
    UPLOAD: {
        fileupload: "/admin/fileupload"
    },
    LOCATION: {
        updatelocation: "/mobile/driver/updatelocation"
    }
}
export default api