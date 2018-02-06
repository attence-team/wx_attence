<template>
    <div class="body-box scroll">
      <div class="leave">
         <div class="form-box">
             <div class="form-row">
                 <div class="row-left"><i class="icon type-icon"></i></div>
                 <div class="row-wrapper">
                     <JESelect v-model="leaveType" title="请假类型" :options="typeList"/>
                 </div>
             </div>
             <div class="form-row">
                 <div class="row-left"><i class="icon start-date-icon"></i></div>
                 <div class="row-wrapper">
                     <JEInput v-model="startDate" type="date" title="请假起日期" placeholder="请选择请假类型（必填）"/>
                 </div>
             </div>
             <div class="form-row">
                 <div class="row-left"><i class="icon end-date-icon"></i></div>
                 <div class="row-wrapper ">
                     <JEInput v-model="endDate"  type="date" title="请假预计止日期"/>
                 </div>
             </div>
             <div class="form-row">
                 <div class="row-left"><i class="icon info-icon"></i></div>
                 <div class="row-wrapper ">
                     <JEInput v-model="countCards" type="number" title="免打卡次数" placeholder="免打卡次数（必填）"/>
                 </div>
             </div>
             <div class="form-row">
                 <div class="row-left"><i class="icon bi-icon"></i></div>
                 <div class="row-wrapper ">
                     <JEInput v-model="reasonInfo" title="请假事由" placeholder="请假事由（必填）"/>
                 </div>
             </div>
             <div class="form-row">
                 <div class="row-left"><i class="icon person-icon"></i></div>
                 <div class="row-wrapper ">
                     <span class="row-title">审批人</span>
                     <div class="approve-list" v-for="(approve,j) in approveGroups">
                         <!--<span class="approve-item active">-->
                             <!--<span>林宏</span>-->
                             <!--<i>公司领导</i>-->
                         <!--</span>-->
                         <!--<i class="iconfont icon-web__bitebiyoujiantou approve-arrow"></i>-->
                         <!--<span class="approve-item active">-->
                             <!--<span class="small">林宏林宏</span>-->
                             <!--<i>公司领导</i>-->
                         <!--</span>-->
                         <!--<i class="iconfont icon-web__bitebiyoujiantou approve-arrow"></i>-->
                         <!--<span class="approve-item">-->
                             <!--<span></span>-->
                             <!--<i>考勤管理员</i>-->
                         <!--</span>-->
                         <template v-for="(group,k) in approve.group_dt">
                             <i v-if="k>0" class="iconfont icon-web__bitebiyoujiantou approve-arrow"></i>
                             <span :class="{'approve-item':true,active:group.selectedValue.name!='',isEdit:group.staffs.length==1}">
                                <span>{{group.selectedValue.name}}</span>
                                <i>{{group.post_alias}}</i>
                                 <select v-if="group.staffs.length>1"  v-model="group.selectedValue.staff_num" @change="changeSelect(j,k,$event)">
                                     <option></option>
                                     <option v-for="(stff,idx) in group.staffs" :value="idx">{{stff.name}}</option>
                                 </select>
                             </span>
                         </template>
                     </div>
                 </div>
             </div>
         </div>
          <div class="form-btns">
              <mt-button type="default" class="cancel">取消</mt-button>
              <mt-button type="primary" class="submit" @click="saveLeave">保存</mt-button>
          </div>
      </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import {SpHttp} from '@/api/spHttp';
    import JEInput from "@/components/form/je-input";
    import JESelect from "@/components/form/je-select";
    import { Toast, Indicator } from 'mint-ui';
    export default {
        name: 'leave',
        components:{JEInput,JESelect},
        data(){
            return {
                leaveType:'',
                typeList:[],
                days:0,
                startDate: new Date().Format2String('yyyy-MM-dd'),
                endDate: new Date().Format2String('yyyy-MM-dd'),
                reasonInfo:'',
                countCards: '',
                approveGroups:[],
                electedOrderGroups:[], /* 选中的审批人 */
                approveGroupsCount:0,
                userInfo:{}
            }
        },
        watch:{
          leaveType(newVal){
             this.days = 0;
             for(let i=0;i<this.typeList.length;i++){
                if(newVal == this.typeList[i].value){
                   this.days = this.typeList[i].days?this.typeList[i].days:0;
                   return;
                }
             }
          },
          startDate(newVal,oldVal){
            if(!this.betweenTime()){
              this.$nextTick(()=>{
                this.startDate = oldVal;
              });
            }
          },
          endDate(newVal,oldVal){
            if(!this.betweenTime()){
              this.$nextTick(()=>{
                this.endDate = oldVal;
              });
            }
          }
        },
        activated(){
            setTitle('请假申请');
            Object.assign(this.$data, this.$options.data());
            this.userInfo = getUserInfo();
            this.getLeaveType(()=>{
                this.$nextTick(()=>{
                    this.getLeaveInfo();
                    this.dealWithType();
                })
            });
            this.querySubmitInfo();
        },
        methods:{
            dealWithType(){/* 从异常处理跳转过来  */
               if(this.$route.query.type=='exception'){
                  // 请假类型处理
                  for(let i=0;i<this.typeList.length;i++){
                     if(this.typeList[i].name=="因公办事"){
                       this.leaveType = this.typeList[i].value;
                       break;
                     }
                  }
                  // 时间的处理
                  this.startDate = this.$route.query.time.Format2String('yyyy-MM-dd');
                  this.endDate = this.$route.query.time.Format2String('yyyy-MM-dd');
               }
            },
            changeSelect(j,k,e){
                if(!e.target.value) return;
                this.approveGroups[j].group_dt[k].selectedValue = this.approveGroups[j].group_dt[k].staffs[e.target.value];
            },
            betweenTime(){
              let num = (new Date(this.endDate).getTime() - new Date(this.startDate).getTime())/(1000*60*60*24);
              if(num<0){
                Toast({
                  message: '开始时间不能大于结束时间',
                  duration: 1500
                });
                return false;
              }
              if(this.days&&num>this.days){
                Toast({
                  message: '请假天数不能大于'+this.days+'天',
                  duration: 1500
                });
                return false;
              }
              return true;
            },
            getLeaveType(callBackFn){
                KqHttp.queryLeaveType({
                    staff_num: getUserInfo().staff_num
                }).then((res)=>{
                    if(res.code == 1){
                        for(let i=0;i<res.data.length;i++){
                            let dyts = res.data[i].valid_nxjdays?res.data[i].valid_nxjdays:0;
                            if('年休假'== res.data[i].leave_cause){
                               this.typeList.push({
                                  name:res.data[i].leave_cause+'-'+dyts+'天',
                                  value:res.data[i].leave_num,
                                  days:dyts
                               });
                            }else{
                                this.typeList.push({
                                  name:res.data[i].leave_cause,
                                  value:res.data[i].leave_num,
                                  days:dyts
                                });
                            }
                        }
                        this.leaveType = res.data[0].leave_num;
                        if(callBackFn){
                            callBackFn();
                        }
                    }
                });
            },
            querySubmitInfo(){
                let vou_id = this.$route.query.id?this.$route.query.id:1;
                SpHttp.getSubmitInfo({
                    vouty: 'kqt_deptleave_manage',
                    vou_id: vou_id,
                    dept: getUserInfo().dept_num
                }).then((res)=>{
                    if(res.code == 1){
                        for(let i=0;i<res.groups.length;i++){
                            for(let k=0;k<res.groups[i].group_dt.length;k++){
                                let group = res.groups[i].group_dt[k];
                                if(group.staffs.length==1){
                                    res.groups[i].group_dt[k].selectedValue = group.staffs[0];
                                }else{
                                    res.groups[i].group_dt[k].selectedValue = {name:'',staff_num:''};
                                }
                            }
                        }
                        this.approveGroups = res.groups;
                    }
                });
            },
            getLeaveInfo(){
               if(!this.$route.query.id) return;
               /* 获取信息，进行编辑 */
               KqHttp.getLeaveInfo({
                   sys_idkey:this.$route.query.id
               }).then((res)=>{
                   if(res.code==1){
                       this.leaveType = res.data.leave_num;
                       this.startDate = res.data.start_date.Format2String('yyyy-MM-dd');
                       this.endDate = res.data.end_date.Format2String('yyyy-MM-dd');
                       this.reasonInfo = res.data.reason;
                       this.countCards = res.data.times;
                   }
               });
            },
            dealWithOrderGroups(){
               let tempArry = [];
               let tempCount = 0 ;
               for(let i=0;i<this.approveGroups.length;i++){
                   let approveGroup = this.approveGroups[i];
                   for(let j=0;j<approveGroup.group_dt.length;j++){
                      tempCount++;
                      let approve = approveGroup.group_dt[j];
                      if(approve.selectedValue.name){
                        tempArry.push({
                          "post_alias":approve.post_alias,
                          "is_use":"1",
                          "post_id":approve.post_id,
                          "staff":approve.selectedValue.staff_num,
                          "staff_nm":approve.selectedValue.name,
                          "prior":approve.aud_prior,
                          "vou_id":""
                        });
                      }
                   }
               }
               this.approveGroupsCount = tempCount;
               this.selectedOrderGroups = tempArry;
            },
            saveOrder(sysKey){ /* 保存审批 */
               for(let i=0;i<this.selectedOrderGroups.length;i++){
                 this.selectedOrderGroups[i].vou_id = sysKey;
               }
               SpHttp.saveSubmitInfo({
                  info:this.selectedOrderGroups,
                  groupId:this.approveGroups[0].group_id,
                  vouid:sysKey,
                  vou_ty:'kqt_deptleave_manage',
                  tjren: this.userInfo.staff_num
               }).then((res)=>{
                   Toast({
                       message: res.result,
                       duration: 2000
                   });
                   if(res.code==1){
                      this.$router.goBack();
                   }
               });
            },
            saveLeave(){
                let sysIdkey = this.$route.query.id?this.$route.query.id:'';
                let params = {
                    sys_idkey:sysIdkey,
                    leave_num: this.leaveType,
                    staff_num: getUserInfo().staff_num,
                    start_date: this.startDate.Format2String('yyyyMMdd'),
                    intending_date: this.endDate.Format2String('yyyyMMdd'),
                    times: this.countCards,
                    reason: this.reasonInfo
                };
                if(!params.times){
                    Toast({
                        message: '请输入免打卡次数',
                        duration: 3000
                    });
                    return
                }
                if(!params.reason){
                    Toast({
                        message: '请输入请假事由',
                        duration: 3000
                    });
                    return
                }
                this.dealWithOrderGroups();
                if(this.approveGroupsCount!==this.selectedOrderGroups.length){
                  Toast({
                    message: '请选择审批人',
                    duration: 3000
                  });
                  return
                }
                Indicator.open({
                    text: '提交中...',
                    spinnerType: 'fading-circle'
                });
                KqHttp.saveLeave(params).then((res)=>{
                    Indicator.close();
                    Toast({
                        message: res.result,
                        duration: 2000
                    });
                    if(res.code == 1){
                        this.saveOrder(res.data.sys_idkey);
                    }
                }).catch((error) => {
                    Indicator.close();
                })
            }
        }
    }
</script>

<style lang="css" scoped>
    .leave{
       min-height: 100%;
       background-color: #fff;
    }
    .form-box{
        margin-left: 0.25rem;
        padding: 0.2rem 0;
    }
    .form-box .form-row{
        overflow: hidden;
        padding: 0.2rem 0 0 0;
    }
    .form-row .row-left,
    .form-row .row-wrapper{
        float: left;
        height: 100%;
    }
    .form-row .row-left{
        width: 10%;
    }
    .form-row .row-wrapper{
        width: 90%;
    }
    .row-wrapper .row-title{
        display: block;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 16px;
    }
    @media screen and (min-width: 300px) and (max-width: 360px) {
        .row-wrapper .row-title{
            font-size: 14px;
        }
    }
    .form-row .icon{
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        background-size: cover;
    }
    .approve-list{
        padding: 0.2rem 0;
    }
    .approve-list .approve-arrow{
        display: inline-block;
        margin: 0 0.1rem;
        color: #e5e5e5;
        font-size: 0.6rem;
        vertical-align: -0.1rem;
    }
    .approve-list .approve-item{
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 1.4rem;
        text-align: center;
        margin-top: 0.4rem;
    }
    .approve-list .approve-item select{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 0;
    }
    .approve-list .approve-item span{
        position: relative;
        display: block;
        margin: 0 auto;
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        background-color: #e5e5e5;
        color: #aaa;
        overflow: hidden;
        font-size: 18px;
    }
    .approve-list .approve-item span.small{
        font-size: 14px;
    }
    .approve-list .approve-item.active span{
        color: #fff;
        background-color: #6179d1;
    }
    .approve-list .approve-item:after{
        display: block;
        content: '';
        position: absolute;
        top: -0.1rem;
        right: 0;
        width: 0.4rem;
        height: 0.4rem;
        border: solid 1px #eee;
        border-radius: 50%;
        background-color: #aaaaaa;
        background-size: cover;
        background-image: url("../../assets/img/icon/bi-edit.png");
    }
    .approve-list .approve-item.isEdit:after{
        display: none;
    }
    .approve-list .approve-item.active:after{
        background-color: #6179d1;
    }
    .approve-list .approve-item i{
        display: inline-block;
        text-align: center;
        margin-top: 0.1rem;
        padding: 0.1rem;
        background-color: #ededed;
        font-size: 0.8em;
        border-radius: 5px;
        color: #666;
    }
    .approve-list .approve-item.active i{
        background-color: #4fb273;
        color: #fff;
    }
    .approve-list .approve-item span:before{
        display: block;
        position: absolute;
        top: -0.05rem;left: 0;
        content: "+";
        height: 100%;
        width: 100%;
        font-size: 0.8rem;
        color: #aaa;
    }
    .approve-list .approve-item.active span:before{
        display: none;
    }
    .info-icon{
        background-image: url("../../assets/img/icon/info.png");
    }
    .type-icon{
        background-image: url("../../assets/img/icon/type-icon.png");
    }
    .start-date-icon{
        background-image: url("../../assets/img/icon/start-date-icon.png");
    }
    .end-date-icon{
        background-image: url("../../assets/img/icon/end-date-icon.png");
    }
    .bi-icon{
        background-image: url("../../assets/img/icon/bi-icon.png");
    }
    .person-icon{
        background-image: url("../../assets/img/icon/person-icon.png");
    }
</style>
