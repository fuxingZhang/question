<template>
	<div class="records">
    <el-card class="box-card pc">
      <div slot="header" class="clearfix">
        <span style="font-size: 18px;">用户答卷</span>
      </div>
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户姓名"
          width="130">
        </el-table-column>  
        <el-table-column
          prop="created_at"
          label="填写时间"
          width="210">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="gray"
              size="mini"
              @click="getAnswer(scope.row.id)">问卷详情</el-button><el-button
              size="mini"
              type="success"
              @click="getReport(scope.row.id)">生成报告</el-button><el-button
              size="mini"
              type="danger"
              @click="getInfo(scope.row.id)">基础资料</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card mobile">
      <div slot="header" class="clearfix">
        <span style="font-size: 18px;">用户答卷</span>
      </div>
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="用户姓名">
        </el-table-column>  
        <el-table-column
          prop="created_at"
          label="填写时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="gray"
              size="mini"
              @click="getAnswer(scope.row.id)">问卷详情</el-button><el-button
              size="mini"
              type="success"
              @click="getReport(scope.row.id)">生成报告</el-button><el-button
              size="mini"
              type="danger"
              @click="getInfo(scope.row.id)">基础资料</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 问卷详情的弹窗内容 -->
    <el-dialog :title="answer.paper_name" :visible.sync="answerDetailVisible">
      <div style="border-bottom: 1px solid #ccc;padding-bottom: 20px;margin-bottom: 20px;" v-for="(item,index) in answer.items" key="index">
        <h2 style="font-size: 18px;margin: 0 0 10px;">{{item.title}}</h2>
        <div style="font-size: 16px;">{{item.content}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="success" @click="answerDetailVisible = false">关闭</el-button>
        <el-button type="success" @click="answerDetailVisible = false">保存</el-button>
      </div>
    </el-dialog>
    <!-- 生成报告的弹窗内容 -->
    <el-dialog :title="report.paper_name + '（测评报告）'" :visible.sync="userReportsVisible">
      <div style="border-bottom: 1px solid #ccc;padding-bottom: 20px;margin-bottom: 20px;" v-for="(item,index) in report.data" key="index">
        <h2 style="font-size: 18px;font-weight: bold;margin: 0 0 10px;">{{item.title}}</h2>
        <div style="line-height: 2;" v-html="item.content"></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="success" @click="userReportsVisible = false">关闭</el-button>
        <el-button type="success" @click="userReportsVisible = false">保存</el-button>
      </div>
    </el-dialog>
    <!-- 基础资料的弹窗内容 -->
    <el-dialog title="基础资料" :visible.sync="userInfoVisible">
      <h3 style="font-weight: bold;font-size: 18px;margin-bottom: 20px;">基础信息</h3>
      <el-form label-position="left" label-width="120px">
        <el-form-item label="姓名">
          <el-input :value="info.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="info.man" :label="true" readonly>男</el-radio>
          <el-radio v-model="info.man" :label="false" readonly>女</el-radio>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input :value="info.birthday" readonly></el-input>
        </el-form-item>        
        <el-form-item label="监护人姓名">
          <el-input :value="info.parentName" readonly></el-input>
        </el-form-item>        
        <el-form-item label="孩子年龄">
          <el-input :value="info.age" readonly></el-input>
        </el-form-item>        
        <el-form-item label="与孩子关系">
          <el-input :value="info.relation" readonly></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input :value="info.job" readonly></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input :value="info.address" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input :value="info.phone" readonly></el-input>
        </el-form-item>
      </el-form>
      <!-- 孕期状况 -->
      <h3 class="info-h3">一、孕期状况</h3>
      <div class="info-small-title">1.孕期</div>
      <div v-for="item in ['早产','足产','自然产','剖腹产']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question1.first[0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">2.母亲怀孕期间活动量</div>
      <div v-for="item in ['足','不足']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question1.second[0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">3.父母生产时年龄</div>
      <el-form label-position="left" label-width="120px">
        <el-form-item label="父亲">
          <el-input :value="info.question1.third[0]" readonly></el-input>
        </el-form-item>
        <el-form-item label="母亲">
          <el-input :value="info.question1.third[1]" readonly></el-input>
        </el-form-item>
      </el-form>
      <!-- 二、生长养育史 -->
      <h3 class="info-h3">二、生长养育史</h3>
      <div class="info-small-title">1.喂养情况</div>
      <div v-for="item in ['母乳','人工','混合']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question2.first[0][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <el-form label-position="left" label-width="160px">
        <el-form-item label="几岁独立用小勺进餐">
          <el-input :value="info.question2.first[1]" readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="info-small-title">2.运动发展情况</div>
      <div v-for="item in ['婴儿期手脚自由活动','包裹“蜡烛包”']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question2.second[0][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <el-form label-position="left" label-width="160px">
        <el-form-item label="爬行时间">
          <el-input :value="info.question2.second[1]" readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="info-small-title">是否用学步车</div>
      <div v-for="item in ['右手','左手','不分']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question2.second[2][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">3.安全感发展</div>
      <el-form label-position="left" label-width="160px">
        <el-form-item label="两岁之前晚上和谁睡">
          <el-input :value="info.question2.third[0]" readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="info-small-title">三岁之前和母亲是否有分离</div>
      <div v-for="item in ['是','否']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question2.third[1][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">睡觉时需要依恋物</div>
      <div v-for="item in ['是','否']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question2.third[2][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">习惯咬手指啃东西</div>
      <div v-for="item in ['是','否']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question2.third[3][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <!-- 生活环境 -->
      <h3 class="info-h3">三、生活环境</h3>
      <div class="info-small-title">1.养育方法</div>
      <div class="info-small-title">父亲：</div>
      <div v-for="item in ['宽','严','放任','普通','不定']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question3.first[0][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">母亲：</div>
      <div v-for="item in ['宽','严','放任','普通','不定']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question3.first[1][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">养育者与孩子沟通时间</div>
      <div v-for="item in ['长','短','没有']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question3.first[2][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">密切程度</div>
      <div v-for="item in ['很密切','密切','一般','不密切']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question3.first[3][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <div class="info-small-title">沟通方式</div>
      <div v-for="item in ['鼓励肯定多','批评否定多']"  style="margin-bottom: 10px;">
        <el-radio v-model="info.question3.first[4][0]" :label="item" readonly>{{item}}</el-radio>
      </div>
      <el-form label-position="left" label-width="160px">
        <el-form-item label="沟通方式">
          <el-input :value="info.question3.second" readonly></el-input>
        </el-form-item>
        <el-form-item label="父母夫妻关系如何">
          <el-input :value="info.question3.third" readonly></el-input>
        </el-form-item>
      </el-form>
      <h3 class="info-h3">四、语言现状（多选）</h3>
      <el-checkbox-group v-model="info.question4">
        <el-checkbox v-for="item in ['口吃','发音不清','自言自语','固定音调','鹦鹉学舌','发音困难','说话声小','不爱讲话','其他']" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      <h3 class="info-h3">五、行为表现（多选）</h3>
      <el-checkbox-group v-model="info.question5">
        <el-checkbox v-for="item in ['小动作多（吸手指、摸生殖器等）','注意力不集中，东张西望','攻击他人','自伤行为','多动','刻板行为','其他']" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      <h3 class="info-h3">六、情绪反应（多选）</h3>
      <el-checkbox-group v-model="info.question6">
        <el-checkbox v-for="item in ['爱生气','常哭、闹、笑','极端恐惧（怕声音、怕黑）','摔东西、扔东西','不满足时常发脾气','其他']" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      <h3 class="info-h3">七、请家长详细描述儿童目前的问题和困难以及家长的困扰。</h3>
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 10}"
        placeholder="请输入内容"
        v-model="info.question7">
      </el-input>
      <div style="padding-bottom: 20px;margin-bottom: 20px;"></div>
      <div style="border-bottom: 1px solid #ccc;"></div>
      <div slot="footer" class="dialog-footer">
        <el-button plain type="success" @click="userInfoVisible = false">关闭</el-button>
        <el-button type="success" @click="userInfoVisible = false">保存</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import API from '@/API'

export default {
  data() {
    return {
      tableData: [],
      userReportsVisible: false,
      answerDetailVisible: false,
      userInfoVisible: true,
      report:{
        paper_name: '',
        data: []
      },
      answer:{
        paper_name: '',
        items: []
      },
      info:{
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
        question6:''
      }
    }
  },
  async created(){
    let res = await API.getRecords()
    console.log(res)
    if( res.status != 200 ){
      this.$message({
        showClose: true,
        message: res.data,
        type: 'error'
      });
      return
    }
    const records = res.data
    for( let key in records ){
      this.tableData.push(records[key])
    }
    console.log(this.tableData)
  },
  methods: {
    async getReport(id){
      let res = await API.getReport(id)
      console.log(res)
      this.report = res.data
      this.userReportsVisible = true
    },
    async getAnswer(id){
      let res = await API.getAnswer(id)
      console.log(res)
      const data = res.data
      data.common = data.common.map( (item) =>{
        return {
          title: item.title,
          content: item.value[0] + ' --> ' + (item.options.indexOf(item.value[0])+1) + '分'
        }
      })
      this.answer = {
        paper_name: data.paper_name,
        items: data.common
      }
      this.answerDetailVisible = true
    },
    async getInfo(id){
      let res = await API.getAnswer(id)
      console.log(res)
      this.info = res.data
      this.userInfoVisible = true
    }
  }
}
</script>

<style>
.records{
	margin: 20px auto;
  max-width: 750px;
}
.records .el-table th>.cell{
  color: #34495e;
  font-weight: bold;
}
.records .gray.el-button{
  color: #fff;
  background-color: #2a3f54;
  border-color: #223243;
}
.records .gray.el-button:hover{
  color: #fff;
  background-color: #0d141a;
  border-color: #000;
}
.records .mobile{
  display: none;
}
.records .el-card__body {
  padding-top: 10px;
}
.records .el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.records .el-dialog{
  padding: 20px;
  width: 50%;
}
.records .el-dialog__headerbtn {
  top: 40px;
  right: 40px;
}
.records .el-dialog__body {
  padding: 30px 20px 10px;
}
.records .el-form-item {
  margin-bottom: 10px;
}
.records .info-h3{
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.records .info-small-title{
  margin-bottom: 10px;
  margin-top: 6px;
}
.records .el-checkbox{
  display: block;
  margin-left: 0;
  margin-bottom: 5px;
}
@media screen and (max-width: 767px) {
	.records{
		margin: 15px;
	}
  .records .mobile{
    display: block;
  }
  .records .pc{
    display: none;
  }
  .records .el-card__body {
    padding: 10px;
  }
  .records .el-button+.el-button {
    margin-left: 0;
  }
  .records .el-dialog {
    width: calc(100% - 30px);
    margin: 15px;
    padding: 10px;
  }
  .records .el-dialog__headerbtn {
    top: 30px;
    right: 20px;
  }
}
</style>