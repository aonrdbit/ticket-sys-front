<template>
  <div id="app">
    <router-view></router-view>
<!--    <el-container>-->
<!--      <el-header>-->
<!--        <Header v-if="tabType"/>-->
<!--      </el-header>-->

<!--      <el-footer></el-footer>-->
<!--    </el-container>-->
  </div>
</template>

<script>
import Home from "./views/Home";
import Header from "./components/Header";

export default {
  name: 'app',
  components: {
    Header,
    Home,
  },
  data(){
    return{
      tabType:true,
    }
  },
  watch: {
    //监听路由
    $route(e) {
      if (e.name == 'login' && e.name=='register'){
        this.tabType = false;
      } else {
        this.tabType = true;
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header, .el-footer {
  line-height: 60px;
}
</style>
