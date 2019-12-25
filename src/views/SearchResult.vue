<template>
    <div style="text-align: center;">
        <Header></Header>
        <div style="height: 50px;"></div>
        <div>
            <el-form ref="form" :inline="true">
                <el-form-item>
                    <el-button icon="el-icon-sort" @click="onSwap"/>
                </el-form-item>
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
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="height: 15px;"></div>
        <div style="margin:0 auto; width: 1140px;">
            <el-table
                    v-loading="loading"
                    :data="list"
                    style="width: 100%">
                <el-table-column
                        prop="trNo"
                        label="车次"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="st"
                        label="出发地"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="ed"
                        label="到达地"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="st_time"
                        label="出发时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="ed_time"
                        label="到达时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="dur"
                        label="历时"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="fir"
                        label="一等座"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="firPrice"
                        label="一等座价格(元)"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="sec"
                        label="二等座"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="secPrice"
                        label="二等座价格(元)"
                        width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">预定</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import api from "../constant/api";
    export default {
        name: "SearchResult",
        components: {Header},
        data() {
            return {
                loading:true,
                st: '',
                ed: '',
                value: '',
                date: '',
                stations:[],
                list: []
            }
        },
        methods: {
            onSwap(){
              let t=this.st;
              this.st=this.ed;
              this.ed=t;
            },
            onSubmit() {
                if(this.st==='' || this.ed===' ' || this.date.toString()===''){
                    this.$message('请输入正确信息');
                    return;
                }
                this.$router.push({path:"/list",query:{st:this.st,ed:this.ed,date:this.date.toString()}});
                this.loading=true;
                this.getList();
            },
            handleClick(row) {
                console.log(row);
                //手动判断有没有登录,没登录的话把数据存到local里
                let token=localStorage.getItem('Authorization');
                if(token===null){
                    this.$router.replace({
                        name:"login",
                        query: {redirect: this.$router.currentRoute.fullPath}
                    })
                }else{
                    row.date=this.date.toString();
                    this.$router.push({path: '/order',query:row});
                }
            },
            getList(){
                this.st=this.$route.query.st;
                this.ed=this.$route.query.ed;
                this.date=this.$route.query.date;
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/train/query',
                    data: {
                        'st':v.st,
                        'ed':v.ed,
                        'date':v.date
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.msg === "true") {
                        v.list=res.data.list;
                        v.loading=false;
                    } else {
                        v.$message('网络或内部错误');
                    }
                });
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
            this.getList();
        },
        mounted() {
            this.getStations();
            this.getList();
        }
    }
</script>

<style scoped>

</style>