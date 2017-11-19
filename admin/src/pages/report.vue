<template>
	<div class="report">
		<div class="left-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">报告</span>
					<div class="fr" >
			    	<el-button type="success" @click="addReport">添加报告</el-button>
			    </div>
			  </div>
			  <div class="left-list">
			    <div v-for="(item,index) in items" 
			    	:keys="index" 
			    	@click="show(index)">{{item.title}} ----> {{item.min}}分至{{item.max}}分</div>
			  </div>
			</el-card>
		</div>

		<div class="right-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">{{title}}</span>
			    <el-button type="danger" 
			    	class="fr"
			    	v-show="currentIndex != null" 
			    	@click="deleteReport(currentIndex)">删除</el-button>
			  </div>
			  <div>
					<el-form label-position="right" label-width="80px">
					  <el-form-item label="标题" >
					    <el-input v-model="data.title" placeholder="请输入标题"></el-input>
					  </el-form-item>
					</el-form>

			  	<el-row>
					  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form label-position="right" label-width="80px">
							  <el-form-item label="最小分值">
							    <el-input v-model="data.min" placeholder="最小分值（包括等于）"></el-input>
							  </el-form-item>
							</el-form>
					  </el-col>
					  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form label-position="right" label-width="80px">
							  <el-form-item label="最大分值">
							    <el-input v-model="data.max" placeholder="最大分值（包括等于）"></el-input>
							  </el-form-item>
							</el-form>
					  </el-col>
					</el-row>

					<el-form label-position="right" label-width="80px">
					  <el-form-item label="内容">
					    <el-input
							  type="textarea"
							  resize="none"
							  :autosize="{ minRows: 7, maxRows: 10}"
							  placeholder="请输入内容"
							  v-model="data.content">
							</el-input>
					  </el-form-item>
					</el-form>
					<div class="fr" style="margin-bottom: 25px;">
			    	<el-button type="success" @click="submit">确认</el-button>
			    </div>
			  </div>
			</el-card>
		</div>

	</div>
</template>

<script>
import API from '@/API'

export default {
	data(){
		return{
			data:{
				title:'',
				max:'',
				min:'',
				content:''
			},
			title:'添加报告',
			items:[],
			id:null,
			query:null,
			currentIndex: null
		}
	},
	created(){
		this.id = this.$route.params.id
		this.query = this.$route.params.query
		this.getReports(this.id, this.query)
	},
	methods:{
		init(){
			this.title = '编辑报告'
			this.data = {
				title:'',
				max:'',
				min:'',
				content:''
			}
		},
		async getReports(id,query){
			let res = await API.getReports(id,query)
			console.log('getReports',res)
			this.items = res.data.items
		},
		addReport(){
			this.init()
			this.currentIndex = null
		},
		async deleteReport(index){
			let res = await API.deleteReport(this.id,this.query,index)
			console.log('deleteReport',res)
			if( res.status == 200 ){
				this.items = this.items.filter(function(item,i){
					return i != index
				})
				this.init()
			}
			this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
		},
		show(index){
			this.title = '编辑报告'
			this.data = this.items[index]
			this.currentIndex = index
		},
		async submit(){
			if( !this.data.title ){
        this.$message({
          showClose: true,
          message: '标题不能为空',
          type: 'error'
        });
				return
			}
			if( !this.data.max ){
        this.$message({
          showClose: true,
          message: '最大分值不能为空',
          type: 'error'
        });
				return
			}
			if( !this.data.title ){
        this.$message({
          showClose: true,
          message: '最小分值不能为空',
          type: 'error'
        });
				return
			}
			if( !this.data.content ){
        this.$message({
          showClose: true,
          message: '内容不能为空',
          type: 'error'
        });
				return
			}
			this.items.push(this.data)
			console.log(this.items)
			let res = await API.reportsEdit(this.id,this.query,this.items)
			console.log('reportsEdit',res)
			this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
			res.status == 200 ? this.init() : this.items.pop()
		}
	}
}
</script>

<style>
.report{
  margin: 15px;
}
.report .left-box{
	margin-bottom: 15px;
}
.report .left-list>div{
	padding: 10px;
	font-size: 16px;
	-webkit-transition: all .3s;
	transition: all .3s;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	border-radius: 3px;
	font-family: Raleway,sans-serif;
}
.report .left-list>div:hover{
  background-color: #2a3f54;
  color: #fff;
}
@media screen and (min-width: 992px) {
	.report{
		position: absolute;
		top: 65px;
		bottom: 0;
		left: 8%;
		right: 8%;
	  overflow: hidden;
	  display: flex;
	}
	.report .left-box{
		flex: 6;
		margin: 0 10px;
		height: 100%;
		position: relative;
	}
	.report .right-box{
		flex: 11;
		margin: 0 10px;
		position: relative;
	}
	.report .box-card{
		position: absolute;
		height: 90%;
		width: 100%;
	}
	.report .el-card__body{
		position: absolute;
		overflow-y: auto;
		top: 70px;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.report ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: none;
	}
}
</style>
