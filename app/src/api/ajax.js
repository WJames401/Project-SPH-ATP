//对axios二次封装
import axios from "axios"
//引入进度条
import nprogress from "nprogress"
//引入进度条样式
import 'nprogress/nprogress.css'
//引入store
import store from "@/store"
// start：进度条开始，done：进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    // 配置对象
    baseURL: '/api',
    //代表请求超时的时间5s
    timeout: 5000,
})

// 请求拦截器

requests.interceptors.request.use((config) => {
    //config：配置对象，对象里面有一个headers请求头
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（userTempId）
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器相应数据回来之后，响应拦截器可以监测
    nprogress.done()
    return res.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(error)
})

export default requests