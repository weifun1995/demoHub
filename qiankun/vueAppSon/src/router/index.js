import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import a from '../view/a.vue'
import b from '../view/b.vue'

const routers = [
  // 主应用为hash模式，为了使路由能匹配到path需要/vue-app/
  {
    path: '/',
    redirect: '/vue-app/a' 
  },
  {
    path: '/vue-app/a',
    name: 'a',
    component: a
  },
  {
    path: '/vue-app/b',
     name: 'b',
    component: b
  },
]

export default routers