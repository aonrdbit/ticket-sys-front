<template>
    <div class="home">
        <Header></Header>
        <div style="text-align: center;">
            <div style="height: 200px;"></div>
            <div style="margin:0 auto; width: 300px;">
                <h3 class="sign-title">余票查询</h3>
                <div style="text-align: justify">
                    <el-form label-position="left" label-width="80px">
                        <el-form-item label="出发地">
                            <el-select v-model="st" filterable placeholder="请选择出发地">
                                <el-option
                                        v-for="item in stations"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="到达地">
                            <el-select v-model="ed" filterable placeholder="请选择到达地">
                                <el-option
                                        v-for="item in stations"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出发时间">
                            <el-date-picker type="date" placeholder="选择出发日期" v-model="date"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" style="width: 100%;">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    import api from "../constant/api";
    // import stations from "../constant/data";

    export default {
        name: 'home',
        data() {
            return {
                stations:[],
                st: '',
                ed: '',
                date: '',
            }
        },
        components: {
            Footer,
            Header,
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.$router.push({path:"/list",query:{st:this.st,ed:this.ed,date:this.date.toString()}});
            },
            test() {
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/test',
                    data: {
                        "post": "post",
                    }
                }).then(function (res) {
                    console.log("res", res);
                }).catch(function (err) {
                    console.log("err", err);
                })
            },
            getStations(){
                let v=this;
                this.$axios({
                    method: 'get',
                    url: api.base_url + '/train/station/all',
                }).then(function (res) {
                    console.log("res", res);
                    if(res.data.msg==="true"){
                        v.stations=res.data.list;
                    }else{
                        v.$message("网络或内部错误")
                    }
                }).catch(function (err) {
                    console.log("err", err);
                })
            }
        },
        created() {
            this.getStations();
        },
        mounted() {
            this.getStations();
        }
    }
</script>
<style>


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
