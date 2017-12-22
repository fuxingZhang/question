<template>
	<div class="paper">
		<div class="head">
			<h1 class="textcenter">祥和家庭介绍</h1>
			<p class="textp">天津祥和家庭文化传播有限公司，自2013年成立以来，得到全国妇联、市妇联及各区妇联领导的关心和支持，2015年被评为“市级示范家园”。拥有国内外顶尖的家庭教育和身心成长的导师团队，致力于家庭教育、亲子关系、幼儿教育、感觉统合训练等儿童身心健康快乐成长的相关培训、咨询服务。
祥和家庭的感觉统合评测标准依据儿童心理及智能运动发展规律为基础，整合台湾奇德儿测评系统及众望家学园近10年的研究实践结果，让家长，老师，专业人员以科学的方式，对儿童感觉统合的发展进行全面，深入的了解，让儿童在最强(0-6岁)，最有效(6-12岁)的年龄段，提升天花板的高度，提升学习效率，弥补弱项，让优者更优。
由冯绍伟专家带领祥和团队主持申报的“创新家庭感统训练方法促进儿童心智发展的研究”的课题已被列为国家教师科研十二五规划重点课题“教师专业发展研究”的专项研究课题。

我们的愿景：
让每个家庭祥和、幸福
让每个孩子身心健康的成长
我们的使命：
凝聚社会爱心力量
提升家庭幸福指数
我们的价值观：
诚信负责 精准服务
合作共赢 自我成长
</p>
		</div>

		<div class="head">
			<h1 class="textcenter">感觉统合介绍</h1>
			<p class="textp">“感觉统合”这个名词被越来越多的家长所熟知。什么叫做“感觉统合”呢？简单点说，感觉统合是一种大脑和身体相互协调的学习过程。
感觉统合是指将人体器官的视觉，听觉，嗅觉，味觉，触觉，前庭觉和本体觉等感觉信息整合起来，经大脑组合作出反应。其中触觉，前庭觉，本体觉是最主要的三大感觉系统。
因不当的生活环境及成长坏境，使幼儿在成长的关键期大脑与感觉器官未得到充分刺激，导致感觉统合失调。
感觉统合失调是指外部的感觉刺激讯息无法在儿童的大脑神经系统进行有效组合，而使机体不能和谐运作，久而久之形成各种障碍最终影响身心健康。现代都市化家庭中，感统失调的孩子高达85%，其中约有30%的孩子为重度感统失调。
多数时候孩子做出来的一些家长认为是他表现不好的事情，比如：情绪不稳定、人际交往差、学习力差、专注力差、坐不住、站没站相，坐没坐相等等的时候，其实那并不是孩子的本意，而是感觉统合失调的表现。
感觉统合训练可以有效的改善儿童感觉统合失调，感觉统合训练做得越早对孩子发育越有效，最迟不能超过12周岁。如果超过12周岁，孩子的有效训练期就会错过。
<b>教育的最大成本不是金钱，而是时间!
如果您想了解孩子在感统方面的发展状况，请认真填写以下资料。</b>
</p>
		</div>
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
		  		:options="['早产','足产','自然产','剖宫产']"
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
		  		:options="['是','否']"
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
				v-model="question4" required></checklist>

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
				// {
				// 	title:'999',
				// 	options:['没有','很少','偶尔','常常','总是'],
				// 	value:[]
				// }
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
			if( !this.birthday || !this.parentName || !this.age || !this.relation || !this.job || !this.address || !this.parentName || !this.phone || !this.question7 ){
				this.$vux.toast.text('您有信息漏填', 'top')
				return
			}
			let res = await API.submit(this.id,this.$data)
			console.log(res.data)
			if( res.status == 200 ){
				// this.$router.push('/report/' + res.data.report_id)
				location.href = '/#/back/'
				// this.$router.push('/back/')
			}else{
				this.$vux.toast.text(res.data, 'top')
			}
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
.textcenter{
	text-align: center;
}
.textp{
text-indent:30px;
}
</style>
