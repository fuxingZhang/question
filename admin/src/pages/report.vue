<template>
	<div class="report">
		<div class="left-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">报告</span>
					<div class="fr" >
			    	<el-button type="success">添加报告</el-button>
			    </div>
			  </div>
			  <div class="left-list">
			    <div>前庭觉触觉正常 ----> 11分至16分 </div>
			    <div>前庭觉触觉正常 ----> 11分至16分 </div>
			    <div>前庭觉触觉正常 ----> 11分至16分 </div>
			    <div>前庭觉触觉正常 ----> 11分至16分 </div>
			    <div>前庭觉触觉正常 ----> 11分至16分 </div>
			    <div>前庭觉触觉正常 ----> 11分至16分 </div>
			  </div>
			</el-card>
		</div>

		<div class="right-box">
			<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span style="font-size: 18px;line-height: 40px;">添加测评报告</span>
			    <el-button type="danger" class="fr">删除</el-button>
			  </div>
			  <div>
					<el-form label-position="right" label-width="80px">
					  <el-form-item label="标题" >
					    <el-input v-model="title" placeholder="请输入标题"></el-input>
					  </el-form-item>
					</el-form>

			  	<el-row>
					  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form label-position="right" label-width="80px">
							  <el-form-item label="最小分值">
							    <el-input v-model="title" placeholder="最小分值（包括等于）"></el-input>
							  </el-form-item>
							</el-form>
					  </el-col>
					  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form label-position="right" label-width="80px">
							  <el-form-item label="最大分值">
							    <el-input v-model="title" placeholder="最大分值（包括等于）"></el-input>
							  </el-form-item>
							</el-form>
					  </el-col>
					</el-row>

					<el-form label-position="right" label-width="80px">
					  <el-form-item label="内容">
					    <el-input
							  type="textarea"
							  :autosize="{ minRows: 10, maxRows: 14}"
							  placeholder="请输入内容"
							  v-model="content">
							</el-input>
					  </el-form-item>
					</el-form>
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
				title:'',
				content:'',
				max:'',
				min:''
			}
		},
		created(){
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
	font-size: 18px;
	-webkit-transition: all .3s;
	transition: all .3s;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	border-radius: 3px;
}
.report .left-list>div:hover{
  background-color: #2a3f54;
  color: #fff;
}
@media screen and (min-width: 992px) {
	.report{
		position: absolute;
		top: 70px;
		bottom: 0;
		left: 10%;
		right: 10%;
	  overflow: hidden;
	  display: flex;
	}
	.report .left-box{
		flex: 1;
		margin: 0 10px;
		height: 100%;
		position: relative;
	}
	.report .right-box{
		flex: 2;
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
