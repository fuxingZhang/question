/**
 * Created by zfx 
 */
const moment = require('moment') 
const Promise = require("bluebird")
const fs = require('../utils/fs.bluebird')
const Router = require('koa-router')
const router  = new Router({
  prefix: '/api'
})

router
.post('/register', async ctx => {
  const data = ctx.request.body
	const now = moment().format("YYYY-MM-DD HH:mm:ss")
	data.created_at = now
	data.updated_at = now
	let users = await fs.read("./models/users/users.json")
	console.log('users',users)
	if( users[data.email] ) {
		ctx.throw(406,'该邮箱已经注册')
	}
	users[data.email] = data
	await fs.write("./models/users/users.json",users)
  ctx.body = '注册成功'
})
.post('/login', async ctx => {
	console.log('req cookie', ctx.cookies.get('token-zfx', { signed: true }))
	const data = ctx.request.body
	console.log('/register',data)	
	const email = data.email
	const password = data.password
	const users = await fs.read("./models/users/users.json")
	if( !users[email] ){
		ctx.throw(404,'帐号不存在')
	}
	console.log(users[email].password)
	if( password != users[email].password ){
		ctx.throw(401,'账户名与密码不匹配，请重新输入')
	}
	let token = { 
		email: email,
		id: new Date().getTime()
	}
	ctx.session[email] = token.id
	ctx.cookies.set('token-zfx', JSON.stringify(token) , { signed: true, maxAge: 12*60*60*1000, httpOnly: true });
  ctx.body = '登陆成功'
})

const middlewares = require('../utils/middlewares')
router.use(middlewares.checkLogin)

router.get('/paper',async ctx => {
	console.log('req cookie', ctx.cookies.get('token-zfx', { signed: true }))
	console.log('paper')
	ctx.body = ctx.session
})

module.exports = router