<template>
    <div>
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
                <!--<a v-link="{path:'goods'}">商品</a>-->
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评价</router-link>
                <!--<a v-link="{path:'ratings'}">评价</a>-->
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
                <!--<a v-link="{path:'sell'}">商家</a>-->
            </div>
        </div>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view :seller = "seller"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import header from 'components/header/header.vue';
    const ERR_OK = 0;//状态码

    export default {
        //vue.js中，规定data是一个函数，因为组件，方便复用
        data() {//es6,风格规范
            return {
                seller: {}
            };
        },
        //父组件ajax,再传给子组件
        created(){
            //this:vue组件实例
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                // console.log('response.body:'+ response);
                if (response.errno === ERR_OK){
                    this.seller = response.data;
                    // console.log(this.seller);//Vue.js给加了get和set方法
                }
            });
        },
        components: {
            'v-header': header
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './common/stylus/mixin.styl'

    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-1px(rgba(7, 17, 27, 0.1));
        .tab-item
            flex: 1
            text-align: center
            & > a
                display: block
                font-size: 14px
                color: rgb(77, 85, 93)
                &.active
                    color: rgb(240, 2, 20)
</style>
