import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//轮播图组件
import Carousel from '@/components/Carousel'
//分页器
import Pagination from '@/components/Pagination'
//引入element ui 组件
import { Button, MessageBox } from 'element-ui'
//第一个参数：组件名，第二个参数：那个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//注册全局组件
Vue.component(Button.name, Button)
//挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入仓库
import store from '@/store'
//引入mockServe.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一引入api接口
import * as API from '@/api'
//引入懒加载图片
import lazyload from '@/assets/lazyload.jpg'
//引入插件
import VueLazyload from 'vue-lazyload'
//使用插件
Vue.use(VueLazyload, {
  loading: lazyload
})

//引入表单校验插件
import '@/plugins/validate'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$api = API
    Vue.prototype.$bus = this
  },
  // 注册路由
  router,
  store,
}).$mount('#app')
