<template>
    <div>
                <Header></Header>
        <div class="signin-form">
            <h3 class="sign-title">ticket-sys 登录</h3>
            <div>
                <el-form :model="loginForm" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input
                                v-model="loginForm.username"
                                autocomplete="off"
                                placeholder="用户名"
                                prefix-icon="el-icon-user-solid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                type="password"
                                v-model="loginForm.password"
                                autocomplete="off"
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm" class="login-btn">登录</el-button>
<!--                        <el-button type="info" @click="goRegister" class="login-btn">注册</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../constant/api';
    import {mapMutations} from "vuex";
    import Header from "../components/Header";

    export default {
        name: 'login',
        components: {Header},
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                userToken: '',
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            submitForm() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/login',
                    data: {
                        'username': v.loginForm.username,
                        'password': v.loginForm.password
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if(res.data.msg==="true"){
                        v.userToken = res.data.token;
                        // 将用户token保存到vuex中
                        v.changeLogin({Authorization: v.userToken, username: v.loginForm.username,userId:res.data.userId});
                        //判断是否有redirect参数
                        console.log(v.$route.query.redirect)
                        if(v.$route.query.redirect!==null && v.$route.query.redirect!==undefined && v.$route.query.redirect!=="/register"){
                            v.$router.push(v.$route.query.redirect);
                        }else{
                            // console.log(v.loginForm.username)
                            if(v.loginForm.username==='admin'){
                                v.$router.push("/admin");
                            }else{
                                v.$router.push('/');
                            }
                        }
                        v.$message('登录成功');
                    }else{
                        v.$message('密码或用户名错误');
                    }
                }).catch(function (err) {
                    console.log("err", err);
                    v.$message('密码或用户名错误');
                })
            },
            goRegister(){
                this.$router.push("/register")
            }
        }
    }
</script>

<style scoped>
    .login-btn {
        width: 100%;
    }

    .signin-form {
        width: 360px;
        margin: 100px auto;
        background-color: #fff;
        padding: 10px 20px;
    }

    .sign-title {
        text-align: center;
        margin-bottom: 25px;
    }

    .second-operate {
        margin-top: -20px;
    }

    .retrieve-password {
        margin-left: 25px;
    }

    .register {
        margin-left: 10px;
    }

    .quict-sign {
        float: right;
        margin-right: 5px;
    }

    .third-party-sign-text {
        text-align: center;
        margin-top: -20px;
        margin-bottom: 20px;
    }

    .third-party-sign {
        width: fit-content;
        margin: auto;
    }

    .third-party-sign a {
        margin-right: 30px;
    }

    .qq-login {
        width: 25px;
        height: 25px;
        vertical-align: middle;
    }
</style>