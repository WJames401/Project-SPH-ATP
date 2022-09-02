//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter)
// 把VueRouter原型对象中的push保存一份
let originpush = VueRouter.prototype.push
let originreplace = VueRouter.prototype.replace


//重写push|replace
// 第一个参数：告诉push方法，往哪跳转（传递那些参数） 第二个参数：成功的回调  第三个参数：失败的回调

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originpush.call(this, location, resolve, reject)
    } else {
        originpush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originreplace.call(this, location, resolve, reject)
    } else {
        originreplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
//路由全局守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name

    if (token) {
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        if (to.path === '/trade' || to.path === '/pay' || to.path === '/center/MyOrder') {
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})

export default router