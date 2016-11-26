import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

//公共样式
// webpack特性：在js中依赖样式
import 'common/stylus/index.styl'

//全局注册
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
    {
        path: '/goods', component: goods
    },
    {
        path: '/ratings', component: ratings
    },
    {
        path: '/seller', component: seller
    }
];
const router = new VueRouter({
   routes,
    linkActiveClass:'active'
});


//如果在option中有el，就不需要mount了
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

router.push('/goods');
