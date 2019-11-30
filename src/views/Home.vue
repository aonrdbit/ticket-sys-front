<template>
  <div class="home">
    <el-container>
<!--      <Header/>-->
<!--      <el-main>首页</el-main>-->
<!--      <el-footer>Footer</el-footer>-->
      <el-button @click="exit">退出登录</el-button>
      <el-button @click="test">携带token的测试请求</el-button>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from "../components/Header";
import api from "../constant/api";

export default {
  name: 'home',
  components: {
    Header,
    HelloWorld
  },
  methods:{
    exit(){
      localStorage.removeItem('Authorization');
      this.$router.push('/login');
    },
    test(){
      this.$axios({
        method: 'get',
        url: api.base_url+'/user/test',
      }).then(function(res){
        console.log("res",res);
      }).catch(function(err){
        console.log("err",err);
      })
    }
  }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
