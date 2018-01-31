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
                startDate: new Date().Format2String('yyyy-MM-dd'),
                endDate: new Date().Format2String('yyyy-MM-dd'),
                reasonInfo:'',
                countCards: '',
                approveGroups:[]
            }
        },
        activated(){
            setTitle('请假申请');
            Object.assign(this.$data, this.$options.data());
            this.getLeaveType(()=>{
                this.$nextTick(()=>{
                    this.getLeaveInfo();
                })
            });
            this.querySubmitInfo();
        },
        methods:{
            changeSelect(j,k,e){
                if(!e.target.value) return;
                this.approveGroups[j].group_dt[k].selectedValue = this.approveGroups[j].group_dt[k].staffs[e.target.value];
            },
            getLeaveType(callBackFn){
                KqHttp.queryLeaveType({
                    staff_num: getUserInfo().staff_num
                }).then((res)=>{
                    if(res.code == 1){
                        for(let i=0;i<res.data.length;i++){
                            this.typeList.push({
                                name:res.data[i].leave_cause,
                                value:res.data[i].leave_num
                            });
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
                        duration: 1500
                    });
                    return
                }
                if(!params.reason){
                    Toast({
                        message: '请输入请假事由',
                        duration: 1500
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
                        duration: 1500
                    });
                    if(res.code == '1'){
                        this.$router.goBack();
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