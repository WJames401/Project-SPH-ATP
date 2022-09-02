// 引入一级路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
//配置路由信息
export default [
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        name: 'center',
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/GroupOrder')
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        name: 'paysuccess',
        meta: { show: true }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        name: 'Pay',
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        name: 'trade',
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        name: 'ShopCart',
        meta: { show: true }
    },
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { show: true },
        name: 'home',
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: true },
        name: 'login',
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false },
        name: 'register',

    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { show: true },
        name: 'search',
    },
    {
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        name: 'detail',
        meta: { show: true },

    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        name: 'addcartsuccess',
        meta: { show: true },
    },
    // 重定向路由
    {
        path: '*',
        redirect: '/home'
    }
]