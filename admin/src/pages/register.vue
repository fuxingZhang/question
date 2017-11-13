<template>
  <div  class="register">
    <div class="card">
      <div class="title">注册</div>
      <div class="content">
        <el-row :gutter="15">
          <el-col :md="8" class="label">姓名</el-col>
          <el-col :md="12" >
            <el-input v-model="name"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="label">邮箱</el-col>
          <el-col :md="12" >
            <el-input v-model="email"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="label">密码</el-col>
          <el-col :md="12" >
            <el-input v-model="password" type="password"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="label">确认密码</el-col>
          <el-col :md="12" >
            <el-input v-model="confirm" type="password"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="space">1</el-col>
          <el-col :md="12">
            <el-button type="primary" @click="submit">注册</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'

export default {
  data(){
    return {
      name:'',
      email:'',
      password:'',
      confirm:'',
      checked:false,
    }
  } ,
  created(){
    
  },
  methods: {
    async submit(){
      if( !this.name ){
        this.$message({
          showClose: true,
          message: '请输入姓名！',
          type: 'error'
        });
        return
      }
      if( !this.email ){
        this.$message({
          showClose: true,
          message: '请输入邮箱！',
          type: 'error'
        });
        return
      }
      const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if( !reg.test(this.email) ){
        this.$message({
          showClose: true,
          message: '邮箱格式不正确',
          type: 'error'
        });
        return
      }
      if( !this.password ){
        this.$message({
          showClose: true,
          message: '请输入密码！',
          type: 'error'
        });
        return
      }
      if( this.password.length < 6 ){
        this.$message({
          showClose: true,
          message: '密码长度最少6位',
          type: 'error'
        });
        return
      }
      if( this.password != this.confirm ){
        this.$message({
          showClose: true,
          message: '两次输入的密码不相同！',
          type: 'error'
        });
        return
      }
      let data = {
        name: this.name,
        email:this.email,
        password:this.password
      }
      let res = await API.register(data)
      console.log(res)
      this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
    }
  }
}
</script>

<style>
.register{
  padding-left: 15px;
  padding-right: 15px;  
}
.register .card{
  margin: 0 auto;
  margin-top: 30px;
  max-width: 750px;
  margin-bottom: 22px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 1px;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.register .title{
  color: #333;
  background-color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #d3e0e9;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.register .content{
  padding: 15px;
}
.register .label{
  text-align: right;
  vertical-align: middle;
  line-height: 40px;
}
.register .el-row{
  margin-bottom: 15px;
}
.register .el-button--primary {
  background-color:#2a3f54;
  border-color:#2a3f54;
}
.register .el-button--primary:hover{
  background-color: #192632;
    border-color: #0d141a;
}
.register .space{
  color: transparent;
}
@media screen and ( max-width: 991px ){
  .register .label{
    text-align: left;
  }
  .register .space{
    display: none;
  }
}
</style>
