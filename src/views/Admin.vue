<template>
    <div style="text-align: center;">
        <Header></Header>
        <div style="height: 10px;"></div>
        <div style="margin: auto; width:100%;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="车次管理" name="first">
                    <div v-if="tabtab==1">
                        <el-form ref="form" :inline="true">
                            <el-form-item label="车次号">
                                <el-input v-model="trNo"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="queryByTrNo">查询</el-button>
                                <el-button  @click="tabtab=2">添加新车次</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-if="tabtab==2">
                        <div style="">
                            <el-form :model="trains" ref="dynamicValidateForm" label-width="auto;"
                                     class="demo-dynamic">
                                <div v-for="(ls, index) in trains.list">
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="车次号" class="item">
                                                <el-input v-model="trains.trNo"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="出发站" class="item">
                                                <el-input v-model="ls.stationA"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="到达站" class="item">
                                                <el-input v-model="ls.stationB"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="停留时间" class="item">
                                                <el-input v-model="ls.dwellTime"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="出发时间" class="item">
                                                <el-input v-model="ls.staTime"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item label="到达时间" class="item">
                                                <el-input v-model="ls.arrTime"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="一等座价格" class="item">
                                                <el-input v-model="ls.firPrice"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="二等座价格" class="item">
                                                <el-input v-model="ls.secPrice"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="2">
                                            <el-form-item class="item" style="margin-top: 35px;">
                                                <el-button @click.prevent="removeVia(ls)">删除</el-button>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <el-row>
                                    <el-button @click="addVia">新增经停车站</el-button>
                                    <el-button @click="tabtab=1">返回车次查询</el-button>
                                    <el-button type="primary" @click="addTrain">确认添加车次</el-button>
                                </el-row>
                            </el-form>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="订单管理" name="second">
                    <div>
                        <el-form ref="form" :inline="true">
                            <el-form-item label="乘客身份证">
                                <el-input v-model="ID"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="queryByID">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div v-for="o in list">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix" style="padding-bottom: 20px;">
                            <span style="float: left;">
                                {{o.trNo}} {{o.st}}====>{{o.ed}}
                                {{fun(o.st_date)}} {{o.st_time}}开
                            </span>
                                <!--                                <el-button style="float: right; padding: 3px 0" type="text" @click="quit">取消订单</el-button>-->
                            </div>
                            <div class="text item">
                                <el-table
                                        :data="o.psgs"
                                        style="width: 100%">
                                    <el-table-column
                                            prop="name"
                                            label="姓名"
                                            width="140">
                                    </el-table-column>
                                    <el-table-column
                                            prop="idx"
                                            label="身份证号"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="phone"
                                            label="手机号"
                                            width="140">
                                    </el-table-column>
                                    <el-table-column
                                            prop="cx"
                                            label="车厢"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="zw"
                                            label="座位号"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            prop="status"
                                            label="状态"
                                            width="140">
                                    </el-table-column>
                                    <el-table-column
                                            fixed="right"
                                            label="操作"
                                            width="120">
                                        <template slot-scope="scope">
                                            <el-button @click="tui(scope.row,o)" type="text" size="small">退票</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div>
                </el-tab-pane>
<!--                <el-tab-pane label="乘客管理" name="fifth">-->
<!--                    乘客管理-->
<!--                </el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import api from "../constant/api";
    const ms = {
        "Jan": '01',
        "Feb": "02",
        "Mar": "03",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12",
    };
    var cnt=0
    export default {
        name: "Admin",
        data() {
            return {
                tabtab:1,
                trNo:'',
                test: '',
                ID: '',
                activeName: 'first',
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    email: ''
                },
                trains: {
                    trNo: '',
                    list: [
                        {
                            stationA: '',
                            stationB: '',
                            firPrice: '',
                            secPrice: '',
                            staTime: '',
                            arrTime: '',
                            dwellTime: '',
                            idx:0,
                        }
                    ]
                },
                list: []
            };
        },
        components: {Header},
        methods: {
            fun(t){
                return t[24] + t[25] + t[26] + t[27] + '-' + ms[t[4] + t[5] + t[6]] + '-' + t[8] + t[9];
            },
            tui(row,o){
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                // console.log(year,month,day)
                // console.log(o.st_date)
                if(row.status==='已退票'){
                    this.$alert('该车票已退票', '', {
                        confirmButtonText: '确定',
                    });
                    return;
                }
                //Mon Dec 30 00:00:00 CST 2019
                var t=o.st_date;
                if(!this.check(parseInt(t[24] + t[25] + t[26] + t[27]),parseInt(ms[t[4] + t[5] + t[6]]),parseInt(t[8] + t[9]),year,month,day)){
                    this.$alert('不可以退开车时间在7天之内的车票', '', {
                        confirmButtonText: '确定',
                    });
                    return;
                }
                this.$confirm('确认退票?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let v = this;
                    this.$axios({
                        method: 'post',
                        url: api.base_url + '/order/del',
                        data: {
                            "orId":o.orId+"",
                            "psgId":row.psgId+"",
                            "seNo":row.cx+"-"+row.zw,
                            "st":o.st+"",
                            "ed":o.ed+"",
                        }
                    }).then(function (res) {
                        console.log(res.data);
                        if (res.data.msg === "true") {
                            v.$message('退票成功');
                            v.getAllOrder();
                        } else {
                            v.$message("网络或内部错误")
                        }
                    }).catch(function (err) {
                        console.log("err", err);
                        v.$message('网络或内部错误');
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            queryByID() {
                //444111199844442227
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/admin/order/all',
                    data: {
                        'ID':v.ID,
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.msg === "true") {
                        v.list=res.data.list;
                    } else {
                        v.$message('网络或内部错误');
                    }
                });
            },
            check() {
                if (localStorage.getItem("username") !== 'admin') {
                    this.$router.push('/');
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addVia() {
                cnt++;
                var t={};
                t.idx=cnt
                this.trains.list.push(t);
            },
            removeVia(item) {
                var index = this.trains.list.indexOf(item)
                if (index !== -1) {
                    this.trains.list.splice(index, 1)
                    cnt--;
                }
            },
            addTrain() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/admin/train/add',
                    data: {
                        'train':v.trains,
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.msg === "true") {
                        v.$message('添加成功');
                        v.$router.push("/admin");
                    } else {
                        v.$message('网络或内部错误');
                    }
                });
            },
            queryByTrNo(){
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/admin/train/query',
                    data: {
                        'trNo':v.trNo,
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.msg === "true") {
                        //log
                    } else {
                        v.$message('网络或内部错误');
                    }
                });
            }
        },
        created() {
            this.check();
        },
        mounted() {
            this.check();
        }
    }
</script>

<style scoped>
    /deep/ .el-tabs__nav{
        margin-left: 50px;
    }
    /deep/ .el-form--inline{
        margin-top: 30px;
    }
</style>