import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from '../pages/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 登录
    path: '/', // url 路径
    name: 'login',
    component: Login // 匹配成功加载的组件
  },
  {
    // 主页
    path: '/main',
    name: 'main',
    component: () => import('../pages/Index.vue'),
    children: [
      { path: '/main/account', name: 'account', component: () => import('../pages/modules/account/Account.vue') },  // 账户管理
      { path: '/main/addaccount', name: 'addaccount', component: () => import('../pages/modules/account/AddAccount.vue') },  // 添加账户
      { path: '/main/changepwd', name: 'changepwd', component: () => import('../pages/modules/account/ChangePwd.vue') },  // 修改密码

      { path: '/main/clear', name: 'clear', component: () => import('../pages/modules/clear/Clear.vue') },  // 销售列表
      { path: '/main/clearback', name: 'clearback', component: () => import('../pages/modules/clear/ClearBack.vue') },  // 商品退货
      { path: '/main/clearout', name: 'clearout', component: () => import('../pages/modules/clear/ClearOut.vue') },  // 商品出货

      { path: '/main/commodity', name: 'commodity', component: () => import('../pages/modules/commodity/Commodity.vue') },  // 商品管理
      { path: '/main/addcommodity', name: 'addcommodity', component: () => import('../pages/modules/commodity/AddCommodity.vue') },  // 添加商品

      { path: '/main/sta', name: 'sta', component: () => import('../pages/modules/sta/Sta.vue') },  // 销售统计
      { path: '/main/stocksta', name: 'stocksta', component: () => import('../pages/modules/sta/StockSta.vue') },  // 进货统计

      { path: '/main/stock', name: 'stock', component: () => import('../pages/modules/stock/Stock.vue') },  // 库存管理
      { path: '/main/addstock', name: 'addstock', component: () => import('../pages/modules/stock/AddStock.vue') },  // 添加库存

      { path: '/main/vip', name: 'vip', component: () => import('../pages/modules/vip/Vip.vue') },  // 会员管理
      { path: '/main/addvip', name: 'addvip', component: () => import('../pages/modules/vip/AddVip.vue') },  // 添加会员
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
