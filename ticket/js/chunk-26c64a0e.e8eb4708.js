(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26c64a0e"],{"1b8c":function(e,r,o){},"65f4":function(e,r,o){"use strict";var t=o("1b8c"),s=o.n(t);s.a},"73cf":function(e,r,o){"use strict";o.r(r);var t=function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("div",[o("Header"),o("div",{staticClass:"signin-form"},[o("h3",{staticClass:"sign-title"},[e._v("ticket-sys 注册")]),o("div",[o("el-form",{staticClass:"demo-ruleForm",attrs:{model:e.regForm,rules:e.rules,"status-icon":""}},[o("el-form-item",{attrs:{prop:"username"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:"用户名","prefix-icon":"el-icon-user-solid"},model:{value:e.regForm.username,callback:function(r){e.$set(e.regForm,"username",r)},expression:"regForm.username"}})],1),o("el-form-item",{attrs:{prop:"password"}},[o("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"密码","prefix-icon":"el-icon-lock"},model:{value:e.regForm.password,callback:function(r){e.$set(e.regForm,"password",r)},expression:"regForm.password"}})],1),o("el-form-item",{attrs:{prop:"REpassword"}},[o("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:"确认密码","prefix-icon":"el-icon-lock"},model:{value:e.regForm.REpassword,callback:function(r){e.$set(e.regForm,"REpassword",r)},expression:"regForm.REpassword"}})],1),o("el-form-item",{attrs:{prop:"name"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:"姓名","prefix-icon":"el-icon-user"},model:{value:e.regForm.name,callback:function(r){e.$set(e.regForm,"name",r)},expression:"regForm.name"}})],1),o("el-form-item",{attrs:{prop:"ID"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:"身份证号码","prefix-icon":"el-icon-bank-card"},model:{value:e.regForm.ID,callback:function(r){e.$set(e.regForm,"ID",r)},expression:"regForm.ID"}})],1),o("el-form-item",{attrs:{prop:"phone"}},[o("el-input",{attrs:{autocomplete:"off",placeholder:"手机号码","prefix-icon":"el-icon-mobile-phone"},model:{value:e.regForm.phone,callback:function(r){e.$set(e.regForm,"phone",r)},expression:"regForm.phone"}})],1),o("el-form-item",[o("el-button",{staticClass:"login-btn",attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("注册")])],1)],1)],1)])],1)},s=[],a=o("b1ce"),n=o("2f62"),l=o("0418"),i={name:"Register",components:{Header:l["a"]},data(){var e=(e,r,o)=>{""===r?o(new Error("请输入密码")):(""!==this.regForm.REpassword&&this.$refs.ruleForm.validateField("checkPass"),o())},r=(e,r,o)=>{""===r?o(new Error("请再次输入密码")):r!==this.regForm.password?o(new Error("两次输入密码不一致!")):o()},o=(e,r,o)=>{""===r?o(new Error("请输入手机号码")):11!==r.length?o(new Error("请输入正确的手机号码!")):/^1[34578]\d{9}$/.test(r.toString())?o():o(new Error("请输入正确的手机号码!"))},t=(e,r,o)=>{""===r?o(new Error("请输入身份证号码")):18!==r.length?o(new Error("请输入正确的身份证号码!")):/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(r.toString())?o():o(new Error("请输入正确的身份证号码!"))};return{regForm:{username:"",password:"",REpassword:"",name:"",ID:"",phone:""},userToken:"",rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{validator:e,trigger:"blur"}],REpassword:[{validator:r,trigger:"blur"}],name:[{required:!0,message:"请输入真实姓名",trigger:"blur"}],ID:[{validator:t,trigger:"blur"}],phone:[{validator:o,trigger:"blur"}]}}},methods:{...Object(n["b"])(["changeLogin"]),submitForm(){let e=this;this.$axios({method:"post",url:a["a"].base_url+"/user/register",data:{username:e.regForm.username,password:e.regForm.password,name:e.regForm.name,ID:e.regForm.ID,phone:e.regForm.phone}}).then((function(r){console.log(r.data),"true"===r.data.msg?(e.$router.push("/login"),e.$message("注册成功")):e.$message("网络或内部错误")})).catch((function(r){console.log("err",r),e.$message("网络或内部错误")}))},goRegister(){this.$router.push("/register")}}},m=i,p=(o("65f4"),o("2877")),c=Object(p["a"])(m,t,s,!1,null,"3c1d5214",null);r["default"]=c.exports}}]);
//# sourceMappingURL=chunk-26c64a0e.e8eb4708.js.map