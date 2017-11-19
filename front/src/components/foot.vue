<template>
  <div class="foot">
    <p>{{copyright}} © 2017</p>
    <p>由<a href="http://mobile.nanafly.com" class="link">{{company}}</a>提供技术支持</p>
  </div>
</template>

<script>
export default {
  props:['copyright','company'],
  data () {
    return {
      
    }
  }
}
</script>

<style>
.foot{
  margin-top: 20px;
}
.foot p {
    padding: 0;
    margin-bottom: .5rem;
    font-size: 12px;
    color: #999;
    text-align: center;
}
.foot p .link {
    color: #38c;
    text-decoration: underline;
}
</style>
