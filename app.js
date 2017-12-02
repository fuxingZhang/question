const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const router = require('./routes')
const koaBody = require('koa-body')

app.use(koaBody());

// 跨域
const cors = require('koa2-cors')
app.use(cors())
// 或者跨域自己写
// middlewares = require("./utils/middlewares");
// app.use(middlewares.crossOrigin);

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
});

app.keys = ['some secret hurr'];

// route
app
.use(router.routes())
.use(router.allowedMethods())

const path = require('path')
serve = require("koa-static")
app.use(serve(path.join(__dirname, "/public")))

//用来捕获api和资源文件外的请求,所以要放在最后面
const IndexRouter = new Router()
IndexRouter.all('*', async  ctx => {
  console.log('api和资源文件外的请求')
	ctx.throw( 404, 'api和资源文件外的请求')
})
app
.use(IndexRouter.routes())

// error
app.on('error', (err, ctx) => {
	if ( ctx.url == '/favicon.ico' ) {
		console.log('get favicon.ico')
		return
	}
  console.error('server error', err, ctx)
  ctx.throw( err.status || 500, err)
})

app.listen(3000)

console.log('listening at localhost:3000')