<template>
	<div class="header">
		<el-menu
		  class="el-menu-zfx"
		  mode="horizontal"
		  @select="handleSelect"
		  background-color="#2a3f54"
		  text-color="#fff"
		  menu-trigger="click"
		  active-text-color="#ffd04b">
		  <router-link to="/admin">
				<el-menu-item index="1" class="h1"><h1>问卷系统</h1></el-menu-item>
			</router-link>
			<router-link v-if="logged" class="pc"  to="/admin/paper">
				<el-menu-item index="2">问卷</el-menu-item>
			</router-link>
			<router-link v-if="logged" class="pc" to="/">
				<el-menu-item index="3">资料</el-menu-item>
			</router-link>
			<router-link v-if="logged" class="pc" to="/admin/account">
				<el-menu-item index="4">帐号管理</el-menu-item>
			</router-link>
		  <router-link v-if="!logged" to="/register">
		  	<el-menu-item index="5" class="right">注册</el-menu-item>
		  </router-link>
		  <router-link v-if="!logged" to="/login">
		  	<el-menu-item index="6" class="right">登录</el-menu-item>
		  </router-link>
		  <el-submenu v-if="logged" index="7" class="right">
		    <template slot="title">张复星</template>
		    <el-menu-item class="unseen" index="7-1">问卷</el-menu-item>
		    <el-menu-item class="unseen" index="7-2">资料</el-menu-item>
		    <el-menu-item class="unseen" index="7-3">帐号管理</el-menu-item>
		    <el-menu-item index="7-4">退出</el-menu-item>
		  </el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				logged:false,
				name:''
			}
		},
		created(){
			const path = this.$route.path
			if( path=='/login' || path=='/register' || path=='/reset' ) {
				this.logged = false
			}else{
				this.logged = true
				this.name = localStorage.getItem('wjdc-user-name-zfx')				
			}
		},
		watch: {
			$route(to,from){
				const path = to.path
				if( path=='/login' || path=='/register' || path=='/reset' ) {
					this.logged = false
				}else{
					this.logged = true
					this.name = localStorage.getItem('wjdc-user-name-zfx')				
				}
			}
		},
		methods: {
			handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
		}
	}
</script>

<style>
	.header .el-menu-zfx{
		padding: 0 12%;
	}
	.header .h1{
		font-size: 18px;
		margin-right: 100px;
	}
	.header .right{
		float: right;
	}
	.header .unseen{
		display: none;
	}
	@media screen and (max-width: 767px) {
		.header .el-menu-zfx{
			padding: 0 15px;
		}
		.pc{
			display: none !important;
		}
		.header .unseen{
			display: block;
		}
	}
</style>