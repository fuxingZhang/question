import Vue from 'vue'
import Router from 'vue-router'
import paper from '@/pages/paper'
import report from '@/pages/report'

Vue.use(Router)

export default new Router({
  routes: [
  	{ path: '/', redirect: { name: 'paper'} },
    { path: '/:id',  name: 'paper', component: paper },
    { path: '/report/:id',  name: 'report', component: report }
  ]
})
