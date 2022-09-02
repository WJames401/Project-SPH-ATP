路由：
    面试题1：路由传递参数（对象写法）path是否可以结合params参数一起使用？
    答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一同使用
        this.$router.push({ path: '/search',params:{keyword:thiskeyword},path:{k:this.keyword.toUpperCase()}})

    面试题2：如何指定params参数可传可不传
    如果路由要求传递params参数，但不传递params参数，URL会出现问题，路由信息丢失
    如果要指定params参数传递或不传递，在配置路由的时候，在占位的后面加上一个问号
        this.$router.push({ name: 'search', query: { keyword:this.keyword.toUpperCase()}})

    面试题3：params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
    使用undefined解决：params参数可以传递、不传递（空的字符串）
        this.$router.push({ path: '/search',params:{keyword:'' || undefined},path:{k:this.keyword.toUpperCase()}})

    面试题4：路由组件能不能传递props数据
    布尔值写法(params)：props:true,接受params参数
    对象写法：props:{a=1,b=2},传递额外参数
    函数写法：可以传递params参数、query参数，通过props传递给路由组件
    props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})

    lodash：
        (_.debounce)防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次
        (_.throttle)节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

    路由导航：
        声明式导航：router-link
        编程式导航：push|replace
    
    三级联动：如果使用声明式导航，可以实现路由的跳转与传递参数，会出现卡顿现象，因为服务器返回数据之后
    循环出很多的router-link组件

    $nextTick: 在下次DOM更新 循环结束之后 执行延迟回调。在修改数据之后 立即使用这个方法，获取更新后的DOM

    开发流程：
        1.静态页面+静态组件拆分出来
        2.发请求（API）
        3.vuex
        4.组件获取仓库数据，动态展示数据

    分页器：
        pageNo:当前第几个
        pageSize：代表每一页展示多少条数据
        total:代表总共有多少分页
        continues：代表分页连续页码个数