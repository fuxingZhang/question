<template>
	<div class="category">
		<div class="left-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">问题</span>
					<div class="fr" >
			    	<el-button type="success">添加问题</el-button>
			    </div>
			  </div>
			  <div class="left-list">
			    <div v-for="(item,index) in items" :key="index" @click="show(index)">{{item.title}}</div>
			  </div>
			</el-card>
		</div>

		<div class="right-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">编辑问题</span>
			    <el-button type="danger" class="fr">删除</el-button>
			  </div>
			  <div>
			  	<el-input v-model="data.title" placeholder="请输入标题"></el-input>
			    <div v-for="(option,index) in options" :key="index" style="display: flex;margin-top: 15px;">
			    	<div style="flex:1;">
			    		<el-input v-model="option" placeholder="请输入内容"></el-input>
			    	</div>
			    	<div style="width: 50px;margin-left: 20px;">
			    		<el-input v-model="index" placeholder="" readonly></el-input>
			    	</div>
						<div style="width: 70px;margin-left: 20px;">
							<el-button type="danger">删除</el-button>
						</div>
			    </div>
			    <div style="margin: 15px 0;">
			    	<el-button style="width:100%;">新建选项</el-button>
			    </div>
					<div class="fr" style="margin-bottom: 25px;">
			    	<el-button type="success">确认</el-button>
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
			items:[],
			data:{
				title:'',
				options:[]
			}
		}
	},
	created(){
		this.getQuestions(this.$route.params.id,this.$route.params.query)
	},
	methods:{
		async getQuestions(id,query){
			let res = await API.getQuestions(id,query)
			console.log('quetions',res)
			this.title = res.title
			this.items = res.items
		},
		show(index){
			console.log(index)
		}
	}
}
</script>

<style>
.category{
  margin: 15px;
}
.category .left-box{
	margin-bottom: 15px;
}
.category .left-list>div{
	padding: 10px;
	font-size: 16px;
	-webkit-transition: all .3s;
	transition: all .3s;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	border-radius: 3px;
}
.category .left-list>div:hover{
  background-color: #2a3f54;
  color: #fff;
}
@media screen and (min-width: 992px) {
	.category{
		position: absolute;
		top: 70px;
		bottom: 0;
		left: 10%;
		right: 10%;
	  overflow: hidden;
	  display: flex;
	}
	.category .left-box{
		flex: 1;
		margin: 0 10px;
		height: 100%;
		position: relative;
	}
	.category .right-box{
		flex: 2;
		margin: 0 10px;
		position: relative;
	}
	.category .box-card{
		position: absolute;
		height: 96%;
		width: 100%;
	}
	.category .el-card__body{
		position: absolute;
		overflow-y: auto;
		top: 70px;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.category ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: none;
	}
}
</style>
