import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { token } from "./apis/apis";

// 引入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册全局组件 ElementUI
Vue.use(ElementUI);

// // 引入全局重置样式
/* Normalize.css */
import "normalize.css"
/* 静态公有样式 */
import "@/assets/styles/common.css"

// 配置路由验证(路由守卫)
router.beforeEach((to, from, next) => {
    //to指代的是当前循环出来的路由对象
    if (to.meta.requireAuth) {
        // 根据token来决定是否能看到管理系统
        token(localStorage.getItem('token'))
            .then((res) => {
                if (res.data == 'ok') {
                    // 用户已登录
                    next() // 放行
                } else {
                    next('/') // 跳转到登录页面
                }
            })
    } else {
        //没有开启路由验证
        next()  //放行 让他跳转
    }

})


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
