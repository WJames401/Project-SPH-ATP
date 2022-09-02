<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex === index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <div class=" item-list clearfix"
                                    :style="{display:currentIndex === index ?'block':'none'}">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for=" c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data(){
        return{
            currentIndex: -1,
            show:true
        }
    },
    mounted(){
        //当不是home路由组件，将typenav隐藏
        if (this.$route.path !== '/home'){
            this.show = false
        }
    },
    computed:{
        //右侧需要一个函数，当使用这个计算属性时，右侧函数会执行一次
        //注入一个参数state，其实即为dacangku中的数据
        ...mapState({
            categoryList:state=>state.home.categoryList
        })
    },
    methods:{
        //鼠标进入修改响应式数据currentIndex属性
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
        // 鼠标进入展示
        enterShow(){
            this.show = true
        },
        //当组件不是home组件时，鼠标离开
        leaveShow(){
            this.currentIndex = -1
            if(this.$route.path !== '/home'){
                this.show = false
            }
        },
        //编程式导航+事件委派+自定义属性
        goSearch(event){
            //获取事件目标标签
            let element = event.target
            // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
            let {categoryname,category1id,category2id,category3id} = element.dataset
            // 如果标签身上有categoryname一定是a标签
            if(categoryname){
                //整理跳转参数
                let location = {name:'search'}
                let query = {categoryName:categoryname}
                //一级分类、二级分类、三级分类的a标签
                if(category1id){
                    query.category1id = category1id
                }else if(category2id){
                    query.category2id = category2id
                }else if(category3id){
                    query.category3id = category3id
                }
                //如果携带params参数，则合并一同传递
                if(this.$route.params){
                    location.params = this.$route.params
                    //整理完参数
                    location.query = query
                    //路由跳转
                    this.$router.push(location)
                }
            }
        }
    }

}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                                text-decoration: none;
                            }

                            
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }

                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            .sort-enter,.sort-leave-to{
                height: 0;
            }
            .sort-enter-to,.sort-leave{
                height: 461px;
            }
            .sort-enter-active,.sort-leave-active{
                transition: all .5s linear;
            }
        }
    }
</style>