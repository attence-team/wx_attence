<template lang="html">
    <div class="body-box">
       <div class="carousel-box">
          <mt-swipe :show-indicators="false">
             <mt-swipe-item>
               <img class="img-item" src="../../assets/img/carousel-1.png">
             </mt-swipe-item>
             <mt-swipe-item>
               <img class="img-item" src="../../assets/img/carousel-1.png">
             </mt-swipe-item>
          </mt-swipe>
          <div class="welcome">{{userInfo.name}}，欢迎您！</div>
       </div>
       <div class="menu-box">
           <div class="menu-nav">
              <div class="title"><i class="mywork-icon"></i>我的工作</div>
              <div class="menu-list clearfix">
                 <div class="item">
                    <router-link to="/work/pending">
                      <img src="../../assets/img/1_icon.png"><span>待办工作</span>
                    </router-link>
                 </div>
                 <div class="item">
                    <!--<router-link to="/work/done">-->
                    <router-link to="/kq/approval">
                      <img src="../../assets/img/2_icon.png"><span>已办工作</span>
                    </router-link>
                 </div>
              </div>
           </div>
           <div class="menu-nav">
              <div class="title"><i class="kq-icon"></i>考勤管理 <router-link class="more" to="/home/kq">更多功能</router-link></div>
              <div class="menu-list clearfix">
                 <div class="item">
                    <router-link to="/kq/leave">
                      <img src="../../assets/img/3_icon.png"><span>请假申请</span>
                    </router-link>
                 </div>
                 <div class="item">
                    <!--<router-link to="/kq/yearLeave">-->
                    <router-link to="/kq/approval">
                      <img src="../../assets/img/4_icon.png"><span>年假申请</span>
                    </router-link>
                 </div>
                 <div class="item">
                    <router-link to="/kq/exception">
                      <img src="../../assets/img/5_icon.png"><span>异常处理</span>
                    </router-link>
                 </div>
                 <div class="item">
                    <router-link to="/kq/calendar">
                      <img src="../../assets/img/6_icon.png"><span>考勤日历</span>
                    </router-link>
                 </div>
              </div>
           </div>
           <div class="menu-nav">
              <div class="title"><i class="work-icon"></i>办公管理</div>
              <div class="menu-list clearfix">
                 <div class="item">
                    <router-link to="/officework/sendCarApply">
                      <img src="../../assets/img/7_icon.png"><span>派车申请</span>
                    </router-link>
                 </div>
                 <div class="item">
                    <router-link to="/officework/workLunchApply">
                      <img src="../../assets/img/8_icon.png"><span>工作餐申请</span>
                    </router-link>
                 </div>
                 <div class="item">
                    <router-link to="/officework/sendCarQuery">
                      <img src="../../assets/img/9_icon.png"><span>派车单据查询</span>
                    </router-link>
                 </div>
                  <div class="item">
                    <router-link to="/officework/workLunchQuery">
                      <img src="../../assets/img/10_icon.png"><span>工作餐单据查询</span>
                    </router-link>
                 </div>
              </div>
           </div>
       </div>
    </div>
</template>
<script>
import {HomeHttp} from '@/api/homeHttp';
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    name:'homeInfo',
    components: {Swipe, SwipeItem},
    data(){
        return {
           msg:'',
           menuList:[],
           list:[],
           userInfo:{}
        }
    },
    mounted(){
        setTitle('工作台');
        this.queryList();
        this.initUserData();
    },
    methods:{
        changeTwo(){
           this.$router.push({
               path:'/home/anotherPage2'
           });
        },
        initUserData(){
            HomeHttp.queryUserInfo({"iv-user":'02236654'}).then((res)=>{
                setUserInfo(res.data);
                this.userInfo = getUserInfo();
            })
        },
        queryList(){

        }
    }
}
</script>

<style lang="css" scoped>
  .mywork-icon{
      background-image: url("../../assets/img/mywork-icon.png");
  }
  .kq-icon{
      background-image: url("../../assets/img/kq-icon.png");
  }
  .work-icon{
      background-image: url("../../assets/img/work-icon.png");
  }
</style>
