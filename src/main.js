import Vue from 'vue'
import App from './App.vue'
import router from './router'

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


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
