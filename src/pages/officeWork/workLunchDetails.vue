<template>
  <div class="body-box detail-box">
    <div class="approval-details-box">
      <div class="lunch-info clearfix">
        <div class="lunch-name fl">{{info.dept_name}}</div>
        <span class="lunch-item lunch-title fl">工作餐申请</span>
        <span class="lunch-item lunch-time fl">2017-08-09</span>
      </div>
      <!--<ul class="approval-list">-->
        <!--<li class="approval-list-cell">-->
          <!--<div class="approval-name">江楠</div>-->
          <!--<div class="approval-info">-->
            <!--<p class="approval-title-date">-->
              <!--<span class="approval-title">工作餐申请</span>-->
            <!--</p>-->
            <!--<p class="approval-state">{{info.ld_appr_nm}}</p>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
      <div class="approval-details bd-top-1">
        <p>审核编号：<span>{{info.dinner_id}}</span></p>
        <p>申请部门：<span>{{info.dept_name}}</span></p>
        <p>临时卡名称：<span>{{info.rs_name}}</span></p>
        <p>就餐类别：<span>{{info.stand_name}}</span></p>
        <p>来宾单位：<span>{{info.guest}}</span></p>
        <p>用餐人数：<span>{{info.staff_cnt}}</span></p>
        <p>用餐开始时间：<span>{{info.dinner_time}}</span></p>
        <p>用餐结束时间：<span>{{info.dinner_time_end}}</span></p>
      </div>
    </div>
    <div class="approval-details-list-box">
      <ul class="approval-details-list">
        <li class="approval-details-list-cell">
          <div class="approval-name">{{info.leader_nm}}</div>
          <div class="approval-title-date">
            <span class="approval-title">部门领导</span>
            <!--<span class="approval-date">2017-11-12</span>-->
          </div>
        </li>
      </ul>
    </div>
    <div class="approval-btn-box" v-if="state">
      <div class="approval-btn agree">同意</div>
      <div class="approval-btn return">退回</div>
    </div>
  </div>
</template>
<script>
  import { WlHttp } from '@/api/workLunchHttp';
  import JEInput from "@/components/form/je-input";
  export default {
    name: 'workLunchDetails',
    components:{JEInput},
    data(){
      return {
        info:{},
        state:false,
        userInfo:{}
      }
    },
    activated(){
        setTitle('工作餐单据详情');
        this.userInfo = getUserInfo();
        this.queryDetail();
    },
    methods:{
       queryDetail(){
         WlHttp.getWorkLunchDetails({
            dinner_id:this.$route.query.id
         }).then((res)=>{
             this.info = res.data;
             this.state = this.info.ld_appr_nm!=='已审批';
         })
       }
    }
  }
</script>
<style lang="css" scoped>
  .detail-box{
    overflow: hidden;
  }
  .lunch-info{
     padding: 0.3rem 0;
  }
  .lunch-info .lunch-name{
     display: block;
     width: 1.2rem;
     height: 1.2rem;
     line-height: 1.2rem;
     border-radius: 50%;
     text-align: center;
     background-color: #6eb4f6;
     color: #fff;
     font-size: 16px;
  }
  .lunch-info .lunch-item{
     display: block;
     width: 60%;
     margin-left: 0.2rem;
  }
  .lunch-info .lunch-item.lunch-title{
     font-size: 20px;
     line-height: 0.7rem;
  }
  .lunch-info .lunch-item.lunch-time{
     color: #888;
     line-height: 0.4rem;
  }
  .approval-details-box,.approval-details-list-box {
    padding: 0 0.25rem;
    border-top: 0;
    background-color: #fff;
  }
  .approval-details-box .approval-name {
    margin-top: 0;
  }
  .approval-details {
    padding: 0.5rem 0 0.5rem 1.4rem
  }
  .approval-details p {
    color: #999;
    font-size: 16px;
    margin-bottom: 0.3rem;
  }
  .approval-details p:last-child {
    margin-bottom: 0;
  }
  .approval-details p span {
    color: #333;
  }
  .approval-list-box .approval-title-date {
    margin-bottom: 0;
  }
  .approval-details-list {
    margin: 0.25rem 0;
    background-color: #fff;
  }
  .approval-details-list .approval-details-list-cell {
    height: 1.6rem;
    line-height: 1.6rem;
    display: flex;
    align-items: center;
  }
  .approval-details-list-cell span {
    display: inline-block;
    vertical-align: middle;
  }
  .approval-details-list-cell .approval-name {
    color: #fff;
    width: 1rem;
    height: 1rem;
    font-size: 16px;
    line-height: 1rem;
    text-align: center;
    border-radius: 100%;
    background-color: #6eb4f6;
  }
  .approval-details-list-cell .approval-title-date {
    flex: 1;
    font-size: 0;
    margin-left: 0.3rem;
  }
  .approval-details-list-cell:last-child .approval-title-date {
    border-bottom: 0;
  }
  .approval-details-list-cell .approval-title {
    color: #333;
    font-size: 16px;
  }
  .approval-btn-box {
    padding: 30px 0;
    text-align: center;
    background-color: #fff;
    height: 30vh;
  }
  .approval-btn-box .approval-btn {
    color: #fff;
    height: 42px;
    line-height: 42px;
    width: 2.2rem;
    margin: 0 0.6rem;
    border-radius: 5px;
    font-size: 16px;
    display: inline-block;
  }
  .agree {
    background-color: #11bf84;
  }
  .return {
    background-color: #aaaaaa;
  }
</style>
