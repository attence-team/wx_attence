<template>
  <div class="body-box scroll">
    <div class="leave">
      <div class="form-box">
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JESelect v-model="workLunchType" title="就餐类型" :options="typeList"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JESelect v-model="cardName" title="临时卡号" :options="cardTypeList"  placeholder="请选择临时卡号（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="cardName" disabled="true" title="临时卡名称" />
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="guest" title="来宾单位" placeholder="请输入来宾单位名称（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon start-date-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="startDate" type="date" title="用餐起日期"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon end-date-icon"></i></div>
          <div class="row-wrapper ">
            <JEInput v-model="endDate"  type="date" title="用餐止日期"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput type="number" v-model="staff_cnt" title="用餐人数" placeholder="请输入用餐人数（必填）"/>
            <mt-button type="primary" class="workLunch-btn" @click="initLuncInfo">餐票初始化</mt-button>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon info-icon"></i></div>
          <div class="row-wrapper ">
            <span class="row-title">餐票明细﹣申请餐票（{{director}}张）</span>
            <div class="lunch-info">
              <ul>
                <li v-for="(lunchInfo,idx) in lunchInfoList">
                   <span class="time-date">{{lunchInfo.time}}</span>
                   <span class="lunch-count">
                      <input type="number" @keyup="keyUpDirector(idx)" v-model="lunchInfo.counts"/>
                   </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon person-icon"></i></div>
          <div class="row-wrapper ">
            <span class="row-title">审批人</span>
            <div class="approve-list" v-for="(approve,j) in approveGroups">
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
        <mt-button type="primary" class="submit" @click="saveLunch">保存</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {KqHttp} from '@/api/kqHttp';
  import {SpHttp} from '@/api/spHttp';
  import { WlHttp } from '@/api/workLunchHttp';
  import JEInput from "@/components/form/je-input";
  import JESelect from "@/components/form/je-select";
  import { Toast, Indicator, MessageBox } from 'mint-ui';
  export default {
    name: 'workLunchApply',
    components:{JEInput,JESelect},
    data(){
      return {
        name:getUserInfo().name, //申请人
        staff_num:getUserInfo().staff_num, //职工id
        dept_name:getUserInfo().dept_name, //部门名称
        dept_num:getUserInfo().dept_num, //部门id
        workLunchType:'',
        workLunchName:'',
        typeList:[],
        cardType:'',
        cardName:'',
        cardTypeList:[],
        guest:'',//来宾单位
        staff_cnt:'',//用餐人数
        startDate: new Date().Format2String('yyyy-MM-dd'),
        endDate: new Date().Format2String('yyyy-MM-dd'),
        lunchInfoList:[], //明细
        director:0, //总餐票数
        approveGroups:[],
        leaderName:''
      }
    },
    watch:{
      leaderName(val){
        for(let i=0;i<this.approveGroups.length;i++){
          for(let k=0;k<this.approveGroups[i].group_dt.length;k++){
            for(let j=0;j<this.approveGroups[i].group_dt[k].staffs.length;j++){
             if(val==this.approveGroups[i].group_dt[k].staffs[j].name){
               this.approveGroups[i].group_dt[k].selectedValue = this.approveGroups[i].group_dt[k].staffs[j];
               break;
             }
            }
          }
        }
      },
      workLunchName(val){
        for(let i=0;i<this.typeList.length;i++){
          if(val==this.typeList[i].name){
            this.workLunchType = this.typeList[i].value;
            return;
          }
        }
      },
      cardName(val){
         for(let i=0;i<this.cardTypeList.length;i++){
           if(val==this.cardTypeList[i].value){
              this.cardType = this.cardTypeList[i].name;
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
      setTitle('工作餐申请');
      Object.assign(this.$data, this.$options.data());
      this.getWorkLunchType();
      this.getTempCard(()=>{
         this.$nextTick(()=>{
            this.getLunchInfo();
         });
      });
      /* 获取审批节点 */
      this.querySubmitInfo();
    },
    methods:{
      changeSelect(j,k,e){
        if(!e.target.value) return;
        this.approveGroups[j].group_dt[k].selectedValue = this.approveGroups[j].group_dt[k].staffs[e.target.value];
      },
      betweenTime(){
        let num = (new Date(this.endDate).getTime() - new Date(this.startDate).getTime())/(1000*60*60*24);
        if(num<0){
          Toast({
            message: '开始时间不能大于结束时间',
            duration: 2000
          });
          return false;
        }
        if(num>6){
          Toast({
            message: '时间间隔不能大于7天',
            duration: 2000
          });
          return false;
        }
        return true;
      },
      initLuncInfo(){
         this.director = 0;
         if(!this.staff_cnt){
           Toast({
             message:'请输入用餐人数',
             duration: 2000
           });
           return;
         }
         let s = new Date(this.startDate);
         let e = new Date(this.endDate);
         let num = (e.getTime() - s.getTime())/(1000*60*60*24);
         this.lunchInfoList = [];
         for(let k=0;k<=num;k++){
           let days = k?1:0;
           s.setDate(s.getDate()+ days);
           this.lunchInfoList.push({
             time:s.Format2String('yyyy-MM-dd'),
             counts: this.staff_cnt
           });
         }
      },
      getWorkLunchType(callBackFn) {
        WlHttp.getWorkLunchType().then((res)=>{
          if (res.code == 1) {
            for(let i=0;i<res.data.length;i++){
              this.typeList.push({
                name:res.data[i].stand_name,
                value:res.data[i].stand_id
              });
            }
            this.workLunchType = res.data[0].stand_id;
            if(callBackFn){
              callBackFn();
            }
          }
        });
      },
      getTempCard(callBackFn) {
        let params = {dept_num:this.dept_num};
        WlHttp.getTemporaryCard(params).then((res)=>{
          if (res.code==1) {
            for(let i=0;i<res.data.length;i++){
              this.cardTypeList.push({
                name:res.data[i].rsbh,
                value:res.data[i].rs_name
              });
            }
            this.cardName = res.data[0].rs_name;
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
      verification:function(obj) {
        let tipsObj = {
          stand_id:'请选择就餐类型',dept_id:'部门id不存在',staff_num:'申请人id不存在',apply_time:'申请日期不存在',
          dinner_time:'请选择用餐开始时间',dinner_time_end:'请选择用餐结束时间',guest:'请输入来宾单位',staff_cnt:'请输入用餐人数',
          director:'请点击餐票初始化按钮生成餐票明细',rsbh:'请选择临时卡号',rs_name:'请选择临时卡号'
        };
        let pass = true;
        for (let i in obj) {
          let tips = tipsObj[i];
          if (tips) {
            if (obj[i] == '' || obj[i] == '请选择') {
              Toast(tips);
              pass = false;
              return false;
            }
          }
        }
        return pass;
      },
      getLunchInfo(){
        if(!this.$route.query.id) return;
        /* 获取信息，进行编辑 */
        WlHttp.getWorkLunchDetails({
            dinner_id:this.$route.query.id
        }).then((res)=>{
           this.workLunchName = res.data.stand_name;
           this.guest = res.data.guest;
           this.startDate = res.data.dinner_time;
           this.endDate = res.data.dinner_time_end;
           this.staff_cnt = res.data.staff_cnt;
           this.leaderName = res.data.leader_nm;
        });
      },
      saveLunch() {
        let params = {
          dinner_id:this.$route.query.id?this.$route.query.id:'',
          dept_id:this.dept_num,
          staff_num:this.staff_num,
          apply_time:new Date().Format2String('yyyy-MM-dd hh:mm:ss'),
          stand_id:this.workLunchType,
          rsbh:this.cardType,
          rs_name:this.cardName,
          dinner_time:this.startDate,
          dinner_time_end:this.endDate,
          guest:this.guest,
          staff_cnt:this.staff_cnt,
          director:this.getDirector(),
          print_memo:this.getPrintmemo(),
          tra_memo:''
        };
        if (!this.verification(params)) return;
        MessageBox.confirm('确定申请2018-10-12至2018-10-20共6张餐票吗?').then(action => {
            if(action == 'confirm') {
                Indicator.open();
                WlHttp.submit(params).then((res)=>{
                  Indicator.close();
                  Toast(res.result);
                  this.$router.goBack();
                }).catch(()=>{
                    Indicator.close();
                });
            }
        });
      },
      keyUpDirector(idx){
         this.director = this.getDirector();
      },
      getDirector(){
        let result = 0;
        for(let i=0;i<this.lunchInfoList.length;i++){
          let counts = this.lunchInfoList[i].counts?this.lunchInfoList[i].counts:0;
          result += parseInt(counts);
        }
        return result;
      },
      getPrintmemo(){
        let result = '';
        for(let i=0;i<this.lunchInfoList.length;i++){
          let counts = this.lunchInfoList[i].counts?this.lunchInfoList[i].counts:0;
          result += this.lunchInfoList[i].time+',' + counts +';';
        }
        return result;
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
    position: relative;
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
  .lunch-info{
    min-height: 0.6rem;
  }
  .lunch-info ul li{
     width: 100%;
  }
  .lunch-info ul li .time-date{
     display: inline-block;
     width: 100px;
     font-size: 16px;
  }
  .lunch-info ul li .lunch-count{
    display: inline-block;
    width: 20%;
  }
  .lunch-info ul li .lunch-count input{
     width: 100%;
     border-bottom: solid 1px #ddd;
  }
  .lunch-info ul li .lunch-count input:focus{
    border-bottom: solid 1px #6179d1;
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
  .workLunch-btn{
    position: absolute;
    bottom:0.08rem;
    right: 0.2rem;
    height: 0.5rem !important;
    line-height: 0.5rem !important;
    font-size: 16px;
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
