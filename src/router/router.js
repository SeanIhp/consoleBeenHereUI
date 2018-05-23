

// appRouter数组内每个对象代表一个界面路由
export const appRouter = [
    {
        path: '/sql',
        name: 'sql',
        title: '勿动！！！！',
        component: () => import('@/views/example/sql.vue'),
    },
    // {
    //     path: '/',
    //     name: 'example',
    //     title: '样例界面',
    //     component: () => import('@/views/example/example.vue'),
        
    //     // children: [
    //     //     { path: 'index', title: '子界面', name: 'chd_index', component: () => import('@/views/example/example.vue') }
    //     // ]
    // },
    {
        path: '/order-review',
        name: 'order-review',
        title: '企业管理',
        component: () => import('@/views/review/index.vue'),
        children: [
            { path: 'order-review-list', title: '企业列表', name: 'order-review-list', component: () => import('@/views/review/page/list.vue') },
            { path: 'order-review-info', title: '企业添加', name: 'order-review-info', component: () => import('@/views/review/page/info.vue') },
            // { path: 'order-review-edit', title: '企业编辑', name: 'order-review-edit', component: () => import('@/views/review/page/edit.vue') }
        ]
    },
    {
        path: '/order-split',
        name: 'order-split',
        title: '订单拆分',
        component: () => import('@/views/split/index.vue'),
        children: [
            { path: 'order-split-list', title: '订单列表', name: 'order-split-list', component: () => import('@/views/split/page/list.vue') },
            { path: 'order-split-info', title: '订单详情', name: 'order-split-info', component: () => import('@/views/split/page/info.vue') },
            { path: 'order-split-infon', title: '订单详情', name: 'order-split-infon', component: () => import('@/views/split/page/infon.vue') },
            { path: 'order-split-step', title: '订单操作', name: 'order-split-step', component: () => import('@/views/split/page/step.vue') },
            { path: 'order-split-other', title: '订单操作', name: 'order-split-other', component: () => import('@/views/split/page/other.vue') },
        ]
    },
    {
        path: '/order-cancel',
        name: 'order-cancel',
        title: '订单取消',
        component: () => import('@/views/cancel/index.vue'),
        children: [
            { path: 'order-cancel-list', title: '订单列表', name: 'order-cancel-list', component: () => import('@/views/cancel/page/list.vue') },
            { path: 'order-cancel-info', title: '订单详情', name: 'order-cancel-info', component: () => import('@/views/cancel/page/info.vue') },
            { path: 'order-cancel-infoc', title: '订单取消详情', name: 'order-cancel-infoc', component: () => import('@/views/cancel/page/infoc.vue') },
        ]
    },
    {
        path: '/order-search',
        name: 'order-search',
        title: '订单查询',
        component: () => import('@/views/search/index.vue'),
        children: [
            { path: 'order-search-list', title: '订单列表', name: 'order-search-list', component: () => import('@/views/search/page/list.vue') },
            { path: 'order-search-info', title: '订单详情', name: 'order-search-info', component: () => import('@/views/search/page/info.vue') },
            { path: 'order-search-other', title: '订单操作', name: 'order-search-other', component: () => import('@/views/search/page/other.vue') },
        ]
    },
    {
        path: '/order-return',
        name: 'order-return',
        title: '退货申请',
        component: () => import('@/views/return/index.vue'),
        children: [
            { path: 'order-return-list', title: '退货申点请列表', name: 'order-return-list', component: () => import('@/views/return/page/list.vue') },
            { path: 'order-return-apply', title: '退货申请', name: 'order-return-apply', component: () => import('@/views/return/page/apply.vue') },
            { path: 'order-return-info', title: '退货申请单详情', name: 'order-return-info', component: () => import('@/views/return/page/info.vue') },
        ]
    },
    {
        path: '/compensate-order',
        name: 'compensate-order',
        title: '补偿单管理',
        component: () => import('@/views/compensate-order/index.vue'),
        children: [
            { path: 'compensate-order-list', title: '补偿单管理', name: 'compensate-order-list', component: () => import('@/views/compensate-order/page/list.vue') },
            { path: 'compensate-order-detail', title: '补偿单详情', name: 'compensate-order-detail', component: () => import('@/views/compensate-order/page/detail.vue') },
            { path: 'compensate-order-addInfo', title: '新增补偿单', name: 'compensate-order-addInfo', component: () => import('@/views/compensate-order/page/addInfo.vue') }
        ]
    },
    {
        path: '/compensate-plan',
        name: 'compensate-plan',
        title: '补偿计划管理',
        component: () => import('@/views/plan/index.vue'),
        children: [
            { path: 'compensate-plan-search', title: '补偿计划执行分析表', name: 'compensate-plan-search', component: () => import('@/views/plan/page/search.vue') },
            { path: 'compensate-plan-list', title: '门店补偿计划列表', name: 'compensate-plan-list', component: () => import('@/views/plan/page/list.vue') },
            { path: 'compensate-plan-detail', title: '门店补偿计划详情', name: 'compensate-plan-detail', component: () => import('@/views/plan/page/detail.vue') }
        ]
    },
    {
        path: '/order-goods',
        name: 'order-goods',
        title: '退货单管理',
        component: () => import('@/views/return-goods/index.vue'),
        children: [
            { path: 'order-goods-list', title: '退货单列表', name: 'order-goods-list', component: () => import('@/views/return-goods/page/list.vue') },
            { path: 'order-goods-info', title: '退货单详情', name: 'order-goods-info', component: () => import('@/views/return-goods/page/info.vue') },
        ]
    },
    {
        path: '/order-money',
        name: 'order-money',
        title: '退款单管理',
        component: () => import('@/views/return-money/index.vue'),
        children: [
            { path: 'order-money-list', title: '退款单列表', name: 'order-money-list', component: () => import('@/views/return-money/page/list.vue') },
            { path: 'order-money-info', title: '退款单详情', name: 'order-money-info', component: () => import('@/views/return-money/page/info.vue') },
        ]
    },
    // {
    //     path: '/business-parameters',
    //     name: 'business-parameters',
    //     title: '业务参数设置',
    //     component: () => import('@/views/basis-set-up/business-parameters.vue'),
    // },
    // {
    //     path: '/data-dictionary',
    //     name: 'data-dictionary',
    //     title: '数据字典设置',
    //     component: () => import('@/views/basis-set-up/data-dictionary.vue'),
    // },
    {
        path: '/order-state-name-configuration',
        name: 'order-state-name-configuration',
        title: '订单状态名称配置',
        component: () => import('@/views/basis-set-up/order-state-configuration.vue'),
    },
    {
        path: '/channel-order-state-configuration',
        name: 'channel-order-state-configuration',
        title: '渠道订单状态名称配置',
        component: () => import('@/views/basis-set-up/channel-order-state-configuration.vue'),
    },
    {
        path: '/order-automatic-review',
        name: 'order-automatic-review',
        title: '订单自动审核规则设置',
        component: () => import('@/views/basis-set-up/order-automatic-review.vue'),
    },
    {
        path: '/order-automatic-split',
        name: 'order-automatic-split',
        title: '订单自动拆分规则设置',
        component: () => import('@/views/basis-set-up/order-automatic-split.vue'),
    },
    {
        path: '/order-center',
        name: 'order-center',
        title: '订单中心',
        component: () => import('@/views/order-center/index.vue'),
        children: [
            { path: 'order-center-index', title: '订单中心首页', name: 'order-center-index', component: () => import('@/views/order-center/page/index.vue') }
        ]
    },
    {
        path: '/quote',
        name: 'quote',
        title: '报价中心',
        component: () => import('@/views/quote/index.vue'),
        children: [
            { path: 'voucher', title: '商品报价单', name: 'quote-voucher', component: () => import('@/views/quote/page/voucher/main.vue') },
            { path: 'customer', title: '客户管理', name: 'quote-customer', component: () => import('@/views/quote/page/customer/main.vue') },
            { path: 'item', title: '商品管理', name: 'quote-item', component: () => import('@/views/quote/page/item/main.vue') },
        ]
    },
    {
        path: '/',
        name: 'home',
        title: '首页',
        component: () => import('@/views/home/home.vue'),
    },
    {
        path: '/login',
        name: 'login',
        title: '登录',
        component: () => import('@/views/entrance/login.vue'),
    },
    {
        path: '/regist',
        name: 'regist',
        title: '注册',
        component: () => import('@/views/entrance/regist.vue'),
    },
    {
        path: '/console',
        name: 'console',
        title: '报价中心',
        component: () => import('@/views/console/index.vue'),
        children: [
            { path: 'dictGroup', title: '数据字典', name: 'console-dictGoup', component: () => import('@/views/console/page/dictGroup/main.vue') },
            // { path: 'menu', title: '客户管理', name: 'quote-customer', component: () => import('@/views/quote/page/customer/main.vue') }
        ]
    },
];

export const routers = [
    ...appRouter,
];
