<template>
  <div id="app">
    <router-view></router-view>
    <foot :copyright="copyright" :company="company"></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'

export default {
	components: {
    foot
  },
  data(){
  	return{
  		copyright:'祥和家庭',
  		company: '呐呐科技'
  	}
  },
  methods: {
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #f8f8f8;
}
</style>
