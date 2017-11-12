<template>
	<div class="paper">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="font-size: 18px;line-height: 36px;">问卷</span>
		    <div class="fr" >
		    	<router-link to="/" class="btn">添加问卷</router-link>
		    </div>
		  </div>
		  <div>
  			<el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<router-link to="/admin/paper/title/8">感统测评</router-link>
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
							<router-link to="/admin/category/8" class="btn-edit">类目管理</router-link>
							<a href="#" class="btn-produce">生成问卷</a>
						</p>
					</div>
  			</el-col>

<!--   			生成问卷，弹窗，显示信息
  			1、地址；
  			2、二维码 -->

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
							<a href="paper/8" class="btn-edit">类目管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">生成问卷</a>
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
							<a href="paper/8" class="btn-edit">类目管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">生成问卷</a>
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
							<a href="paper/8" class="btn-edit">类目管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">生成问卷</a>
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
							<a href="paper/8" class="btn-edit">类目管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">生成问卷</a>
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
							<a href="paper/8" class="btn-edit">类目管理</a> 
							<a href="#" data-toggle="modal" data-target="#reportModal" class="btn-produce">生成问卷</a>
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
		}
	}
</script>

<style>
.paper{
  margin: 24px auto 60px;
  max-width: 880px;
}
.paper .list-box {
  position: relative;
  height: 240px;
  padding: 15px;
  margin: 10px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  box-shadow: 3px 3px 6px rgba(0,0,0,.1);
}
.paper .list-box h3 {
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.paper .list-box .line-box {
  margin-top: 20px;
}
.paper .list-box .line-box span {
  display: block;
  width: 50%;
  height: 2px;
  margin-bottom: 12px;
  background-color: #333;
}
.paper a {
  color: #2a3f54;
  text-decoration: none;
}
.paper a.underline:focus, a.underline:hover {
    color: #111921;
    text-decoration: underline;
}
.paper .list-box .line-box span:nth-of-type(4), .list-box .line-box span:nth-of-type(5), .list-box .line-box span:nth-of-type(6) {
  width: 70%;
}
@media screen and (max-width: 767px) {
	.paper{
	  margin: 24px 15px;
	}
}
</style>
