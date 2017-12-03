<template>
	<div class="report">
		<h1>{{paper_name}}（报告）</h1>
		<p class="title">一、基础资料</p>
		<div class="main base">
			<p>姓名：{{answer.name}}</p>
			<p>性别：{{answer.man ? '男' : '女'}}</p>
			<p>出生日期：{{answer.birthday}}</p>
			<p>监护人姓名：{{answer.parentName}}</p>
			<p>孩子年龄：{{answer.age}}</p>
			<p>关系：{{answer.relation}}</p>
			<p>职业：{{answer.job}}</p>
			<p>联系地址：{{answer.address}}</p>
			<p>联系电话：{{answer.phone}}</p>
		</div>
		<p class="title">二、测评解读</p>
		<div class="main">
			<h2>关于祥和家庭</h2>
			<p style="margin-top: 15px;">祥和家庭的感觉综合评测标准依据儿童心理及智能运动的发展规律为基础，整合台湾奇德儿测评系统及“众望家学园”近10年的研究实践结果，让家长、老师、专业人员已科学的方式，对儿童感觉综合的发展有全面、深入的了解，让儿童在最强（0-6岁）最有效（6-12岁）的年龄段，提升天花板的高度，提升学习效率、弥补弱项，让优者更优。</p>
		</div>
		<p class="title">三、测评报告结果</p>
		<div class="main">
			<h2 style="margin-bottom: 30px;">图表对比</h2>
			<div ref="myChart" style="width: 100%;height:400px;"></div>
			<p style="margin-top: 15px;">“感觉统合”是大脑和身体相互协调的学习过程。指机体在环境内有效利用自己的器官，以不同的感觉通路（视觉、听觉、味觉、嗅觉、触觉、前庭觉和本体等）从环境中获得信息输入大脑，大脑再对其信息进行加工处理，并做出适应性反应的能力，其中，前庭觉、触觉、本体觉是非常重要且关键的三大觉。</p>
		</div>
		<div class="main" v-for="(item,index) in items" key="index">
			<h2>{{item.title}}</h2>
			<div v-html="item.content"></div>
		</div>
		<p style="margin: 25px 0 20px 30px;font-size: 20px;">四、综合建议</p>
		<div class="main">
			<h2>综合建议</h2>
			<p style="margin-top: 15px;">您的孩子处在{{ageRange}}年龄段，为{{answer.question1.first[0]}}，经过测评，{{result}}。</p>
			<p style="margin-top: 15px;">若想进一步了解孩子报告及更多详细信息，请联系客服老师：15122294847（微信号同手机号）</p>
		</div>
		<div class="main">
			<h2>详细建议</h2>
			<div style="margin-top: 30px;"></div>
			<x-button plain type="primary">常规训练计划</x-button>
		</div>
		<div class="main">
			<h2>我们的祝福</h2>
			<p style="margin-top: 15px;">感谢您智慧的家长，教育最大的成本不是金钱而是时间，孩子的成长是单行道，一旦错过了，花多少时间都无法弥补错失的遗憾。"不让孩子输在起跑线上"，真正的起跑线是家长的教育理念，只有家长好好学习，孩子才能天天向上！</p>
		</div>
		<div class="main">
			<x-button plain type="primary" link="BACK">返回重新测评</x-button>
		</div>
	</div>
</template>

<script>
import API from '@/API'
import { XButton } from 'vux'
import echarts from 'echarts'

export default {
	components:{
		XButton
	},
	data(){
		return{
			paper_name: '',
			items: [],
			answer: {
				name:'',
				question1:{
					first: []
				}
			},
			result: '不存在失调倾向',
			ageRange: '0 ~ 3岁',
			scores:[],
			commonScores:[]
		}
	},
	created(){
		this.getReport( this.$route.params.id )
		this.getAnswer( this.$route.params.id )
	},
	updated(){
		const myChart = echarts.init(this.$refs.myChart);
		myChart.setOption({
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data:['正常','您的值'],
      textStyle : {
				fontSize : 14
			}
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ["前庭觉", "触觉", "本体觉"],
	      axisLabel : {
					fontSize : 14
				}
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
        {
          name:'正常',
          type:'bar',
          data:this.commonScores,
          itemStyle:{  
          	normal:{  
             	color: 'rgba(1,152,101,.8)'
            }  
          },
        },
        {
          name:'您的值',
          type:'bar',
          data:this.scores,
          itemStyle:{  
          	normal:{  
             	color: 'rgba(0,173,239,.8)'
            }  
          },
        }
		   ]
		});
	},
	methods:{
		async getReport(id){
			let res = await API.getReport(id)
			console.log(res.data)
			console.log(res.data.data)
			this.paper_name = res.data.paper_name
			//分数处理合并
			let scores = res.data.scores
			let commonScores = res.data.commonScores.map( (item) =>{
				return +item
			})
			this.scores = [scores[0]+scores[1]+scores[5], scores[2], scores[3]]
			this.commonScores = [commonScores[0]+commonScores[1]+commonScores[5], commonScores[2], commonScores[3]]
			console.log(this.scores)
			console.log(this.commonScores)

			this.items = res.data.data.filter( (item) =>{
				return item.title.indexOf('空间') == -1 && item.title.indexOf('重力') == -1
			})
			//是否失调
			let data = ''
			for(let item of this.items){
				data += item.title
			}
			if( data.indexOf('可能存在的问题') ){
				this.result = '存在失调倾向'
			}
		},
		async getAnswer(id){
      let res = await API.getAnswer(id)
      console.log(res)
      // 年龄段
			const age = +res.data.age
			if( age > 12 ){
				this.ageRange = '12岁以上'
			}else if( age>6 && age <=12 ){
				this.ageRange = '6 ~ 12岁'
			}else if( age>3 && age <=6 ){
				this.ageRange = '3 ~ 6岁'
			}else{
				this.ageRange = '0 ~ 3岁'
			}
      if( res.data.question1.first[0] == '自然产' ){
      	res.data.question1.first[0] = '自然生产'
      }
      this.answer = res.data
    }
	}
}
</script>

<style>
.report h1{
	padding: 20px;
	font-size: 24px;
	background: rgb(51,136,203);
	color: #fff;
	font-weight: normal;
}
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
.report .main p{
	text-align: left;
	font-size: 16px;
	line-height: 2;
}
</style>