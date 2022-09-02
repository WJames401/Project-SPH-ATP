//API进行统一管理
import requests from "./ajax"
import mockRequests from './mockAjax'
//三级联动接口

export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)

//获取轮播图
export const reqBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')
// 模拟产品类别信息
// export const reqSpuSaleAttrList = () => mockRequests.get('/detail')
//获取搜索模块数据
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "POST",
    data: params,
})
//获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get',
})
//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

//获取购物车数据列表接口
export const reqCartList = () => requests({
    url: `/cart/cartList`,
    method: 'get',
})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
})
//修改购物车产品勾选状态的接口
export const reqUpdateCheckedById = (skuID, isChecked) => requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: 'get',
})

//获取验证码的接口
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
})

//注册账号的接口
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    data,
    method: 'post',
})

// 登录接口
export const reqUserLogin = (data) => requests({
    url: `/user/passport/login`,
    data,
    method: 'post',
})

//获取用户信息（需要带token）
export const reqUserInfo = () => requests({
    url: `user/passport/auth/getUserInfo`,
    method: 'get',
})

//退出登录的接口
export const reqLogOut = () => requests({
    url: `/user/passport/logout`,
    method: 'get',
})

//获取用户地址信息
export const reqAddressInfo = () => requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: 'get',
})

//获取商品清单
export const reqOrderInfo = () => requests({
    url: `/order/auth/trade`,
    method: 'get',
})

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'POST',
})

//获取支付信息
export const reqPayInfo = (orderId) => requests({
    url: `payment/weixin/createNative/${orderId}`,
    method: 'get'
})

//获取支付订单状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
})

//获取订单列表
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
})