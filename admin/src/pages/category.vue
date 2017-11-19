<template>
	<div class="category">
		<div class="left-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">问题</span>
					<div class="fr" >
			    	<el-button type="success" @click="addQuestion">添加问题</el-button>
			    </div>
			  </div>
			  <div class="left-list">
			    <div v-for="(item,index) in items" :keys="index" @click="show(index)">{{item.title}}</div>
			  </div>
			</el-card>
		</div>

		<div class="right-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">{{title}}</span>
			    <el-button v-show="currentIndex != null" 
			    	type="danger" 
			    	class="fr" 
			    	@click="questionDelete(currentIndex)">删除</el-button>
			  </div>
			  <div>
			  	<el-input v-model="data.title" placeholder="请输入标题"></el-input>
			    <div v-for="(option,index) in data.options" 
			    	:keys="index" 
			    	style="display: flex;margin-top: 15px;">
			    	<div style="flex:1;">
			    		<el-input :value="option" placeholder="请输入内容"></el-input>
			    	</div>
			    	<div class="index">
			    		<el-input :value="index+1" placeholder="" readonly style="text-align: center;"></el-input>
			    	</div>
						<div style="width: 70px;margin-left: 20px;">
							<el-button type="danger" @click="remove(index)">删除</el-button>
						</div>
			    </div>
			    <div style="margin: 15px 0;">
			    	<el-button style="width:100%;" @click="add">新建选项</el-button>
			    </div>
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
			title:'添加问题',
			items:[],
			data:{
				title:'',
				options:[]
			},
			id:null,
			query:null,
			currentIndex: null
		}
	},
	created(){
		this.init()
		this.id = this.$route.params.id
		this.query = this.$route.params.query
		this.getQuestions(this.id, this.query)
	},
	methods:{
		init(){
			this.title = '添加问题'
			this.data = {
				title:'',
				options:['没有','很少','偶尔','常常','总是']
			}
		},
		async getQuestions(id,query){
			let res = await API.getQuestions(id,query)
			console.log('quetions',res)
			this.items = res.data.items
		},
		addQuestion(){
			this.init()
			this.currentIndex = null
		},
		async questionDelete(index){
			let res = await API.questionDelete(this.id,this.query,index)
			console.log('questionsDelete',res)
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
			this.title = '编辑问题'
			this.data = this.items[index]
			this.currentIndex = index
		},
		add(){
			this.data.options.push('新增')
		},
		remove(index){
			this.data.options = this.data.options.filter(function(item,i){
				return i != index
			})
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
			if( this.data.options.length == 0 ){
        this.$message({
          showClose: true,
          message: '选项不能为空',
          type: 'error'
        });
				return
			}
			this.items.push(this.data)
			console.log(this.items)
			let res = await API.questionsEdit(this.id,this.query,this.items)
			console.log('questionsEdit',res)
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
.category .index{
	width: 40px;
	margin-left: 20px;
}
.category .index .el-input__inner {
	text-align: center;
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
	.category .index{
		width: 60px;
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
