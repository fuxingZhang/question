<template>
	<div class="account">
	  <el-table
	    :data="tableData"
	    stripe
	    border
	    style="width: 100%">
	    <el-table-column
	    	prop="date"
	      label="帐号">
	    </el-table-column>
	    <el-table-column
	    	prop="name"
	      label="密码">
	    </el-table-column>
	    <el-table-column label="操作" min-width="100">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style>
.account{
	margin: 20px 20%;
}
.el-table__body-wrapper {
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 767px) {
	.account{
		margin: 15px;
	}
}
</style>