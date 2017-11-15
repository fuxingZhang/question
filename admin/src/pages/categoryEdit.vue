<template>
	<div class="category-edit">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>编辑类目</span>
		    <el-button type="danger" @click="remove" class="fr">删除</el-button>
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
				<el-button type="success" @click="submit" :disabled="disabled">确认</el-button>
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
	created(){
		this.getCategory(this.$route.params.id,this.$route.params.query)
	},
	methods: {
		async getCategory(id,query){
			let res = await API.getCategory(id,query)
			console.log('category by id',res)
			this.data = res.data
		},
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
			let res = await API.updateCategory(this.$route.params.id, this.$route.params.query, this.data)
			console.log('updateCategory',res)
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
		},
		async remove(){
      let confirm = await this.$confirm('此操作将永久删除该类目，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).catch( (err) =>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
      if( !confirm ) return
			let res = await API.deleteCategory(this.$route.params.id, this.$route.params.query)
			console.log('deleteCategory',res)
			this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if( res.status == 200 ){
      	this.$router.go(-1)
      }
		}
	}
}
</script>

<style>
.category-edit{
  margin: 24px auto 60px;
  max-width: 880px;
}
.category-edit .el-card__header {
  padding: 14px 20px;
}
.category-edit .textarea{
	margin: 20px 0;
}
@media screen and (max-width: 767px) {
	.category-edit{
	  margin: 24px 15px;
	}
}
</style>