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
<!--                <el-form :inline="true" style="float: left;">-->
<!--                    <el-form-item>-->
<!--                        <el-checkbox v-for="f in friends" v-model="f.check" @change="addLine(f.name,f.check)">{{f.name}}</el-checkbox>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--                <el-form :inline="true" class="demo-form-inline">-->
<!--                    <el-form-item label="姓名">-->
<!--                        <el-input v-model="addName" placeholder="请输入姓名"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="身份证号码">-->
<!--                        <el-select v-model="addID" placeholder="请输入身份证号码">-->
<!--                            <el-option label="区域一" value="shanghai"></el-option>-->
<!--                            <el-option label="区域二" value="beijing"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item>-->
<!--                        <el-button type="primary" @click="addLine">增加</el-button>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
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
                            prop="ID"
                            label="身份证号码">
                    </el-table-column>
                </el-table>
            </div>
            <el-divider></el-divider>
            <div v-if="active===1">
                <div>
                    <el-collapse v-for="c in seats" :key="c.cx">
                        <el-collapse-item :title="c.cx+'车厢'">
                            <el-checkbox @change="handleSeat(c.cx,s.no,s.id,s.check)" v-model="s.check" style="float: left;" v-for="s in c.ss" :disabled="s.dis" :key="s.id">{{s.no}}</el-checkbox>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div v-if="active===0 ||active===1">
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </div>
            <div v-if="active===2">
                <div v-for="o in multipleSelection">{{o}}</div>
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
                addName:'',
                addID:'',
                tableData: [{
                    name: '王小虎',
                    ID: '666666666666666666',
                }],
                friends:[
                    {
                        name: '王小虎',
                        ID: '666666666666666666',
                    },
                    {
                        name: '王二虎',
                        ID: '666666666666666677',
                    },
                    {
                        name: '王三虎',
                        ID: '666666666666666688',
                    }
                ],
                multipleSelection: [],
                seats:[
                    {
                        "cx":1,
                        "ss":[
                            {
                                "id":1001,
                                "no":"1A",
                                "dis": false,
                                "check":false
                            },
                            {
                                "id":1002,
                                "no":"1B",
                                "dis": false,
                                "check":false
                            }
                        ]
                    },
                    {
                        "cx":2,
                        "ss":[
                            {
                                "id":1003,
                                "no":"1A",
                                "dis": true,
                                "check":false
                            },
                            {
                                "id":1004,
                                "no":"1B",
                                "dis": false,
                                "check":false
                            }
                        ]
                    }
                ],
                multipleSeat:[]
            };
        },
        methods: {
            submit(){
              this.$message("支付成功");
            },
            handleSeat(c,s,id,che){
                if(che===true){
                    this.multipleSeat.push(id)
                }else{
                    let idx = 0;
                    for (let i = 0; i < this.multipleSeat.length; i++) {
                        if (this.multipleSeat[i] === id){
                            idx=i;
                        }
                    }
                    console.log(idx);
                    this.multipleSeat.splice(idx,1);
                }
            },
            addLine(name,check){
                if(check){
                    //add
                }else{
                    //delete
                }
                // const newValue = {
                //     name: this.addName,
                //     ID: this.addID,
                // };
                // //添加新的行数
                // this.tableData.push(newValue);
                // this.addName='';
                // this.addID='';
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            pre() {
                if (this.active-- <0) this.active = 2;
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            getAllPassenger(){
                let v = this;
                this.$axios({
                    method: 'post',
                    //改成/passenger/all就带不了token ！！
                    // url: api.base_url + '/user/login',
                    url: api.base_url + '/user/passenger/all',
                    data: {
                        "userId":v.$store.state.userId,
                    }
                }).then(function (res) {
                    console.log(res.data);
                }).catch(function (err) {
                    console.log("err", err);
                    v.$message('密码或用户名错误');
                })
            }
        },
        created() {
            this.getAllPassenger();
        }
    }
</script>

<style scoped>

</style>