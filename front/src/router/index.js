import Vue from 'vue'
import Router from 'vue-router'
import paper from '@/pages/paper'
import report from '@/pages/report'
import back from '@/pages/back'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/back',  name: 'back', component: back },
  	{ path: '/', redirect: { name: 'paper'} },
    { path: '/:id',  name: 'paper', component: paper },
    { path: '/report/:id',  name: 'report', component: report }
  ]
})
