<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div @click="gohome" style="cursor:pointer; margin-top:5px; margin-left: 10px;">
                <img src="../assets/train_logo.png" style="float: left;width: 50px;"/>
                <span style="float: left; font-size: 20px;margin-top:10px;margin-left: 15px;">Ticket-Sys</span>
            </div>
            <div v-if="this.getStoreItem!==''" style="float: right;margin-right: 15px;">
                <el-row>
                    <el-button icon="el-icon-user" type="text" @click="goUser">{{this.getStoreItem}}</el-button>
                    <el-button icon="el-icon-close" type="text" @click="exit">退出登录</el-button>
                </el-row>
            </div>
            <div v-else style="float: right; margin-right: 15px;">
                <el-row>
                    <el-button icon="el-icon-user" @click="register" type="text">注册</el-button>
                    <el-button icon="el-icon-close" @click="login" type="text">登录</el-button>
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
            goUser(){
              this.$router.push("/user")
            },
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
    /deep/.el-button--text{
        color: black;
    }
</style>