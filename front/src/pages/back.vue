<template>
	<div class="back">
		<h1 class="p1">您提报的资料公司已收到，客服人员（15122294847）<br/>
			将在24小时内和您取得联系，请耐心等待。<br/>您也可以扫描二维码了解更多详情。</h1>
		<img class="er2" src="https://s1.ax1x.com/2017/12/20/XOOr4.jpg" />
	</div>
</template>

<script>
import API from '@/API'
import { XButton } from 'vux'
import echarts from 'echarts'
import er from '../er.jpg'
export default {
	components:{
		XButton
	},
	data(){
		return{
			er
		}
	},
	created(){

	},
	updated(){

	},
	methods:{

	}
}
</script>

<style>

.report .title{
	margin: 25px 0 20px 30px;
	font-size: 20px;
}
.report .base p{
	padding: 4px 0;
}
.report .main{
	margin: 15px;
	padding: 30px 15px 30px;
	border-color: #eee;
	border-radius: 1px;
	box-shadow: 0px 0px 10px 3px rgba(0,0,0,.1);
	margin-bottom: 22px;
	background-color: #fff;
	border: 1px solid transparent;
}
.report .main h2{
	text-align: center;
	font-size: 20px;
	padding-bottom: 5px;
	margin-bottom: 5px;
	border-bottom: 1px solid rgb(51,136,203);
	color: rgb(51,136,203);
	font-weight: normal;
}
.report .main h3{
	font-size: 16px;
	font-weight: normal;
	padding: 10px 0;
}
.p1{
	font-size: 16px;
	line-height: 2;
	text-align: center;
}
.back{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 80vh;
	margin-top: 3vw;
}
.er2{
	width: 80vw;
}
</style>
