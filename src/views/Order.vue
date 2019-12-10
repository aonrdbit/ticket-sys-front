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
            <el-divider></el-divider>
            <div v-if="active===1">
                <div>
                    <el-collapse v-for="c in seats" :key="c.cx">
                        <el-collapse-item :title="c.cx+'车厢'">
                            <el-checkbox @change="handleSeat(c.cx,s.seNo,s.check)" v-model="s.check"
                                         style="float: left;" v-for="s in c.ss" :disabled="s.status" :key="s.seNo">{{s.seNo}}
                            </el-checkbox>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div v-if="active===0 ||active===1">
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </div>
            <div v-if="active===2">
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

    export default {
        name: "Buy",
        components: {Header},
        data() {
            return {
                active: 0,
                addName: '',
                addID: '',
                addPhone:'',
                friends: [],
                multipleSelection: [],
                seats: [],
                multipleSeat: []
            };
        },
        methods: {
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
                        if (this.multipleSeat[i] === id) {
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
                        "Name":v.addName,
                        "ID":v.addID,
                        "phone":v.addPhone,
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if(res.data.msg==="true"){
                        v.getAllPassenger();
                    }else{
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
            getSeats(){
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/train/seat/all',
                    data: {
                        "trId": v.$route.query.trId.toString(),
                    }
                }).then(function (res) {
                    v.seats=res.data.list;
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

</style>