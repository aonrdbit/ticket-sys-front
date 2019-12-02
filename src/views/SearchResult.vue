<template>
    <div>
        <div style="height: 50px;"></div>
        <el-form ref="form" :inline="true" >
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
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SearchResult",
        data() {
            return {
                st:'',
                ed:'',
                value:'',
                date:'',
                options:[
                    {
                        value:'gzn',
                        label:'广州南'
                    },
                    {
                        value:'gzd',
                        label:'广州东'
                    }
                ]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.$message(this.st+' '+this.ed+' '+this.date);
            }
        }
    }
</script>

<style scoped>

</style>