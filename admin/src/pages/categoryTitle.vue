<template>
	<div class="category-title">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>编辑类目</span>
		  </div>
		  <div>
  			<el-input v-model="title" placeholder="请输入标题"></el-input>
  			<el-input
				  type="textarea"
				  class="textarea"
				  :autosize="{ minRows: 4, maxRows: 8}"
				  placeholder="请输入内容"
				  v-model="content">
				</el-input>
				<router-link to="/" class="btn">确认</router-link>
		  </div>
		</el-card>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				title:'',
				content:''
			}
		},
		created(){
		}
	}
</script>

<style>
.category-title{
  margin: 24px auto 60px;
  max-width: 880px;
}
.category-title .el-card__header {
  padding: 14px 20px;
}
.category-title .textarea{
	margin: 20px 0;
}
@media screen and (max-width: 767px) {
	.category-title{
	  margin: 24px 15px;
	}
}
</style>