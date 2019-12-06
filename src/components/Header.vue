<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div @click="gohome" style="cursor:pointer; margin-top:5px; margin-left: 10px;">
                <img src="../assets/train_logo.png" style="float: left;width: 50px;"/>
                <span style="float: left; font-size: 20px;margin-top:10px;margin-left: 15px;">Ticket-Sys</span>
            </div>
            <div v-if="this.getStoreItem!==''" style="float: right;">
                <el-row>
                    <el-button icon="el-icon-user" circle>{{this.getStoreItem}}</el-button>
                    <el-button icon="el-icon-close" circle @click="exit">退出登录</el-button>
                </el-row>
            </div>
            <div v-else style="float: right; margin-right: 10px;">
                <el-row>
                    <el-button icon="el-icon-user" circle @click="register">注册</el-button>
                    <el-button icon="el-icon-close" circle @click="login">登录</el-button>
                </el-row>
            </div>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '1',
            };
        },
        computed: {
            getStoreItem() {
                console.log(this.$store.state.username)
                return this.$store.state.username;
            }
        },
        methods: {
            exit() {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('username');
                this.$store.state.username='';
                this.$store.state.Authorization='';
                this.$router.push('/login');
            },
            gohome() {
                this.$router.push({path: '/'});
            },
            register(){
                this.$router.push("/register");
            },
            login(){
                if(this.$route.path==='/login'){
                    return;
                }
                if(this.$route.path==='/register'){
                    this.$router.push("/login")
                    return;
                }
                this.$router.replace({
                    name:"login",
                    query: {redirect: this.$router.currentRoute.fullPath}
                })
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>