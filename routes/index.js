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
/**
	*  前端
	*
	*/
.get('/answer/:id', async ctx =>{
	const id = ctx.params.id
	const paper = await fs.read((`./models/papers/${id}.json`))
	const categories = paper.categories
	let files = []
	for( let query in categories ){
		files.push(fs.read(`./models/questions/${id}.${query}.json`))
	}
	let arr = await Promise.all(files)
	let data = []
	for( let item of arr ){
		data.push(...item.items)
	}
	ctx.body = {
		data
	}
})
.post('/answer/:id', async ctx =>{
	const id = ctx.params.id
	const data = ctx.request.body
	const time = new Date().getTime()
	const now = moment(time).format('YYYY-MM-DD HH:mm:ss')
	data.created_at = now
	const records = await fs.read(`./models/records/records.json`)
	data.updated_at = now
	records.data.push({
		name : data.name,
		created_at : now,
		path:`./models/answers/${time}-${data.name}.json`
	})
	await Promise.all([
		fs.write(`./models/answers/${time}-${data.name}.json`,data),
		fs.write(`./models/records/records.json`,records)
	])
	ctx.body = '提交成功'
})
/**
	*  管理后台
	*
	*/
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
	const cookie = ctx.cookies.get('token-zfx')
	if( cookie ){
		const user = JSON.parse( cookie )
		delete global.session[user.email]
		//删除cookie
		ctx.cookies.set('token-zfx', 'delete cookie', { maxAge: 5000, httpOnly: true });
	}
	ctx.body = '退出成功'
})
.get('/users', async ctx =>{
	const users = await fs.read('./models/users/users.json')
	ctx.body = users
})
.put('/users', async ctx =>{
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
})
.post('/deleteUser', async ctx =>{
	const data = ctx.request.body
	const email = data.email 
	const users = await fs.read('./models/users/users.json')
	delete users[email]
	await fs.write('./models/users/users.json',users)
  ctx.body = '删除成功'
})
.get('/papers', async ctx =>{
	let papers = await fs.read('./models/papers/papers.json')
	ctx.body = papers
})
.post('/createPaper', async ctx =>{
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
})
.get('/paper/:id', async ctx =>{
	const papers = await fs.read('./models/papers/papers.json')
	const paper = papers[ctx.params.id]
	ctx.body = paper
})
.put('/paper', async ctx =>{
	const paper = ctx.request.body
	const id = paper.id
	const papers = await fs.read('./models/papers/papers.json')
	paper.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	papers[id] = paper
	await fs.write('./models/papers/papers.json',papers)
	ctx.body = '问卷更新成功'
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
	const category = ctx.request.body
	const id = ctx.params.id
	const time = new Date().getTime()
	const now = moment(time).format('YYYY-MM-DD HH:mm:ss')
	category.id = time
	category.created_at = now
	category.updated_at = now
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
	const quetions = reports = {
		id: time,
		created_at: now,
		updated_at: now,
		items:[]
	}
	await fs.write(`./models/questions/${id}.${time}.json`, quetions)
	await fs.write(`./models/reports/${id}.${time}.json`, reports)
	ctx.body = '添加类目成功'
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
	const category = ctx.request.body
	const id = ctx.params.id
	const query = ctx.params.query
	category.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	const paper = await fs.read(`./models/papers/${id}.json`)
	paper.categories[query] = category
	await fs.write(`./models/papers/${id}.json`,paper)
	ctx.body = '类目更新成功'
})
.delete('/category/:id/:query', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const paper = await fs.read(`./models/papers/${id}.json`)
	delete paper.categories[query]
	await fs.write(`./models/papers/${id}.json`,paper)
	ctx.body = '删除类目成功'
})
.get('/questions/:id/:query', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const questions = await fs.read(`./models/questions/${id}.${query}.json`)
	ctx.body = questions
})
.post('/questions/:id/:query', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const items = ctx.request.body
	const questions = await fs.read(`./models/questions/${id}.${query}.json`)
	questions.items = items
	questions.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	await fs.write(`./models/questions/${id}.${query}.json`, questions)
	ctx.body = '保存成功'
})
.delete('/questions/:id/:query/:index', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const index = ctx.params.index
	const questions = await fs.read(`./models/questions/${id}.${query}.json`)
	questions.items = questions.items.filter(function(item,i){
		return i != index
	})
	questions.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	await fs.write(`./models/questions/${id}.${query}.json`, questions)
	ctx.body = '删除成功'
})
.get('/reports/:id/:query', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const reports = await fs.read(`./models/reports/${id}.${query}.json`)
	ctx.body = reports
})
.post('/reports/:id/:query', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const items = ctx.request.body
	const reports = await fs.read(`./models/reports/${id}.${query}.json`)
	reports.items = items
	reports.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	await fs.write(`./models/reports/${id}.${query}.json`, reports)
	ctx.body = '保存成功'
})
.delete('/reports/:id/:query/:index', async ctx =>{
	const id = ctx.params.id
	const query = ctx.params.query
	const index = ctx.params.index
	const reports = await fs.read(`./models/reports/${id}.${query}.json`)
	reports.items = reports.items.filter(function(item,i){
		return i != index
	})
	reports.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
	await fs.write(`./models/reports/${id}.${query}.json`, reports)
	ctx.body = '删除成功'
})
.get('/records', async ctx =>{
	const records = await fs.read('./models/records/records.json')
	ctx.body = records.data
})

module.exports = router