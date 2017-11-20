import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import reset from '@/pages/reset.vue'
import admin from '@/pages/admin.vue'
import papers from '@/pages/papers.vue'
import account from '@/pages/account.vue'
import paperCreate from '@/pages/paperCreate.vue'
import paperEdit from '@/pages/paperEdit.vue'
import paper from '@/pages/paper.vue'
import categoryCreate from '@/pages/categoryCreate.vue'
import categoryEdit from '@/pages/categoryEdit.vue'
import category from '@/pages/category.vue'
import report from '@/pages/report.vue'
import records from '@/pages/records.vue'

Vue.use(Router)

const router = new Router({ 
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login, name:'登录' }, 
    { path: '/register', component: register, name:'注册' }, 
    { path: '/reset', component: reset, name:'重置密码' }, 
    { path: '/admin', component: admin, name:'管理主页' }, 
    { path: '/admin/account', component: account, name:'帐号管理' }, 
    { path: '/admin/papers', component: papers, name:'问卷' },     
    { path: '/admin/paper/create', component: paperCreate, name:'添加问卷' }, 
    { path: '/admin/paper/edit/:id', component: paperEdit, name:'编辑问卷' }, 
    { path: '/admin/paper/:id', component: paper, name:'类目' }, 
    { path: '/admin/paper/:id/category/create', component: categoryCreate, name:'添加类目' }, 
    { path: '/admin/paper/:id/category/edit/:query', component: categoryEdit, name:'编辑类目' }, 
    { path: '/admin/paper/:id/category/:query', component: category, name:'题目管理' }, 
    { path: '/admin/paper/:id/report/:query', component: report, name:'测评报告' }, 
    { path: '/admin/records', component: records, name:'用户答卷' }, 
  ]
})

router.beforeEach( async(to, from, next) => {

  document.title = to.name

  next()
})

export default router
