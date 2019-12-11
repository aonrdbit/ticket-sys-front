<template>
    <div style="text-align: center;">
        <Header></Header>
        <div style="height: 50px;"></div>
        <div style="margin: auto; width: 1040px;">
            <el-steps :active="active" finish-status="success">
                <el-step title="选择乘客信息">
                </el-step>
                <el-step title="选择座位信息">
                </el-step>
                <el-step title="确认订单">
                </el-step>
            </el-steps>
            <el-divider></el-divider>
            <div v-if="active===0 || active===1">
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
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="idx"
                            label="身份证号码">
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="active===1">
                <el-divider></el-divider>
                <div>
                    <el-collapse v-for="c in seats" :key="c.cx">
                        <el-collapse-item :title="c.cx+'车厢'">
                            <el-checkbox @change="handleSeat(c.cx,s.seNo,s.check)" v-model="s.check"
                                         style="float: left;" v-for="s in c.ss" :disabled="s.status" :key="s.seNo">
                                {{fun(s.seNo)}}
                            </el-checkbox>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div v-if="active===0 ||active===1">
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </div>
            <div v-if="active===2">
                <div>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" style="padding-bottom: 20px;" >
                            <span style="float: left;">
                                {{$route.query.trNo}} {{$route.query.st}}====>{{$route.query.ed}}
                                {{timeformat($route.query.date)}} {{st_timeformat($route.query.st_time)}}开
                            </span>
                            <el-button style="float: right; padding: 3px 0" type="text" >取消订单</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
                <div v-for="o in multipleSelection">{{o}}</div>
                <div>车次信息：{{this.$route.query}}</div>
                <div v-for="v in multipleSeat">{{v}}</div>
                <el-button type="danger" @click="submit">支付订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import api from "../constant/api";
    import {mapMutations} from "vuex";
    const ms={
        "Jan":'01',
        "Feb":"02",
        "Mar":"03",
        "Sep":"09",
        "Oct":"10",
        "Nov":"11",
        "Dec":"12",
    }
    export default {
        name: "Buy",
        components: {Header},

        data() {
            return {
                active: 0,
                addName: '',
                addID: '',
                addPhone: '',
                friends: [],
                multipleSelection: [],
                seats: [],
                multipleSeat: []
            };
        },
        methods: {
            st_timeformat(t){
                return t[0]+t[1]+t[2]+t[3]+t[4];
            },
            timeformat(t){
                //Mon Dec 30 2019 00:00:00 GMT+0800 (China Standard Time)
                return t[11]+t[12]+t[13]+t[14]+'-'+ms[t[4]+t[5]+t[6]]+'-'+t[8]+t[9];
            },
            fun(x){
                return x.substr(3,5)
            },
            submit() {
                //第三页面实现订单信息
                //支付创建接口，待填坑
                this.$message("支付成功");
            },
            handleSeat(c, s, che) {
                if (che === true) {
                    this.multipleSeat.push(s);
                } else {
                    let idx = 0;
                    for (let i = 0; i < this.multipleSeat.length; i++) {
                        if (this.multipleSeat[i] === s.trId) {
                            idx = i;
                        }
                    }
                    console.log(idx);
                    this.multipleSeat.splice(idx, 1);
                }
            },
            addLine() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/passenger/add',
                    data: {
                        "userId": v.$store.state.userId,
                        "Name": v.addName,
                        "ID": v.addID,
                        "phone": v.addPhone,
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            pre() {
                if (this.active-- < 0) this.active = 2;
            },
            next() {
                if(this.active===1){
                    console.log(this.multipleSelection.length,this.multipleSeat.length)
                    if(this.multipleSelection.length!==this.multipleSeat.length){
                        this.$message('每个乘客选择一个座位')
                        return;
                    }
                }
                if (this.active++ > 2) this.active = 0;
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
            getSeats() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/train/seat/all',
                    data: {
                        "trId": v.$route.query.trId.toString(),
                    }
                }).then(function (res) {
                    v.seats = res.data.list;
                }).catch(function (err) {
                    v.$message('网络或内部错误');
                })
            }
        },
        created() {
            this.getAllPassenger();
            this.getSeats();
        },
        mounted() {
            this.getAllPassenger();
            this.getSeats();
        }
    }
</script>

<style scoped>
    .el-checkbox{
        width:70px;
        font-size: 20px;
    }
    /deep/.el-collapse-item__header{
        font-size: 15px;
    }
</style>