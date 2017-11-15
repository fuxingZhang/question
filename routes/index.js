/**
 * Created by zfx 
 */
const moment = require('moment') 
const Promise = require('bluebird')
const fs = require('../utils/fs.bluebird')
const _fs = require("fs")
const Router = require('koa-router')
const router  = new Router({
  prefix: '/api'
})

global.session = { }

router
.post('/register', async ctx => {
  const data = ctx.request.body
	const now = moment().format('YYYY-MM-DD HH:mm:ss')
	data.created_at = now
	data.updated_at = now
	let users = await fs.read('./models/users/users.json')
	console.log('users',users)
	if( users[data.email] ) {
		ctx.throw(406,'该邮箱已经注册')
	}
	users[data.email] = data
	await fs.write('./models/users/users.json',users)
  ctx.body = '注册成功'
})
.post('/login', async ctx => {
	const data = ctx.request.body
	console.log('/login',data)	
	const email = data.email
	const password = data.password
	const users = await fs.read('./models/users/users.json')
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
// router.use(middlewares.checkLogin)

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
		const users = await fs.read('./models/users/users.json')
		ctx.body = users
	}catch(err){
		ctx.throw(500, err)
	}
})
.put('/users', async ctx =>{
	try{
		const data = ctx.request.body
		const users = await fs.read('./models/users/users.json')
		const oldEmail = data.oldEmail
		const email = data.email 
		const name = data.name 
		const password = data.password
		const user = users[oldEmail]
		console.log(user)
		if( email !== oldEmail &&  users[email] ){
			ctx.throw(406,'您输入的新邮箱已经存在，请更换其他邮箱')
		}
		user.name = name
		user.password = password
		user.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
		if( email !== oldEmail ){
			user.email = email
			users[email] = user
			delete users[oldEmail]
		}
		await fs.write('./models/users/users.json',users)
		ctx.body = '修改成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.post('/deleteUser', async ctx =>{
	try{
		const data = ctx.request.body
		const email = data.email 
		const users = await fs.read('./models/users/users.json')
		delete users[email]
		await fs.write('./models/users/users.json',users)
	  ctx.body = '删除成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.get('/papers', async ctx =>{
	let papers = await fs.read('./models/papers/papers.json')
	ctx.body = papers
})
.post('/createPaper', async ctx =>{
	try{
		let paper = ctx.request.body
		const time = new Date().getTime()
		const now = moment(time).format('YYYY-MM-DD HH:mm:ss')
		paper.id = time
		paper.created_at = now
		paper.updated_at = now
		let papers = await fs.read('./models/papers/papers.json')
		papers[paper.id] = paper
		await fs.write('./models/papers/papers.json',papers)
		ctx.body = '添加问卷成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.get('/paper/:id', async ctx =>{
	try{
		const papers = await fs.read('./models/papers/papers.json')
		const paper = papers[ctx.params.id]
		ctx.body = paper
	}catch(err){
		ctx.throw(500, err)
	}
})
.put('/paper', async ctx =>{
	try{
		const paper = ctx.request.body
		const id = paper.id
		const papers = await fs.read('./models/papers/papers.json')
		paper.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
		papers[id] = paper
		await fs.write('./models/papers/papers.json',papers)
		ctx.body = '问卷更新成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.get('/categories/:id', async ctx =>{
	try{
		const id = ctx.params.id
		const paper = await fs.read(`./models/papers/${id}.json`)
		ctx.body = paper
	}catch(err){
		console.log(err)
		ctx.body = { err: 'not exist'}
	}
})
.post('/category/:id', async ctx =>{
	try{
		const category = ctx.request.body
		const id = ctx.params.id
		const time = new Date().getTime()
		const now = moment(time).format('YYYY-MM-DD HH:mm:ss')
		category.id = time
		category.created_at = now
		category.updated_at = now
		//官方不推荐
		//不推荐在调用 fs.open，fs.readFile()，fs.writeFile() 之前使用 fs.exists() 检测文件是否存在。这样做会引起竞争条件，因为在两次调用之间，其他进程可能修改文件。作为替代，用户应该直接开/读取/写入文件，当文件不存在时再处理错误。
		//不建议在调用 fs.open() 、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查一个文件的可访问性。 如此处理会造成紊乱情况，因为其他进程可能在两个调用之间改变该文件的状态。 作为替代，用户代码应该直接打开/读取/写入文件，当文件无法访问时再处理错误。
		// if( _fs.existsSync(`./models/paper/${id}.json`) ){
		// 	const paper = await fs.read(`./models/papers/${id}.json`)
		// 	paper.categoryies[category.id] = category
		// 	await fs.write(`./models/papers/${id}.json`,paper)
		// }else{
		// 	const papers = await fs.read('./models/papers/papers.json')
		// 	title = papers[id].title
		// 	const paper = {
		// 		title,
		// 		categories:{}
		// 	}
		// 	paper.categories[time] = category
		// 	await fs.write(`./models/papers/${id}.json`,paper)
		// }
		//官方推荐方法(注意，try catch 可以循环嵌套，内层处理，外层不会，除非在内层catch又抛出错误):
		try{
			const paper = await fs.read(`./models/papers/${id}.json`)
			paper.categories[time] = category
			await fs.write(`./models/papers/${id}.json`,paper)
		}catch(err){
			console.log(err)
			const papers = await fs.read('./models/papers/papers.json')
			title = papers[id].title
			const paper = {
				title,
				categories:{}
			}
			paper.categories[time] = category
			await fs.write(`./models/papers/${id}.json`,paper)
		}
		ctx.body = '添加类目成功'
	}catch(err){
		ctx.throw(500, err)
	}
})
.get('/category/:id/:query', async ctx =>{
	try{
		const id = ctx.params.id
		const query = ctx.params.query
		const paper = await fs.read(`./models/papers/${id}.json`)
		ctx.body = paper.categories[query]
	}catch(err){
		console.log(err)
		ctx.body = { err: 'not exist'}
	}
})
.put('/category/:id/:query', async ctx =>{
	try{
		const category = ctx.request.body
		const id = ctx.params.id
		const query = ctx.params.query
		category.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
		const paper = await fs.read(`./models/papers/${id}.json`)
		paper.categories[query] = category
		await fs.write(`./models/papers/${id}.json`,paper)
		ctx.body = '类目更新成功'
	}catch(err){
		ctx.throw(500, err)
	}
})

module.exports = router