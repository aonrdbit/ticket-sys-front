<template>
    <div style="text-align: center;">
        <div style="height: 50px;"></div>
        <div style="margin: auto; width: 1040px;">
            <el-steps :active="active" finish-status="success">
                <el-step title="选择乘客信息">
                </el-step>
                <el-step title="选择座位信息">
                </el-step>
                <el-step title="支付">
                </el-step>
            </el-steps>
            <div v-if="active===0">
                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="姓名">
                        <el-input v-model="addName" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码">
                        <el-input v-model="addID" placeholder="请输入身份证号码"></el-input>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="tableData"
                        style="width: 100%">
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
                <el-button style="margin-top: 12px;" @click="addLine">增加一行</el-button>
            </div>
            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Buy",
        data() {
            return {
                active: 0,
                addName:'',
                addID:'',
                tableData: [{
                    name: '王小虎',
                    ID: '666666666666666666'
                }]
            };
        },
        methods: {
            addLine(){
                const newValue = {
                    name: this.addName,
                    ID: this.addID,
                };
                //添加新的行数
                this.tableData.push(newValue);
                this.addName='';
                this.addID='';
            },
            pre() {
                if (this.active-- <0) this.active = 2;
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            }
        }
    }
</script>

<style scoped>

</style>