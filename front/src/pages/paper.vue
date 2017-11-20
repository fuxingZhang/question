<template>
	<div class="paper">
		<div class="head">
			<h1>感统测评</h1>
			<p>感统测评</p>
		</div>
		<h2>感觉统合基础资料表</h2>
		<form>
			<group title="基础信息">
				<x-input  class="big" title="姓名" v-model="name" placeholder="请输入孩子姓名" required="required"></x-input>
				<div class="vux-x-input weui-cell">
					<div class="weui-cell__hd">
						<label for="vux-x-input-91qrc" class="weui-label">性别</label> 
					</div>
					<check-icon :value.sync="man" @click.native="woman=!woman" class="gender">男</check-icon>
					<check-icon :value.sync="woman" @click.native="man=!man">女</check-icon>
				</div>
				<datetime class="datepicker" v-model="birthday" title="出生日期" required></datetime>
		    <x-input class="big" title="监护人姓名" v-model="parentName" placeholder="监护人姓名" required></x-input>
		    <x-input type="number" pattern="[0-9]*" class="big" title="孩子年龄" v-model="age" placeholder="孩子年龄" required></x-input>
		    <x-input class="big" title="关系" v-model="relation" placeholder="与孩子关系" required></x-input>
		    <x-input class="big" title="职业" v-model="job" placeholder="请输入您的职业" required></x-input>
		    <x-input class="big" title="所在城市" v-model="address" placeholder="详细的联系地址" required></x-input>
		    <x-input class="big" title="联系电话" 
		    	v-model="phone" 
		    	pattern="[0-9]*"
		    	placeholder="请输入联系电话" 
		    	type="number" 
		    	required="required"></x-input>
		  </group>

		  <group title="一、孕期状况">
		  	<checklist title="1.孕期" 
		  		:options="['早产','足产','自然产','剖腹产']" 
		  		v-model="question1.first" 
		  		:max="1" required></checklist>
		  	<checklist title="2.母亲怀孕期间活动量" 
		  		:options="['足','不足']" 
		  		v-model="question1.second" 
		  		:max="1" required></checklist>
		  	<group title="3.父母生产时年龄">
		  		<x-input title="父亲" type="number" v-model="question1.third[0]" placeholder="请输入年龄（数字）" required></x-input>
		  		<x-input title="母亲" type="number" v-model="question1.third[1]" placeholder="请输入年龄（数字）" required></x-input>
		  	</group>
		  </group>

		  <group title="二、生长养育史">
		  	<checklist title="1.喂养情况" 
		  		:options="['母乳','人工','混合']" 
		  		v-model="question2.first[0]" 
		  		:max="1" required></checklist>
		  	<x-input class="long" title="几岁独立用小勺进餐" type="number" v-model="question2.first[1]" placeholder="请输入年龄（数字）" required></x-input>
		  	<checklist title="" 
		  		:options="['右手','左手','不分']" 
		  		v-model="question2.first[2]" 
		  		:max="1" required></checklist>

		  	<checklist title="2.运动发展情况" 
		  		:options="['婴儿期手脚自由活动','包裹“蜡烛包”']" 
		  		v-model="question2.second[0]" 
		  		:max="1" required></checklist>
		  	<x-input title="爬行时间" type="number" v-model="question2.second[1]" placeholder="请输入年龄（数字）" required></x-input>
		  	<checklist title="是否用学步车" 
		  		:options="['右手','左手','不分']" 
		  		v-model="question2.second[2]" 
		  		:max="1" required></checklist>

		  	<group title="3.安全感发展">
			  	<x-input class="long" title="两岁之前晚上和谁睡" v-model="question2.third[0]" placeholder="爷爷、奶奶、爸爸、妈妈" required></x-input>
			  	<checklist title="三岁之前和母亲是否有分离" 
			  		:options="['是','否']" 
			  		v-model="question2.third[1]" 
			  		:max="1" required></checklist>
			  	<checklist title="睡觉时需要依恋物" 
			  		:options="['是','否']" 
			  		v-model="question2.third[2]" 
			  		:max="1" required></checklist>
			  	<checklist title="习惯咬手指啃东西" 
			  		:options="['是','否']" 
			  		v-model="question2.third[3]" 
			  		:max="1" required></checklist>
		  	</group>
		  </group>

		  <group title="三、生活环境">
	  		<group title="1.养育方法"></group>

		  	<checklist title="父亲：" 
		  		:options="['宽','严','放任','普通','不定']" 
		  		v-model="question3.first[0]" 
		  		:max="1" required></checklist>

		  	<checklist title="母亲：" 
		  		:options="['宽','严','放任','普通','不定']" 
		  		v-model="question3.first[1]" 
		  		:max="1" required></checklist>

		  	<checklist title="养育者与孩子沟通时间" 
		  		:options="['长','短','没有']" 
		  		v-model="question3.first[2]" 
		  		:max="1" required></checklist>

		  	<checklist title="密切程度" 
		  		:options="['很密切','密切','一般','不密切']" 
		  		v-model="question3.first[3]" 
		  		:max="1" required></checklist>

		  	<checklist title="沟通方式" 
		  		:options="['鼓励肯定多','批评否定多']" 
		  		v-model="question3.first[4]" 
		  		:max="1" required></checklist>

		  	<x-input class="long" title="沟通方式" v-model="question3.second" placeholder="沟通方式" required></x-input>

		  	<x-input class="long" title="父母夫妻关系如何" v-model="question3.third" placeholder="很好、好、还不错、不好" required></x-input>
		  </group>

		  <checklist title="四、语言现状（多选）" 
				:options="['口吃','发音不清','自言自语','固定音调','鹦鹉学舌','发音困难','说话声小','不爱讲话','其他']" 
				v-model="question5" required></checklist>

		  <checklist title="五、行为表现（多选）" 
				:options="['小动作多（吸手指、摸生殖器等）','注意力不集中，东张西望','攻击他人','自伤行为','多动','刻板行为','其他']" 
				v-model="question5" required></checklist>

		  <checklist title="六、情绪反应（多选）" 
				:options="['爱生气','常哭、闹、笑','极端恐惧（怕声音、怕黑）','摔东西、扔东西','不满足时常发脾气','其他']" 
				v-model="question6" required></checklist>

			<group title="七、请家长详细描述儿童目前的问题和困难以及家长的困扰。">
				<x-textarea v-model="question7" :rows="6"></x-textarea>
			</group>

			<h2>感觉统合评定量表</h2>

			<checklist v-for="(item,index) in common" 
				:key="index"
				:title="item.title" 
				:options="item.options" 
				v-model="item.value" 
				:max="1"></checklist>

			<div style="padding:30px 15px 10px;">
				<x-button action-type="submit" type="primary" @click.native="submit($event)">提交</x-button>
			</div>
		</form>
	</div>
</template>

<script>
import API from '@/API'

import { Cell,Group,XInput,CheckIcon,Datetime,Checklist,XTextarea,XButton,Toast } from 'vux'

export default {
	components:{
		Cell,
		Group,
		XInput,
		CheckIcon,
		Datetime,
		Checklist,
		XTextarea,
		XButton,
		Toast
	},
	data(){
		return{
			id:null,
			query:null,
			name: '',
			man: true,
			woman: false,
			birthday:'',
			parentName:'',
			age:'',
			relation:'',
			job:'',
			address:'',
			parentName:'',
			phone:'',
			question1:{
				first:[''],
				second:[''],
				third:['','']
			},
			question2:{
				first:[[''],'',['']],
				second:[[''],'',['']],
				third:['',[''],[''],['']]
			},
			question3:{
				first:[[''],[''],[''],[''],['']],
				second: '',
				third: ''
			},
			question4:[],
			question5:[],
			question6:[],
			question7:'',
			common: [
				{
					title:'999',
					options:['没有','很少','偶尔','常常','总是'],
					value:[]
				}
			],
		}
	},
	created(){
		console.log(this.$route.params)
		this.id = this.$route.params.id
		console.log(this.id)
		this.get()
	},
	methods:{
		async get(){
			let res = await API.get(this.id)
			console.log(res.data)
			console.log(res.data.data)
			this.common = res.data.data
		},
		async submit(event){
			let res = await API.submit(this.id,this.$data)
			console.log(res.data)
			event.preventDefault()
		}
	}
}
</script>

<style>
.paper>.head {
  padding: 1rem;
}
.paper>.head>h1 {
	line-height: 1.6em;
  margin-bottom: .75rem;
  font-size: 20px;
  font-weight: 400;
}
.paper>.head>p {
  font-size: 14px;
  color: #888;
}
.paper h2{
  font-size: 18px;
  color: #333;
  text-align: center;
  margin: 20px auto 10px;
  padding: 0 1rem .5rem;
  font-weight: normal;
}
.paper .weui-cells__title{
	font-size: 16px;
}
.paper .weui-cells{
	font-size: 14px;
}
.paper .weui-cell__ft {
  text-align: left;
}
.paper .datepicker>div{
	width: 105px;
}
.paper .vux-x-input.weui-cell.big .weui-label{
	width: 105px !important;
}
.paper .vux-x-input.weui-cell.long .weui-label{
	width: 150px !important;
}
</style>