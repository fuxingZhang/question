<template>
	<div class="papers">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="font-size: 18px;line-height: 36px;">问卷</span>
		    <div class="fr" >
		    	<router-link to="/admin/paper/create" class="btn">添加问卷</router-link>
		    </div>
		  </div>
		  <div>
  			<el-col v-for="(paper,index) in papers" :key="index" :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
					<div class="list-box ">
						<h3>
							<router-link :to="'/admin/paper/edit/' + paper.id">{{paper.title}}</router-link>
						</h3>
						<div class="line-box">
							<span></span>
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span> 
							<span></span>
						</div> 
						<p class="btn-group">
							<router-link :to="'/admin/paper/' + paper.id" class="btn-edit">类目管理</router-link>
							<a class="btn-produce" @click="dialog(paper.id)">生成问卷</a>
						</p>
					</div>
  			</el-col>

			<el-dialog title="生成问卷" :visible.sync="dialogFormVisible" center>
				<div  style="width:100%;display:flex;">
					<div style="flex:1;">
						<div style="margin:0 auto 20px;width: 200px;">
							<qrcode-vue :value="URL" size="200" level="H" 
								:background="background" style="marin 0 auto"
								:foreground="foreground"></qrcode-vue>
						</div>
					</div>
					<div style="min-width:100px;">
						<div style="line-height: 47px;">
							<div>背景色：</div>
							<el-color-picker v-model="background"></el-color-picker>
						</div>
						<div>
							<div>前景色：</div>
							<el-color-picker v-model="foreground"></el-color-picker>
						</div>
					</div>
				</div>


				<div style="width:100%;display:flex;">
					<div style="flex:1;"><el-input v-model="URL" readonly></el-input></div>
					<div style="width:74px;">
							 <el-tooltip :disabled="disabled" class="item" effect="dark" content="复制成功" placement="right">
					      <el-button v-clipboard="URL" @click="showTip">复制</el-button>
					    </el-tooltip>
					</div>
				</div>
			  

			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  </div>
			</el-dialog>

		  </div>
		</el-card>
	</div>
</template>

<script>
import API from '@/API'
import QrcodeVue from 'qrcode.vue'

export default {
	components:{
		QrcodeVue
	},
	data(){
		return{
			dialogFormVisible:false,
			papers:{},
			disabled: true,
			URL:'',
			background:'#fff',
			foreground:'#000'
		}
	},
	created(){
		this.getPapers()
	},
	methods:{
		async getPapers(){
			let res = await API.getPapers()
			console.log('getPapers',res)
			this.papers = res.data
		},
		dialog(id){
			this.URL= location.host + '/answer.html#/' + id
			this.dialogFormVisible = true
		},
		showTip(){
			this.disabled = false
			setTimeout( () =>{
				this.disabled = true
			},1000)
		}
	}
}
</script>

<style>
.papers{
  margin: 24px auto 60px;
  max-width: 880px;
}
.papers .list-box {
  position: relative;
  height: 240px;
  padding: 15px;
  margin: 10px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  box-shadow: 3px 3px 6px rgba(0,0,0,.1);
}
.papers .list-box h3 {
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.papers .list-box .line-box {
  margin-top: 20px;
}
.papers .list-box .line-box span {
  display: block;
  width: 50%;
  height: 2px;
  margin-bottom: 12px;
  background-color: #333;
}
.papers a {
  color: #2a3f54;
  text-decoration: none;
}
.papers a.underline:focus, a.underline:hover {
    color: #111921;
    text-decoration: underline;
}
.papers .list-box .line-box span:nth-of-type(4), .list-box .line-box span:nth-of-type(5), .list-box .line-box span:nth-of-type(6) {
  width: 70%;
}
@media screen and (max-width: 767px) {
	.papers{
	  margin: 24px 15px;
	}
	.el-dialog {
    width: 90%;
	}
}
</style>
