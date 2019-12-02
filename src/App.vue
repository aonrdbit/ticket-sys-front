<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header v-if="tabType"/>
      </el-header>
      <router-view></router-view>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Home from "./views/Home";
import Header from "./components/Header";

export default {
  name: 'app',
  components: {
    Header,
    Home,
    HelloWorld
  },
  data(){
    return{
      tabType:true,
    }
  },
  watch: {
    //监听路由
    $route(e) {
      if (e.name == 'login'){
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
</style>
