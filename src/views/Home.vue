<template>
  <div class="home">
      <el-container>
          <el-header>
              <Header></Header>
          </el-header>
<!--          <el-main>-->
              <div style="text-align: center;">
                  <div style="margin:0px auto; width: 500px;">
                  <h3 class="sign-title">余票查询</h3>
                  <div>
                      <el-form>
                          <el-form-item label="出发地">
                              <el-select v-model="st" placeholder="请选择出发地" >
                                  <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="到达地">
                              <el-select v-model="ed" placeholder="请选择到达地">
                                  <el-option
                                          v-for="item in options"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="出发时间">
                              <el-date-picker type="date" placeholder="选择出发日期" v-model="date" ></el-date-picker>
                          </el-form-item>
                          <el-form-item>
                              <el-button type="primary" @click="onSubmit" style="width: 100%;">查询</el-button>
                          </el-form-item>
                      </el-form>
                  </div>
                  </div>
              </div>
<!--          </el-main>-->
          <el-footer></el-footer>
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
import stations from "../constant/data";

export default {
  name: 'home',
    data(){
      return{
          options:stations,
          st:'',
          ed:'',
          date:'',
      }
    },
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
      onSubmit() {
          console.log('submit!');
          this.$message(this.st+' '+this.ed+' '+this.date);
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
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
