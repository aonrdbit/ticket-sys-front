(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab43a"],{1511:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"text-align":"center"}},[a("Header"),a("div",{staticStyle:{height:"50px"}}),a("div",{staticStyle:{margin:"auto",width:"1040px"}},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"我的订单",name:"first"}},t._l(t.orders,(function(e){return a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",staticStyle:{"padding-bottom":"20px"},attrs:{slot:"header"},slot:"header"},[a("span",{staticStyle:{float:"left"}},[t._v(" "+t._s(e.trNo)+" "+t._s(e.st)+"====>"+t._s(e.ed)+" "+t._s(t.fun(e.st_date))+" "+t._s(e.st_time)+"开 ")])]),a("div",{staticClass:"text item"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.psgs}},[a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"140"}}),a("el-table-column",{attrs:{prop:"idx",label:"身份证号",width:"180"}}),a("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"140"}}),a("el-table-column",{attrs:{prop:"cx",label:"车厢",width:"120"}}),a("el-table-column",{attrs:{prop:"zw",label:"座位号",width:"120"}}),a("el-table-column",{attrs:{prop:"status",label:"状态",width:"140"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(s){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.tui(s.row,e)}}},[t._v("退票")])]}}],null,!0)})],1)],1)])],1)})),0),a("el-tab-pane",{attrs:{label:"我的联系人",name:"second"}},[a("div",{staticStyle:{padding:"15px"}},[a("el-form",{staticClass:"demo-form-inline",staticStyle:{float:"left"},attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"添加常用联系人"}}),a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.addName,callback:function(e){t.addName=e},expression:"addName"}})],1),a("el-form-item",{attrs:{label:"身份证号码"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.addID,callback:function(e){t.addID=e},expression:"addID"}})],1),a("el-form-item",{attrs:{label:"手机号码"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.addPhone,callback:function(e){t.addPhone=e},expression:"addPhone"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.addLine}},[t._v("增加")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.friends}},[a("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),a("el-table-column",{attrs:{prop:"idx",label:"身份证号码"}}),a("el-table-column",{attrs:{prop:"phone",label:"手机号码"}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.delPsg(e.row)}}},[t._v("删除")])]}}])})],1)],1)])],1)],1)],1)},l=[],r=a("0418"),o=a("b1ce");const n={Jan:"01",Feb:"02",Mar:"03",Sep:"09",Oct:"10",Nov:"11",Dec:"12"};var d={name:"User",components:{Header:r["a"]},data(){return{addName:"",addID:"",addPhone:"",friends:[],activeName:"first",orders:[]}},methods:{fun(t){return t[24]+t[25]+t[26]+t[27]+"-"+n[t[4]+t[5]+t[6]]+"-"+t[8]+t[9]},getAllOrder(){let t=this;this.$axios({method:"post",url:o["a"].base_url+"/order/all",data:{userId:t.$store.state.userId.toString()}}).then((function(e){console.log("hello",e.data),t.orders=e.data.list})).catch((function(e){console.log("err",e),t.$message("网络或内部错误")}))},getAllPassenger(){let t=this;this.$axios({method:"post",url:o["a"].base_url+"/user/passenger/all",data:{userId:t.$store.state.userId.toString()}}).then((function(e){console.log(e.data),t.friends=e.data.list})).catch((function(e){console.log("err",e),t.$message("网络或内部错误")}))},addLine(){let t=this;this.$axios({method:"post",url:o["a"].base_url+"/user/passenger/add",data:{userId:t.$store.state.userId+"",Name:t.addName+"",ID:t.addID+"",phone:t.addPhone+""}}).then((function(e){console.log(e.data),"true"===e.data.msg?t.getAllPassenger():t.$message("添加错误，请检查信息")})).catch((function(e){console.log("err",e),t.$message("网络或内部错误")}))},delPsg(t){let e=this;this.$axios({method:"post",url:o["a"].base_url+"/user/passenger/del",data:{userId:e.$store.state.userId+"",psgId:t.psgId+""}}).then((function(t){console.log(t.data),"true"===t.data.msg?(e.$message("删除成功"),e.getAllPassenger()):e.$message("网络或内部错误")})).catch((function(t){console.log("err",t),e.$message("网络或内部错误")}))},check(t,e,a,s,l,r){var o;return o=s<t?31-r+a:a-r,console.log(o),o>7},tui(t,e){var a=new Date,s=a.getFullYear(),l=a.getMonth()+1,r=a.getDate();if("已退票"!==t.status){var d=e.st_date;this.check(parseInt(d[24]+d[25]+d[26]+d[27]),parseInt(n[d[4]+d[5]+d[6]]),parseInt(d[8]+d[9]),s,l,r)?this.$confirm("确认退票?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{let a=this;this.$axios({method:"post",url:o["a"].base_url+"/order/del",data:{orId:e.orId+"",psgId:t.psgId+"",seNo:t.cx+"-"+t.zw,st:e.st+"",ed:e.ed+""}}).then((function(t){console.log(t.data),"true"===t.data.msg?(a.$message("退票成功"),a.getAllOrder()):a.$message("网络或内部错误")})).catch((function(t){console.log("err",t),a.$message("网络或内部错误")}))}).catch(()=>{this.$message({type:"info",message:"已取消"})}):this.$alert("不可以退开车时间在7天之内的车票","",{confirmButtonText:"确定"})}else this.$alert("该车票已退票","",{confirmButtonText:"确定"})},handleClick(t,e){console.log(t,e)},quit(){this.$router.push({path:"/list",query:{st:this.$route.query.st,ed:this.$route.query.ed,date:this.$route.query.date.toString()}})},st_timeformat(t){return t[0]+t[1]+t[2]+t[3]+t[4]},timeformat(t){return t[11]+t[12]+t[13]+t[14]+"-"+n[t[4]+t[5]+t[6]]+"-"+t[8]+t[9]}},created(){this.getAllPassenger(),this.getAllOrder()},mounted(){this.getAllPassenger(),this.getAllOrder()}},i=d,c=a("2877"),u=Object(c["a"])(i,s,l,!1,null,"38bfb4a8",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0ab43a.6e1ae1c9.js.map