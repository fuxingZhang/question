<template>
	<div class="category-create">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>添加类目</span>
		  </div>
		  <div>
  			<el-input v-model="data.title" placeholder="请输入标题"></el-input>
  			<el-input
				  type="textarea"
				  class="textarea"
				  resize="none"
				  :autosize="{ minRows: 4, maxRows: 8}"
				  placeholder="请输入内容"
				  v-model="data.description">
				</el-input>
				<el-button type="success" @click="submit" :disabled="disabled">保存</el-button>
		  </div>
		</el-card>
	</div>
</template>

<script>
import API from '@/API'

export default {
	data(){
		return{
			data:{
				title:'',
				description:''
			},
			disabled:false
		}
	},
	methods: {
		async submit(){
			if( !this.data.title ){
				this.$message({
	        showClose: true,
	        message: '请输入标题',
	        type: 'error'
	      });
				return
			}
			this.disabled = true
			let res = await API.createCategory(this.$route.params.id, this.data)
			console.log('createCategory',res)
			this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if( res.status == 200 ){
      	this.$router.go(-1)
      }else{
      	this.disabled = false
      }
		}
	}
}
</script>

<style>
.category-create{
  margin: 24px auto 60px;
  max-width: 880px;
}
.category-create .el-card__header {
  padding: 14px 20px;
}
.category-create .textarea{
	margin: 20px 0;
}
@media screen and (max-width: 767px) {
	.category-create{
	  margin: 24px 15px;
	}
}
</style>