<template>
	<div class="category">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="font-size: 18px;line-height: 36px;">感统测评</span>
		    <div class="fr" >
		    	<router-link to="/admin/category/create/8" class="btn">添加类目</router-link>
		    </div>
		  </div>
		  <div>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<router-link to="/admin/category/title/8">一. 前庭平衡和大脑分化</router-link>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<a href="/admin/category/edit/8" class="btn-edit">问题管理</a> 
							<a href="/admin/report/8" data-toggle="modal" data-target="#reportModal" class="btn-produce">测评报告</a>
						</p>
					</div>
  			</el-col>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<a class="underline" href="/8">感统测评</a>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<a href="paper/8" class="btn-edit">问题管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">测评报告</a>
						</p>
					</div>
  			</el-col>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<a class="underline" href="/8">三. 触觉防御过多、不足</a>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<a href="paper/8" class="btn-edit">问题管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">测评报告</a>
						</p>
					</div>
  			</el-col>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<a class="underline" href="/8">感统测评</a>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<a href="paper/8" class="btn-edit">问题管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">测评报告</a>
						</p>
					</div>
  			</el-col>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<a class="underline" href="/8">感统测评</a>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<a href="paper/8" class="btn-edit">问题管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">测评报告</a>
						</p>
					</div>
  			</el-col>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<a class="underline" href="paper/8">感统测评</a>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<a href="paper/8" class="btn-edit">问题管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">测评报告</a>
						</p>
					</div>
  			</el-col>
		  </div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return{

			}
		},
		created(){
			console.log(this.$route.params.id)
		}
	}
</script>

<style>
.category{
  margin: 24px auto 60px;
  max-width: 880px;
}
.category .btn{
	font-weight: 400;
	text-shadow: none;
	border-radius: 1px;
	color: #fff;
	background-color: #42b983;
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	touch-action: manipulation;
  border: 1px solid #3ba676;
  padding: 6px 12px;
  user-select: none;
}
.category .btn:hover{
	background-color: #359368;
	border-color: #2b7956;
	outline: 0;
}
.category .list-box {
  position: relative;
  height: 240px;
  padding: 15px;
  margin: 10px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  box-shadow: 3px 3px 6px rgba(0,0,0,.1);
}
.category .list-box h3 {
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.category .list-box .line-box {
  margin-top: 20px;
}
.category .list-box .btn-group {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  -webkit-display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.category .list-box .btn-group a.btn-edit, .list-box .btn-group a.btn-produce {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 0 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
}
.category .list-box .btn-group a.btn-edit {
   background-color: #2a3f54;
}
.category .list-box .btn-group a.btn-produce {
    background-color: #f66;
}
.category .list-box .btn-group a.btn-edit:hover, .list-box .btn-group a.btn-produce:hover {
    opacity: .8;
}
.category .list-box .line-box span {
  display: block;
  width: 50%;
  height: 2px;
  margin-bottom: 12px;
  background-color: #333;
}
.category a {
  color: #2a3f54;
  text-decoration: none;
}
.category a.underline:focus, a.underline:hover {
    color: #111921;
    text-decoration: underline;
}
.category .list-box .line-box span:nth-of-type(4), .list-box .line-box span:nth-of-type(5), .list-box .line-box span:nth-of-type(6) {
  width: 70%;
}
.category .el-card__header {
  padding: 14px 20px;
}
@media screen and (max-width: 767px) {
	.category{
	  margin: 24px 15px;
	}
}
</style>