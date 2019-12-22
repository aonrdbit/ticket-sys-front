<template>
    <div>
        <Header></Header>
        <div class="signin-form">
            <h3 class="sign-title">ticket-sys 注册</h3>
            <div>
                <el-form :model="regForm" :rules="rules" status-icon class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input
                                v-model="regForm.username"
                                autocomplete="off"
                                placeholder="用户名"
                                prefix-icon="el-icon-user-solid"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                type="password"
                                v-model="regForm.password"
                                autocomplete="off"
                                placeholder="密码"
                                prefix-icon="el-icon-lock"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="REpassword">
                        <el-input
                                type="password"
                                v-model="regForm.REpassword"
                                autocomplete="off"
                                placeholder="确认密码"
                                prefix-icon="el-icon-lock"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="name">
                        <el-input
                                v-model="regForm.name"
                                autocomplete="off"
                                placeholder="姓名"
                                prefix-icon="el-icon-user"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="ID">
                        <el-input
                                v-model="regForm.ID"
                                autocomplete="off"
                                placeholder="身份证号码"
                                prefix-icon="el-icon-bank-card"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input
                                v-model="regForm.phone"
                                autocomplete="off"
                                placeholder="手机号码"
                                prefix-icon="el-icon-mobile-phone"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
<!--                        <el-button type="primary" @click="submitForm" class="login-btn">登录</el-button>-->
                        <el-button type="primary" @click="submitForm" class="login-btn">注册</el-button>
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
        name: 'Register',
        components: {Header},
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.regForm.REpassword !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var phoneVa=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if (value.length!==11) {
                    callback(new Error('请输入正确的手机号码!'));
                }else if(!(/^1\\d{10}$/.test(value.toString()))){
                    callback(new Error('请输入正确的手机号码!'));
                } else {
                    callback();
                }
            };
            var IDVa=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入身份证号码'));
                } else if (value.length!==18) {
                    callback(new Error('请输入正确的身份证号码!'));
                } else if(!(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value.toString()))){
                    callback(new Error('请输入正确的身份证号码!'));
                } else {
                    callback();
                }
            };
            return {
                regForm: {
                    username: '',
                    password: '',
                    REpassword:'',
                    name:'',
                    ID:'',
                    phone:''
                },
                userToken: '',
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {validator:validatePass, trigger: 'blur'},
                    ],
                    REpassword:[
                        {validator:validatePass2,trigger:'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入真实姓名', trigger: 'blur'},
                    ],
                    ID: [
                        {validator:IDVa, trigger: 'blur'},
                    ],
                    phone: [
                        {validator:phoneVa, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            ...mapMutations(['changeLogin']),
            submitForm() {
                let v = this;
                this.$axios({
                    method: 'post',
                    url: api.base_url + '/user/register',
                    data: {
                        'username': v.regForm.username,
                        'password': v.regForm.password,
                        'name':v.regForm.name,
                        'ID':v.regForm.ID,
                        'phone':v.regForm.phone
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if(res.data.msg==="true"){
                        v.$router.push("/login")
                        v.$message('注册成功');
                    }else{
                        v.$message('网络或内部错误');
                    }
                }).catch(function (err) {
                    console.log("err", err);
                    v.$message('网络或内部错误');
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