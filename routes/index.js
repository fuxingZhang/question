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

global.session = { }

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
	const data = ctx.request.body
	console.log('/login',data)	
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
	global.session[email] = token.id
	ctx.cookies.set('token-zfx', JSON.stringify(token) , { maxAge: 12*60*60*1000, httpOnly: true });
  ctx.body = {
  	name: users[email].name,
  	msg: '你好' + users[email].name + '，欢迎回来！'
  }
})

const middlewares = require('../utils/middlewares')
router.use(middlewares.checkLogin)

router
.post('/logout', async ctx =>{
	try{
		const cookie = ctx.cookies.get('token-zfx')
		if( cookie ){
			const user = JSON.parse( cookie )
			delete global.session[user.email]
			//删除cookie
			ctx.cookies.set('token-zfx', 'delete cookie', { maxAge: 5000, httpOnly: true });
		}
		ctx.body = '退出成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.get('/users', async ctx =>{
	try{
		const users = await fs.read("./models/users/users.json")
		ctx.body = users
	}catch(err){
		ctx.throw(500, err)
	}
})
.put('/users', async ctx =>{
	try{
		const data = ctx.request.body
		const users = await fs.read("./models/users/users.json")
		const oldEmail = data.oldEmail
		const email = data.email 
		const name = data.name 
		const password = data.password
		const user = users[oldEmail]
		console.log(user)
		user.name = name
		user.password = password
		user.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
		if( oldEmail !== email ){
			user.email = email
			users[email] = user
			delete users[oldEmail]
		}
		await fs.write("./models/users/users.json",users)
		ctx.body = '修改成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.post('/deleteUser', async ctx =>{
	try{
		const data = ctx.request.body
		const email = data.email 
		const users = await fs.read("./models/users/users.json")
		delete users[email]
		await fs.write("./models/users/users.json",users)
	  ctx.body = '删除成功'
	}catch(err){
		ctx.throw(500, err)
	}
})

module.exports = router