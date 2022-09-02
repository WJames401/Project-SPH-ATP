import { reqAddressInfo, reqOrderInfo } from '@/api'

const actions = {
    //获取用户地址
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code === 200) {
            commit('GETADDRESSINFO', result.data)
        }
    },
    //获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code === 200) {
            commit('GETORDERINFO', result.data)
        }
    }
}
const mutations = {
    GETADDRESSINFO(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const state = {
    address: [],
    orderInfo: {}
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters,
}