import { reqGetSearchInfo } from '@/api'

const actions = {
    //获取search模块
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

const state = {
    searchList: {},
}

const getters = {
    //state为当前仓库的state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },

}

export default {
    state,
    actions,
    mutations,
    getters,
}