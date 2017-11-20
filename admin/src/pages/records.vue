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
              size="mini">问卷详情</el-button>
            <el-button
              size="mini"
               type="success">生成报告</el-button>
            <el-button
              size="mini"
              type="danger">基础资料</el-button>
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
              size="mini">问卷详情</el-button><el-button
              size="mini"
               type="success">生成报告</el-button><el-button
              size="mini"
              type="danger">基础资料</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
	</div>
</template>

<script>
import API from '@/API'

export default {
  data() {
    return {
      tableData: []
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
}
</style>