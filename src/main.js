import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import Cellet from './libs/efview/components/efview/common/Cellet';
import FormDialog from './libs/efview/components/efview/common/FormDialog';
import SearchListlet from './libs/efview/components/efview/common/SearchListlet';
Vue.component(Cellet.name, Cellet);
Vue.component(FormDialog.name, FormDialog);
Vue.component(SearchListlet.name, SearchListlet);

Vue.use(iView);

// 封装网络请求，在vue中使用$http来启动http请求
import request from "./libs/httpserver";
Vue.prototype.$http = request;

// vue-easytable可支持多列头表格组件
import 'vue-easytable/libs/themes-base/index.css';
import { VTable, VPagination } from 'vue-easytable';
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
    },
    mounted() {
    },
    created() {
    }
});
