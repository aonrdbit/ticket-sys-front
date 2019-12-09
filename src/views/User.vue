<template>
    <div style="text-align: center;">
        <Header></Header>
        <div style="height: 50px;"></div>
        <div style="margin: auto; width: 1040px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的订单" name="first">我的订单</el-tab-pane>
                <el-tab-pane label="个人信息" name="second">个人信息</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "User",
        components: {Header},
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>