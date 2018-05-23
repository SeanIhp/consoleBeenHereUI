import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import { routers, otherRouter, appRouter } from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
 
export const router = new VueRouter(RouterConfig);


// 路由加载前钩子函数，一般添加全局权限验证操作
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    console.log("tototo:", to);
    if (to.query.token) {
        sessionStorage.s = to.query.token;
    }
    next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
