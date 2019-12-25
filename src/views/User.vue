<template>
    <div style="text-align: center;">
        <Header></Header>
        <div style="height: 50px;"></div>
        <div style="margin: auto; width: 1040px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的订单" name="first">
                    <div v-for="o in orders">
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
                <el-tab-pane label="我的联系人" name="second">
                    <div style="padding: 15px;">
                        <el-form :inline="true" class="demo-form-inline" style="float: left;">
                            <el-form-item label="添加常用联系人">
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="addName" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号码">
                                <el-input v-model="addID" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码">
                                <el-input v-model="addPhone" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addLine">增加</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table
                                :data="friends"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="idx"
                                    label="身份证号码">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="手机号码">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="120">
                                <template slot-scope="scope">
                                    <el-button @click="delPsg(scope.row)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="third">
                    <div style="margin:0 auto; width: 400px;">
                        <h3 class="sign-title">修改密码</h3>
                        <div style="text-align: justify">
                            <el-form label-position="left" label-width="100px" :model="changeForm" :rules="rules">
                                <el-form-item label="原密码">
                                    <el-input v-model="changeForm.oldPass" type="password" placeholder="请输入原密码"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码">
                                    <el-input v-model="changeForm.newPass" type="password" placeholder="请输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item label="确认新密码">
                                    <el-input v-model="changeForm.reNewPass" type="password" placeholder="请再次输入新密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="changePass">确认修改</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    const ms = {
        "Jan": '01',
        "Feb": "02",
        "Mar": "03",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12",
    };
    import Header from "../components/Header";
    import api from "../constant/api";

    export default {
        name: "User",
        components: {Header},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.changeForm.reNewPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.changeForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                addName: "",
                addID: "",
                addPhone: "",
                friends: [],
                activeName: 'first',
                orders: [],
                changeForm:{
                    oldPass:'',
                    newPass:'',
                    reNewPass:'',
                },
                rules: {
                    oldPass:[
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                    ],
                    newPass: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                    reNewPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            changePass(){
                if(this.changeForm.newPass!==this.changeForm.reNewPass){
                    this.$message('密码不一致');
                    return;
                }
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/pass/mod',
                    data: {
                        "userName": v.$store.state.username.toString(),
                        "oldPass":v.changeForm.oldPass+"",
                        "newPass":v.changeForm.newPass+""
                    }
                }).then(function (res) {
                    v.$message(res.data.msg);
                    if(res.data.msg==='修改成功'){
                        v.changeForm.newPass='';
                        v.changeForm.oldPass='';
                        v.changeForm.reNewPass='';
                    }
                }).catch(function (err) {
                    console.log(err)
                    v.$message('网络或内部错误');
                })
            },
            fun(t) {
                return t[24] + t[25] + t[26] + t[27] + '-' + ms[t[4] + t[5] + t[6]] + '-' + t[8] + t[9];
            },
            getAllOrder() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/order/all',
                    data: {
                        "userId": v.$store.state.userId.toString(),
                    }
                }).then(function (res) {
                    v.orders = res.data.list;
                }).catch(function (err) {
                    v.$message('网络或内部错误');
                })
            },
            getAllPassenger() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/passenger/all',
                    data: {
                        "userId": v.$store.state.userId.toString(),
                    }
                }).then(function (res) {
                    console.log(res.data);
                    v.friends = res.data.list;
                }).catch(function (err) {
                    console.log("err", err);
                    v.$message('网络或内部错误');
                })
            },
            addLine() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/passenger/add',
                    data: {
                        "userId": v.$store.state.userId + "",
                        "Name": v.addName + "",
                        "ID": v.addID + "",
                        "phone": v.addPhone + "",
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.msg === "true") {
                        v.getAllPassenger();
                    } else {
                        v.$message("添加错误，请检查信息")
                    }
                }).catch(function (err) {
                    console.log("err", err);
                    v.$message('网络或内部错误');
                })
            },
            delPsg(row) {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/passenger/del',
                    data: {
                        "userId": v.$store.state.userId + "",
                        "psgId": row.psgId + "",
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.msg === "true") {
                        v.$message('删除成功');
                        v.getAllPassenger();
                    } else {
                        v.$message("网络或内部错误")
                    }
                }).catch(function (err) {
                    console.log("err", err);
                    v.$message('网络或内部错误');
                })
            },
            check(y1, m1, d1, y2, m2, d2) {
                // console.log(y1,m1,d1,y2,m2,d2);
                var se;
                if (y2 < y1) {
                    se = 31 - d2 + d1;
                } else {
                    se = d1 - d2;
                }
                console.log(se)
                return se > 7;
            },
            tui(row, o) {
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var day = now.getDate();
                // console.log(year,month,day)
                // console.log(o.st_date)
                if (row.status === '已退票') {
                    this.$alert('该车票已退票', '', {
                        confirmButtonText: '确定',
                    });
                    return;
                }
                //Mon Dec 30 00:00:00 CST 2019
                var t = o.st_date;
                if (!this.check(parseInt(t[24] + t[25] + t[26] + t[27]), parseInt(ms[t[4] + t[5] + t[6]]), parseInt(t[8] + t[9]), year, month, day)) {
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
                            "orId": o.orId + "",
                            "psgId": row.psgId + "",
                            "seNo": row.cx + "-" + row.zw,
                            "st": o.st + "",
                            "ed": o.ed + "",
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            quit() {
                this.$router.push({
                    path: "/list",
                    query: {st: this.$route.query.st, ed: this.$route.query.ed, date: this.$route.query.date.toString()}
                });
            },
            st_timeformat(t) {
                return t[0] + t[1] + t[2] + t[3] + t[4];
            },
            timeformat(t) {
                //Mon Dec 30 2019 00:00:00 GMT+0800 (China Standard Time)
                return t[11] + t[12] + t[13] + t[14] + '-' + ms[t[4] + t[5] + t[6]] + '-' + t[8] + t[9];
            },
        },
        created() {
            this.getAllPassenger();
            this.getAllOrder();
        },
        mounted() {
            this.getAllPassenger();
            this.getAllOrder();
        }
    }
</script>

<style scoped>

</style>