<template>
	<div class="paper-title">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>编辑问卷</span>
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
				<router-link to="/" class="btn">保存</router-link>
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
.paper-title{
  margin: 24px auto 60px;
  max-width: 880px;
}
.paper-title .textarea{
	margin: 20px 0;
}
.paper-title .el-card__header {
  padding: 14px 20px;
}
@media screen and (max-width: 767px) {
	.paper-title{
	  margin: 24px 15px;
	}
}
</style>
