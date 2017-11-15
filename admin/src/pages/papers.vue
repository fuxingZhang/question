<template>
	<div class="papers">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="font-size: 18px;line-height: 36px;">问卷</span>
		    <div class="fr" >
		    	<router-link to="/admin/paper/create" class="btn">添加问卷</router-link>
		    </div>
		  </div>
		  <div>
  			<el-col v-for="paper in papers" :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<router-link :to="'/admin/paper/edit/' + paper.id">{{paper.title}}</router-link>
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
							<router-link :to="'/admin/paper/' + paper.id" class="btn-edit">类目管理</router-link>
							<a href="#" class="btn-produce">生成问卷</a>
						</p>
					</div>
  			</el-col>
			<!-- 
					生成问卷，弹窗，显示信息
	  			1、地址；
	  			2、二维码 
  		-->
		  </div>
		</el-card>
	</div>
</template>

<script>
import API from '@/API'

export default {
	data(){
		return{
			papers:{}
		}
	},
	created(){
		this.getPapers()
	},
	methods:{
		async getPapers(){
			let res = await API.getPapers()
			console.log('getPapers',res)
			this.papers = res.data
		}
	}
}
</script>

<style>
.papers{
  margin: 24px auto 60px;
  max-width: 880px;
}
.papers .list-box {
  position: relative;
  height: 240px;
  padding: 15px;
  margin: 10px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  box-shadow: 3px 3px 6px rgba(0,0,0,.1);
}
.papers .list-box h3 {
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.papers .list-box .line-box {
  margin-top: 20px;
}
.papers .list-box .line-box span {
  display: block;
  width: 50%;
  height: 2px;
  margin-bottom: 12px;
  background-color: #333;
}
.papers a {
  color: #2a3f54;
  text-decoration: none;
}
.papers a.underline:focus, a.underline:hover {
    color: #111921;
    text-decoration: underline;
}
.papers .list-box .line-box span:nth-of-type(4), .list-box .line-box span:nth-of-type(5), .list-box .line-box span:nth-of-type(6) {
  width: 70%;
}
@media screen and (max-width: 767px) {
	.papers{
	  margin: 24px 15px;
	}
}
</style>
