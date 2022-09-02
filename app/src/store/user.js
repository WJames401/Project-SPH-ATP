import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code === 200) {
            return 'ok'
        } else (
            Promise.reject(new Error('fail'))
        )
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //服务器下发token，用户的唯一标识
        //需要通过token找服务器要用户信息进行展示
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            //提交用户信息
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        //通知服务器清除token
        //action尽量不要操作数据
        let result = await reqLogOut()
        if (result.code === 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state) {
        //把仓库中用户相关数据清空
        state.token = ''
        state.userInfo = {}
        //本地存储清空
        removeToken()
    }
}
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters,
}