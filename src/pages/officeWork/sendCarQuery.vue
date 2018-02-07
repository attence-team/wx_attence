<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="application-list-box">
            <div class="application-type-box bd-bottom-1">
                <div class="application-type approved" @click="clickType('已派车')">已派车</div>
                <div class="application-type approvaling" @click="clickType('等待派车')">等待派车</div>
                <div class="application-type retreated" @click="clickType('已提交')">已提交</div>
                <div class="application-type nnsubmitted" @click="clickType('未提交')">未提交</div>
            </div>
            <div v-if="dataList.length<=0" class="noneData">暂无数据</div>
            <ul class="application-list sendQuery">
                <li class="application-list-cell" v-for="data in dataList">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <p class="application-title-date">
                            <span class="application-title">
                              {{data.vehicle_user_name}}{{data.send_out_type_name}}
                              <span v-if="data.state_all_name=='已派车'" class="approved warn1">（{{data.state_all_name}}）</span>
                              <span v-if="data.state_all_name=='等待派车'" class="approved warn2">（{{data.state_all_name}}）</span>
                              <span v-if="data.state_all_name=='已提交'" class="approved warn3">（{{data.state_all_name}}）</span>
                              <span v-if="data.state_all_name=='未提交'" class="approved warn4">（{{data.state_all_name}}）</span>
                              <span v-else class="approved">（{{data.state_all_name}}）</span>
                            </span>
                            <span class="application-date">{{data.crt_time_str}}</span>
                        </p>
                        <p class="eat-type">用车事由：{{data.reason}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import TimeTool from "@/components/query/timetool";
    import {CarHttp} from '@/api/carHttp';
    import { Toast, Indicator } from 'mint-ui';
    export default {
        name: 'sendCarQuery',
        components:{TimeTool},
        data(){
            return {
              state_all_name:'',
              startTime:'',
              endTime:'',
              userInfo:{},
              dataList:[],
              currPage:1,
              pageLength:50
            }
        },
        activated(){
           this.userInfo = getUserInfo();
        },
        methods:{
            selectTime(startTime,endTime){
               this.startTime = startTime;
               this.endTime = endTime;
               this.queryList();
            },
            clickType(type){
               this.state_all_name = type;
               this.queryList();
            },
            queryList(){
               Indicator.open();
               CarHttp.queryCarList({
                  state_all_name:this.state_all_name,
                  staff_num:this.userInfo.staff_num,
                  sdate:this.startTime.Format2String('yyyyMMdd'),
                  edate:this.endTime.Format2String('yyyyMMdd'),
                  currPage:this.currPage,
                  pageLength:this.pageLength
               }).then((res)=>{
                  Indicator.close();
                  if(res.code==1){
                     this.dataList = res.data.pageData;
                  }
               }).catch(()=>{
                  Indicator.close();
               });
            }
        }
    }
</script>
<style lang="css" scoped>
   .sendQuery .application-date{
      position: relative;
      width: 110px;
      text-align: right;
   }
   .sendQuery .approved.warn1{
      color: #11bf84;
   }
   .sendQuery .approved.warn2{
     color: #5ac0de;
   }
   .sendQuery .approved.warn3{
     color: #f3725f;
   }
   .sendQuery .approved.warn4{
     color: #ff8922;
   }
</style>
