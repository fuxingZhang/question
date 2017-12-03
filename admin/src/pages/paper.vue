<template>
	<div class="paper">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="font-size: 18px;line-height: 36px;">感统测评</span>
		    <div class="fr" >
		    	<router-link :to="'/admin/paper/'+ id +'/category/create'" class="btn">添加类目</router-link>
		    </div>
		  </div>
		  <div>
  			<el-col v-for="(item,index) in categories" :key="index" :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<router-link :to="'/admin/paper/'+id+'/category/edit/'+item.id">{{item.title}}</router-link>
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
							<router-link class="btn-edit" :to="'/admin/paper/'+id+'/category/'+item.id">问题管理</router-link>
							<router-link class="btn-produce" :to="'/admin/paper/'+id+'/report/'+item.id">测评报告</router-link>
						</p>
					</div>
  			</el-col>
		  </div>
		</el-card>
	</div>
</template>

<script>
import API from '@/API'

export default {
	data(){
		return{
			categories: {},
			id:null
		}
	},
	created(){
		this.id = this.$route.params.id
		this.getCategories(this.id)
	},
	methods:{
		async getCategories(id){
			let res = await API.getCategories(id)
			console.log(res)
			if( res.err ) return
			this.categories = res.data.categories
			console.log(this.categories)
		}
	}
}
</script>

<style>
.paper{
  margin: 24px auto 60px;
  max-width: 880px;
}
.paper .btn{
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
.paper .btn:hover{
	background-color: #359368;
	border-color: #2b7956;
	outline: 0;
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
.paper .list-box .btn-group {
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
.paper .list-box .btn-group a.btn-edit, .list-box .btn-group a.btn-produce {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 0 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
}
.paper .list-box .btn-group a.btn-edit {
   background-color: #2a3f54;
}
.paper .list-box .btn-group a.btn-produce {
    background-color: #f66;
}
.paper .list-box .btn-group a.btn-edit:hover, .list-box .btn-group a.btn-produce:hover {
    opacity: .8;
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
.paper .el-card__header {
  padding: 14px 20px;
}
@media screen and (max-width: 767px) {
	.paper{
	  margin: 24px 15px;
	}
}
</style>