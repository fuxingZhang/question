<template>
	<div class="category-edit">
		<div class="left-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">问题</span>
					<div class="fr" >
			    	<el-button type="success">添加问题</el-button>
			    </div>
			  </div>
			  <div class="left-list">
			    <div>1. 儿童特别爱玩旋转圆凳或飞转设施，长时间不觉晕，或者略晕却特别喜欢晕的感觉。</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
			    <div>111</div>
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
			  	<el-input v-model="input" placeholder="请输入标题"></el-input>
			    <div v-for="item in 5" style="display: flex;margin-top: 15px;">
			    	<div style="flex:1;">
			    		<el-input v-model="input" placeholder="请输入内容"></el-input>
			    	</div>
			    	<div style="width: 70px;margin-left: 20px;">
			    		<el-input v-model="input" placeholder=""></el-input>
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
	export default {
		data(){
			return{

			}
		},
		created(){
		}
	}
</script>

<style>
.category-edit{
  margin: 15px;
}
.category-edit .left-box{
	margin-bottom: 15px;
}
.category-edit .left-list>div{
	padding: 10px;
	font-size: 16px;
	-webkit-transition: all .3s;
	transition: all .3s;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	border-radius: 3px;
}
.category-edit .left-list>div:hover{
  background-color: #2a3f54;
  color: #fff;
}
@media screen and (min-width: 992px) {
	.category-edit{
		position: absolute;
		top: 70px;
		bottom: 0;
		left: 10%;
		right: 10%;
	  overflow: hidden;
	  display: flex;
	}
	.category-edit .left-box{
		flex: 1;
		margin: 0 10px;
		height: 100%;
		position: relative;
	}
	.category-edit .right-box{
		flex: 2;
		margin: 0 10px;
		position: relative;
	}
	.category-edit .box-card{
		position: absolute;
		height: 96%;
		width: 100%;
	}
	.category-edit .el-card__body{
		position: absolute;
		overflow-y: auto;
		top: 70px;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.category-edit ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: none;
	}
}
</style>
