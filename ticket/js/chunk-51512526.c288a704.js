(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51512526"],{"214b":function(t,e,l){},cf2a:function(t,e,l){"use strict";l.r(e);var s=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticStyle:{"text-align":"center"}},[l("Header"),l("div",{staticStyle:{height:"50px"}}),l("div",{staticStyle:{margin:"auto",width:"1040px"}},[l("el-steps",{attrs:{active:t.active,"finish-status":"success"}},[l("el-step",{attrs:{title:"选择乘客信息"}}),l("el-step",{attrs:{title:"选择座位信息"}}),l("el-step",{attrs:{title:"确认订单"}})],1),l("el-divider"),0===t.active||1===t.active?l("div",[l("el-form",{staticClass:"demo-form-inline",staticStyle:{float:"left"},attrs:{inline:!0}},[l("el-form-item",{attrs:{label:"添加常用联系人"}}),l("el-form-item",{attrs:{label:"姓名"}},[l("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.addName,callback:function(e){t.addName=e},expression:"addName"}})],1),l("el-form-item",{attrs:{label:"身份证号码"}},[l("el-input",{attrs:{placeholder:"请输入身份证号码"},model:{value:t.addID,callback:function(e){t.addID=e},expression:"addID"}})],1),l("el-form-item",{attrs:{label:"手机号码"}},[l("el-input",{attrs:{placeholder:"请输入手机号码"},model:{value:t.addPhone,callback:function(e){t.addPhone=e},expression:"addPhone"}})],1),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:t.addLine}},[t._v("增加")])],1)],1),l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.friends},on:{"selection-change":t.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),l("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),l("el-table-column",{attrs:{prop:"idx",label:"身份证号码"}})],1)],1):t._e(),1===t.active?l("div",[l("el-divider"),l("span",[t._v("1车厢为一等座，2，3车厢为二等座")]),l("div",t._l(t.seats,(function(e){return l("el-collapse",{key:e.cx},[l("el-collapse-item",{attrs:{title:e.cx+"车厢"}},t._l(e.ss,(function(s){return l("el-checkbox",{key:s.seNo,staticStyle:{float:"left"},attrs:{disabled:s.status},on:{change:function(l){return t.handleSeat(e.cx,s.seNo,s.check)}},model:{value:s.check,callback:function(e){t.$set(s,"check",e)},expression:"s.check"}},[t._v(" "+t._s(t.fun(s.seNo))+" ")])})),1)],1)})),1)],1):t._e(),0===t.active||1===t.active&&0!==t.seats.length?l("div",[l("el-button",{staticStyle:{"margin-top":"12px"},on:{click:t.next}},[t._v("下一步")])],1):t._e(),2===t.active?l("div",[l("div",[l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"clearfix",staticStyle:{"padding-bottom":"20px"},attrs:{slot:"header"},slot:"header"},[l("span",{staticStyle:{float:"left"}},[t._v(" "+t._s(t.$route.query.trNo)+" "+t._s(t.$route.query.st)+"====>"+t._s(t.$route.query.ed)+" "+t._s(t.timeformat(t.$route.query.date))+" "+t._s(t.st_timeformat(t.$route.query.st_time))+"开 ")]),l("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:t.quit}},[t._v("取消订单")])],1),l("div",{staticClass:"text item"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.multipleSelection}},[l("el-table-column",{attrs:{prop:"name",label:"姓名",width:"180"}}),l("el-table-column",{attrs:{prop:"idx",label:"身份证号",width:"180"}}),l("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"180"}}),l("el-table-column",{attrs:{prop:"cx",label:"车厢",width:"180"}}),l("el-table-column",{attrs:{prop:"zw",label:"座位号",width:"180"}})],1)],1)])],1),l("div",{staticStyle:{float:"right"}},[l("el-button",{staticStyle:{color:"black"},attrs:{type:"text"}},[t._v("总计："+t._s(t.tot)+"元")]),l("el-button",{attrs:{type:"danger"},on:{click:t.submit}},[t._v("支付订单")])],1)]):t._e()],1)],1)},a=[],i=l("0418"),o=l("b1ce");l("2f62"),l("5c96");const r={Jan:"01",Feb:"02",Mar:"03",Sep:"09",Oct:"10",Nov:"11",Dec:"12"};var n={name:"Buy",components:{Header:i["a"]},data(){return{active:0,addName:"",addID:"",addPhone:"",friends:[],multipleSelection:[],seats:[],multipleSeat:[],tot:0}},methods:{quit(){this.$router.push({path:"/list",query:{st:this.$route.query.st,ed:this.$route.query.ed,date:this.$route.query.date.toString()}})},st_timeformat(t){return t[0]+t[1]+t[2]+t[3]+t[4]},timeformat(t){return t[11]+t[12]+t[13]+t[14]+"-"+r[t[4]+t[5]+t[6]]+"-"+t[8]+t[9]},fun(t){return t.substr(3,5)},submit(){for(let e=0;e<this.multipleSelection.length;e++)console.log(this.multipleSelection[e]);console.log(this.$route.query.trId,this.$route.query.trNo,this.$route.query.st,this.$route.query.ed,this.timeformat(this.$route.query.date),this.st_timeformat(this.$route.query.st_time));let t=this;this.$axios({method:"post",url:o["a"].base_url+"/order/add",data:{userId:t.$store.state.userId.toString(),trId:this.$route.query.trId.toString(),trNo:this.$route.query.trNo.toString(),st:this.$route.query.st,ed:this.$route.query.ed,firPrice:this.$route.query.firPrice.toString(),secPrice:this.$route.query.secPrice.toString(),tot:this.tot.toString(),date:this.timeformat(this.$route.query.date),psgs:this.multipleSelection}}).then((function(e){console.log(e.data),"true"===e.data.msg?(t.$message("支付成功"),t.$router.push("/user")):t.$message("订单信息错误，请检查乘客是否已购买当前班次车票")})).catch((function(e){console.log("err",e),t.$message("网络或内部错误")}))},handleSeat(t,e,l){if(console.log(t,e,l),console.log(this.multipleSeat),!0===l)this.multipleSeat.push(e);else{let t=0;for(let l=0;l<this.multipleSeat.length;l++)this.multipleSeat[l]===e&&(t=l);console.log(t),this.multipleSeat.splice(t,1)}},addLine(){if(""===this.addName||""===this.addID||18!==this.addID.length||""===this.addPhone||11!==this.addPhone.length)return void this.$message("请输入正确的乘客信息");let t=this;this.$axios({method:"post",url:o["a"].base_url+"/user/passenger/add",data:{userId:t.$store.state.userId+"",Name:t.addName+"",ID:t.addID+"",phone:t.addPhone+""}}).then((function(e){console.log(e.data),"true"===e.data.msg?t.getAllPassenger():t.$message("添加错误，请检查信息")})).catch((function(e){console.log("err",e),t.$message("网络或内部错误")}))},handleSelectionChange(t){this.multipleSelection=t,console.log(this.multipleSelection)},pre(){this.active--<0&&(this.active=2)},openFullScreen(){const t=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});return t},closeFullScreen(t){t.close()},next(){if(this.active,1===this.active){if(console.log(this.multipleSelection.length,this.multipleSeat.length),this.multipleSelection.length!==this.multipleSeat.length||0===this.multipleSelection.length||0===this.multipleSeat.length)return void this.$message("每个乘客选择一个座位");for(let t=0;t<this.multipleSelection.length;t++)this.multipleSelection[t].cx=this.multipleSeat[t].substr(0,2),this.multipleSelection[t].zw=this.multipleSeat[t].substr(3,3);this.calPrice()}this.active++>2&&(this.active=0)},getAllPassenger(){let t=this;this.$axios({method:"post",url:o["a"].base_url+"/user/passenger/all",data:{userId:t.$store.state.userId.toString()}}).then((function(e){console.log(e.data),t.friends=e.data.list})).catch((function(e){console.log("err",e),t.$message("网络或内部错误")}))},getSeats(){let t=this;this.$axios({method:"post",url:o["a"].base_url+"/train/seat/all",data:{trId:t.$route.query.trId.toString(),st:t.$route.query.st,ed:t.$route.query.ed}}).then((function(e){console.log(e),t.seats=e.data.list})).catch((function(e){t.$message("网络或内部错误")}))},calPrice(){var t=0,e=this.multipleSelection;for(let l=0;l<e.length;l++)"01"===e[l].cx||"02"===e[l].cx?t+=parseFloat(this.$route.query.firPrice):t+=parseFloat(this.$route.query.secPrice),console.log(t);this.tot=t}},created(){this.getAllPassenger(),this.getSeats()},mounted(){this.getAllPassenger(),this.getSeats()}},c=n,u=(l("e65b"),l("2877")),d=Object(u["a"])(c,s,a,!1,null,"2a5b1ba4",null);e["default"]=d.exports},e65b:function(t,e,l){"use strict";var s=l("214b"),a=l.n(s);a.a}}]);
//# sourceMappingURL=chunk-51512526.c288a704.js.map