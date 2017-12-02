<template>
	<div class="report">
		<h1>{{this.$route.params.id.split('-')[1]}}的测评报告</h1>
		<div class="main" v-for="(item,index) in items" key="index">
			<h2>{{item.title}}</h2>
			<div v-html="item.content"></div>
		</div>
	</div>
</template>

<script>
import API from '@/API'

export default {
	data(){
		return{
			items:[]
		}
	},
	created(){
		this.getReport( this.$route.params.id )
	},
	methods:{
		async getReport(id){
			let res = await API.getReport(id)
			console.log(res.data)
			console.log(res.data.data)
			this.items = res.data.data
		}
	}
}
</script>

<style>
.report h1{
	text-align: center;
	padding: 20px 0 6px;
	font-size: 26px;
}
.report .main{
	margin: 15px;
	padding: 15px;
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
	border-bottom: 1px solid rgb(51,136,203)
}
.report .main h3{
	font-size: 16px;
	font-weight: normal;
	padding: 10px 0;
}
.report .main p{
	text-align: left;
	font-size: 16px;
	line-height: 2;
}
</style>