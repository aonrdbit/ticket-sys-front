<template>
  <div class="home">
      <el-container>
          <el-header>
              <Header></Header>
          </el-header>
<!--          <el-main>-->
          <div style="margin-top:50px; margin-left: 40px; width: 1200px; text-align: left">
              <Search></Search>
          </div>

<!--          </el-main>-->
<!--          <el-footer>-->
<!--              <Footer></Footer>-->
<!--          </el-footer>-->
      </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../constant/api";
import Search from "../components/Search";

export default {
  name: 'home',
  components: {
      Search,
      Footer,
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
        method: 'post',
        url: api.base_url+'/user/test',
          data:{
            "post":"post",
          }
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
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    line-height: 600px;
  }
  .el-aside {
      background-color: #D3DCE6;
      color: #333;
      line-height: 200px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
