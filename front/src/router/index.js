import Vue from 'vue'
import Router from 'vue-router'
import paper from '@/pages/paper'

Vue.use(Router)

export default new Router({
  routes: [
  	{ path: '/', redirect: { name: 'paper'} },
    { path: '/:id',  name: 'paper', component: paper }
  ]
})
