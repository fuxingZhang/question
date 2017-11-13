import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import reset from '@/pages/reset.vue'
import admin from '@/pages/admin.vue'
import paper from '@/pages/paper.vue'
import account from '@/pages/account.vue'
import paperCreate from '@/pages/paperCreate.vue'
import paperTitle from '@/pages/paperTitle.vue'
import category from '@/pages/category.vue'
import categoryCreate from '@/pages/categoryCreate.vue'
import categoryTitle from '@/pages/categoryTitle.vue'
import categoryEdit from '@/pages/categoryEdit.vue'
import report from '@/pages/report.vue'
import API from '@/API'

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
    { path: '/admin/paper', component: paper, name:'问卷' }, 
    { path: '/admin/paper/create/:id', component: paperCreate, name:'添加问卷' }, 
    { path: '/admin/paper/title/:id', component: paperTitle, name:'编辑问卷' }, 
    { path: '/admin/category/:id', component: category, name:'类目' }, 
    { path: '/admin/category/create/:id', component: categoryCreate, name:'添加类目' }, 
    { path: '/admin/category/title/:id', component: categoryTitle, name:'编辑类目' }, 
    { path: '/admin/category/edit/:id', component: categoryEdit, name:'题目管理' }, 
    { path: '/admin/report/:id', component: report, name:'测评报告' }, 
  ]
})

router.beforeEach( async(to, from, next) => {

  document.title = to.name

  next()
})

export default router
