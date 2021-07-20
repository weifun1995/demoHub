import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false


import { registerMicroApps, start } from 'qiankun';

const getActiveRule = (hash)=> (location)=> location.hash.startsWith(hash) // 函数返回ture时会触发子应用

// 注册微服务
registerMicroApps([
  {
    name: 'vueApp',
    entry: '//localhost:7000',
    container: '#container', // 这里需要主有应用提供一个容器
    activeRule: getActiveRule('#/vue-app'),
  },
  {
    name: 'reactApp',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/react-app',
  },
]);
// 启动 qiankun
start();


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
