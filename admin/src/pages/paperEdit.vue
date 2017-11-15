<template>
	<div class="paper-edit">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>编辑问卷</span>
		  </div>
		  <div>
  			<el-input v-model="paper.title" placeholder="请输入标题"></el-input>
  			<el-input
				  type="textarea"
				  class="textarea"
				  resize="none"
				  :autosize="{ minRows: 4, maxRows: 8}"
				  placeholder="请输入内容"
				  v-model="paper.description">
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
			paper:{
				title:'',
				description:'',
			},
			disabled:false,
			id:null
		}
	},
	created(){
		this.id = this.$route.params.id
		this.getPaper(this.id)
	},
	methods:{
		async getPaper(id){
			let res = await API.getPaper(id)
			console.log('paper by id',res)
			this.paper = res.data
		},
		async submit(){
			if( !this.paper.title ){
				this.$message({
	        showClose: true,
	        message: '请输入标题',
	        type: 'error'
	      });
				return
			}
			this.disabled = true
			//paper内包含了后端传回的id
			let res = await API.updatePaper(this.paper)
			console.log('updatePaper',res)
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
.paper-edit{
  margin: 24px auto 60px;
  max-width: 880px;
}
.paper-edit .textarea{
	margin: 20px 0;
}
.paper-edit .el-card__header {
  padding: 14px 20px;
}
@media screen and (max-width: 767px) {
	.paper-edit{
	  margin: 24px 15px;
	}
}
</style>
