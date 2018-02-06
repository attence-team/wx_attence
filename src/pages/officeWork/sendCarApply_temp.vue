<template>
  <div class="body-box scroll">
    <div class="leave">
      <div class="form-box">
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JESelect v-model="carType" title="派车类型" :options="typeList"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon info-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="派车人数" placeholder="请输入派车人数（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon bi-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="用车事由" placeholder="请输入用车事由（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="行车路线" placeholder="请选择行车路线（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="contactName" title="联系人" placeholder="请选择联系人（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon start-date-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="startDate" type="date" title="用车起日期"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon end-date-icon"></i></div>
          <div class="row-wrapper ">
            <JEInput v-model="endDate"  type="date" title="用车止日期"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon start-date-icon"></i></div>
          <div class="row-wrapper ">
            <JEInput v-model="sendDate"  type="date" title="出发时间"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="上车地点-市区" placeholder="请选择上车地点"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="乘车人-公司职工" placeholder="请选择乘车人"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon bi-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="乘车人-来宾" placeholder="请输入乘车人"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="推荐驾驶员" placeholder="请选择意向驾驶员"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon bi-icon"></i></div>
          <div class="row-wrapper">
            <JEInput title="备注" placeholder="请填写备注事项"/>
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
        <mt-button type="primary" class="submit" @click="saveCar">保存</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {SpHttp} from '@/api/spHttp';
  import JEInput from "@/components/form/je-input";
  import JESelect from "@/components/form/je-select";
  import {Toast, Indicator, MessageBox} from 'mint-ui';
  export default {
    name: 'sendCarApply_temp',
    components:{JEInput,JESelect},
    data(){
      return {
        startDate:new Date().Format2String('yyyy-MM-dd'),
        endDate:new Date().Format2String('yyyy-MM-dd'),
        sendDate:new Date().Format2String('yyyy-MM-dd'),
        vouty:'shiquneipaiche',
        contactName:'',/* 联系人名称 */
        contactNum:'',/* 联系人职工号 */
        carType:'',
        typeList:[],
        approveGroups:[],
        leaderName:'',
        electedOrderGroups:[], /* 选中的审批人 */
        approveGroupsCount:0,
        userInfo:{}
      }
    },
    watch:{
      carType(val){
         for(let i=0;i<this.typeList;i++){
            if(this.typeList[i].value==val){
               this.vouty = this.typeList[i].vouty;
               return;
            }
         }
      },
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
      setTitle('派车申请');
      Object.assign(this.$data, this.$options.data());
      this.userInfo = getUserInfo();
      this.contactName = this.userInfo.name;
      this.contactNum = this.userInfo.staff_num;
      this.queryTypeList(()=>{

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
      queryTypeList(callBackFn){
        /* 查询派车类型 */
        SpHttp.queryCarTypeList().then((res)=>{
            this.typeList = [];
            if(res.code==1){
               for(let i=0;i<res.data.length;i++){
                 this.typeList.push({
                    value:res.data[i].id,
                    name:res.data[i].key_name,
                    vouty:res.data[i].vou_cd
                 });
               }
               this.carType = this.typeList[0].value;
               this.vouty = this.typeList[0].vouty;
               if(callBackFn){
                 callBackFn();
               }
            }
        });
      },
      querySubmitInfo(){
         //shiquneipaiche  市区派车
         //zhengchangchangtupaiche 正常长途派车
          let vou_id = this.$route.query.id?this.$route.query.id:1;
          SpHttp.getSubmitInfo({
            vouty: this.vouty,
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
            vou_ty:'workDinnerSp',
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
      saveCar(){

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
