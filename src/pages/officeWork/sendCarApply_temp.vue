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
            <JEInput v-model="carNum" type="number" title="乘车人数" placeholder="请输入乘车人数（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon bi-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="carReson" title="用车事由" placeholder="请输入用车事由（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper" @click="searchDriveLineShow=true;checkedDriveLineType=1">
            <JEInput disabled="true" v-model="driveLineNames" title="行车路线" placeholder="请选择行车路线（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper" @click="searchPersonShow=true;checkedType=0">
            <JEInput v-model="contactName" title="联系人" placeholder="请选择联系人（必填）"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon bi-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="contactPhoneNo" title="联系人电话" placeholder="请输入联系电话（必填）"/>
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
        <div :class="{'form-row':true, 'up-car':!upCarCode}">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JESelect @change="changeUpCar" v-model="upCarCode" :options="upCarList" title="上车地点-市区" placeholder="请选择上车地点"/>
          </div>
          <div class="up-car-name" v-if="!upCarCode">{{upCarName}}</div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="upOutCarCode" title="上车地点-市区外" placeholder="请输入市区外上车地点"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper" @click="searchPersonShow=true;checkedType=1">
            <JEInput disabled="true" v-model="companyPersonNames" title="乘车人-公司职工" placeholder="请选择乘车人"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon bi-icon"></i></div>
          <div class="row-wrapper">
            <JEInput v-model="driverPersonNames" title="乘车人-来宾" placeholder="请输入乘车人"/>
          </div>
        </div>
        <div class="form-row">
          <div class="row-left"><i class="icon type-icon"></i></div>
          <div class="row-wrapper" @click="searchDriverShow=true;checkedDriverType=1">
            <JEInput disabled="true" v-model="driverNames" title="推荐驾驶员" placeholder="请选择意向驾驶员"/>
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
        <mt-popup
          v-model="searchPersonShow"
          position="left">
          <SearchComps :checkedType="checkedType" :defaultSelectType="dept_num"
                       :searchShow="searchPersonShow" @selectCell="selectCell"/>
        </mt-popup>
        <mt-popup
          v-model="searchDriveLineShow"
          position="left">
          <SearchDriveLineComps :checkedType="checkedDriveLineType"
                                :searchShow="searchDriveLineShow" @selectCell="selectDriveCell"/>
        </mt-popup>
        <mt-popup
          v-model="searchDriverShow"
          position="left">
          <SearchDriver :checkedType="checkedDriverType"
                                :searchShow="searchDriverShow" @selectCell="selectDrivePersonCell"/>
        </mt-popup>
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
  import {CarHttp} from '@/api/carHttp';
  import JEInput from "@/components/form/je-input";
  import JESelect from "@/components/form/je-select";
  import SearchComps from "@/components/query/searchTwo";
  import SearchDriver from "@/components/query/searchDriver";
  import SearchDriveLineComps from "@/components/query/searchDriveLine";
  import {Toast, Indicator, MessageBox} from 'mint-ui';
  export default {
    name: 'sendCarApply_temp',
    components:{JEInput,JESelect,SearchComps,SearchDriver,SearchDriveLineComps},
    data(){
      return {
        checkedType:0, /* 0单选，1多选 */
        checkedDriverType:1,/* 0单选，1多选 */
        checkedDriveLineType:1,/* 0单选，1多选 */
        dept_num:'', /* 部门编号 */
        searchPersonShow:false,
        searchDriverShow:false,
        searchDriveLineShow:false,
        carType:'',/* 派车类型 */
        typeList:[],
        carNum:'',/* 派车人数 */
        carReson:'',/* 用车事由 */
        startDate:new Date().Format2String('yyyy-MM-dd'),
        endDate:new Date().Format2String('yyyy-MM-dd'),
        sendDate:new Date().Format2String('yyyy-MM-dd'),
        vouty:'',
        contactName:'',/* 联系人名称 */
        contactNum:'',/* 联系人职工号 */
        contactPhoneNo:'',/* 联系人电话 */
        companyPersonNames:'',/* 乘车人公司职员名称 */
        companyPersonNum:'',/* 乘车人公司职员编号 */
        driverPersonNames:'',/* 乘车人-来宾 */
        driveLineNames:'',/* 行车路线名称 */
        driveLineNum:'',/* 行车路线地区 */
        driverNames:'',/* 驾驶员名称 */
        upCarCode:'',/* 上车地点-市区内-code */
        upCarName:'',/* 上车地点-市区内-名称 */
        upCarOtherName:'',/* 上车地点-市区内-名称-其他 */
        upOutCarCode:'',/* 上车地点-市区外 */
        upCarList:[],
        approveGroups:[],
        leaderName:'',
        selectedOrderGroups:[], /* 选中的审批人 */
        approveGroupsCount:0,
        userInfo:{}
      }
    },
    watch:{
      carType(val){
         for(let i=0;i<this.typeList.length;i++){
            if(this.typeList[i].value==val){
               this.vouty = this.typeList[i].vouty;
               /* 获取审批节点 */
               this.querySubmitInfo();
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
      this.dept_num = this.userInfo.dept_num;
      this.queryTypeList(()=>{});
      this.queryUpCarList();
    },
    methods:{
      changeUpCar(e){
          for(let i=0;i<this.upCarList.length;i++){
            if(e.target.value==this.upCarList[i].value){
              this.upCarName = this.upCarList[i].name;
              break;
            }
          }
          if(!e.target.value){ //其他
              this.upCarCode = '';
              this.upCarName = this.upCarOtherName;
              MessageBox.prompt(' ', '其他', {
                inputValue:this.upCarName,
                inputPlaceholder: '请输入上车地点-市区'
              }).then(({ value, action }) => {
                if(action!=='confirm') return;
                this.upCarOtherName = value;
                this.upCarName = value;
                this.upCarCode = 0;
              });
          }else{
            this.upCarOtherName = '';
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
      selectDrivePersonCell(cell){
        this.searchDriverShow = false;
        if(!cell) return;
        if(this.checkedDriveLineType==1){ /* 推荐驾驶员 */
          this.driverNames = '';
          for(let i=0;i<cell.length;i++){
            if(i==cell.length-1){
              this.driverNames += cell[i].title;
            }else{
              this.driverNames += cell[i].title+',';
            }
          }
        }
      },
      selectDriveCell(cell){
        this.searchDriveLineShow = false;
        if(!cell) return;
        if(this.checkedDriveLineType==1){ /* 行车路线 */
            this.driveLineNames = '';
            this.driveLineNum = '';
            for(let i=0;i<cell.length;i++){
              if(i==cell.length-1){
                this.driveLineNames += cell[i].title;
                this.driveLineNum +=  cell[i].value;
              }else{
                this.driveLineNames += cell[i].title+'---';
                this.driveLineNum +=  cell[i].value+'---';
              }
            }
        }
      },
      selectCell(cell){
         this.searchPersonShow = false;
         if(!cell) return;
         if(this.checkedType==0){ /* 联系人 */
           this.contactName = '';
           this.contactNum = '';
           for(let i=0;i<cell.length;i++){
             if(i==cell.length-1){
               this.contactName += cell[i].title;
               this.contactNum +=  cell[i].value;
             }else{
               this.contactName += cell[i].title+',';
               this.contactNum +=  cell[i].value+',';
             }
           }
         }else{
           this.companyPersonNames = '';
           this.companyPersonNum = '';
           for(let i=0;i<cell.length;i++){
             if(i==cell.length-1){
               this.companyPersonNames += cell[i].title;
               this.companyPersonNum +=  cell[i].value;
             }else{
               this.companyPersonNames += cell[i].title+',';
               this.companyPersonNum +=  cell[i].value+',';
             }
           }
         }
      },
      queryTypeList(callBackFn){
        /* 查询派车类型 */
        CarHttp.queryCarTypeList({}).then((res)=>{
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
      queryUpCarList(){
        /* 上车地点 */
        CarHttp.queryUpCityList({}).then((res)=>{
          this.upCarList = [];
          if(res.code==1){
            for(let i=0;i<res.data.length;i++){
              this.upCarList.push({
                value:res.data[i].id,
                name:res.data[i].key_name
              });
            }
            this.upCarList.push({
              value:'',
              name:'其他'
            });
            this.upCarCode = this.upCarList[0].value;
            this.upCarName = this.upCarList[0].name;
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
            vou_ty:this.vouty,
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
        if(!this.carType){Toast('请选择派车类型');return;}
        if(!this.carNum){Toast('请输入乘车人数');return;}
        if(!this.carReson){Toast('用车事由');return;}
        if(!this.driveLineNames){Toast('请选择行车路线');return;}
        if(!this.contactName){Toast('请选择联系人');return;}
        if(!this.contactPhoneNo){Toast('请输入联系人电话');return;}
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
        CarHttp.saveCarApply({
          vehicle_user_id:this.userInfo.staff_num,
          vehicle_user_name:this.userInfo.name,
          send_out_time:this.sendDate.Format2String('yyyyMMdd'),
          reason:this.carReson,
          leave_postiton_in:this.upCarCode,
          leave_postiton_out:this.upOutCarCode,
          destination:'',
          use_dept:this.userInfo.dept_name,
          use_dept_id:this.userInfo.dept_num,
          people_count:this.carNum,
          linkman_name:this.contactName,
          linkman_id:this.contactNum,
          linkman_tel:this.contactPhoneNo,
          period_of_time_start:this.startDate.Format2String('yyyyMMdd'),
          period_of_time_end:this.endDate.Format2String('yyyyMMdd'),
          handing_people_id:this.userInfo.staff_num,
          handing_people_name:this.userInfo.name,
          hitchhiking_people_in:this.companyPersonNum,
          hitchhiking_people_out:this.driverPersonNames,
          op_stuff:this.userInfo.staff_num,
          dway_id:'',
          d_way:this.driveLineNames,
          other_position:'',
          position_in_name:''
        }).then((res)=>{
          Indicator.close();
          Toast({
            message: res.result,
            duration: 2000
          });
          if(res.code == 1){
            this.saveOrder(res.data.id);
          }
        }).catch((e) => {
          Indicator.close();
        });
      }
    }
  }
</script>
<style lang="css">

</style>
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
    position: relative;
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
  .up-car{
     position: relative;
  }
  .up-car .up-car-name{
    position: absolute;
    top: 0.9rem;
    left: 10%;
    font-size: 16px;
    color: #333;
  }
  .up-car .je-select >>> select{
    opacity: 0;
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
