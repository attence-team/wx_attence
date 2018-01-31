<template lang="html">
    <div class="body-box home-box scroll">
       <mt-popup
        v-model="leftMenuShow"
        position="left">
        <LeftMenu :dataList="leftMenuTree" @selectLink="selectLink"/>
      </mt-popup>
       <div class="carousel-box">
          <mt-swipe :show-indicators="false" :prevent="true" :auto="3000">
             <mt-swipe-item v-for="img in carouselImgs">
               <img class="img-item" :src="img">
             </mt-swipe-item>
             <!--<mt-swipe-item>-->
               <!--<img class="img-item" src="../../assets/img/carousel-1.jpg">-->
             <!--</mt-swipe-item>-->
          </mt-swipe>
          <div class="menu-btn" @click="leftMenuShow=!leftMenuShow"><i class="iconfont icon-3401caidan"></i></div>
          <div class="title">企业文化 . 核心理念</div>
          <div class="welcome">{{userInfo.name}}，欢迎您！</div>
       </div>
       <div class="menu-box">
           <div class="menu-nav" v-for="menu in menuList">
               <div class="title bd-bottom-1" @click="goRouterPage(menu.moreurl+'?resid='+menu.resid)">
                 <span>
                    <i class="mywork-icon" :style="{backgroundImage: 'url('+menu.resicon+')'}"></i>{{menu.resname}}
                    <router-link v-if="menu.moreurl" class="more" :to="menu.moreurl+'?resid='+menu.resid">
                    <i class="iconfont icon-arrow-right-copy"></i></router-link>
                 </span>
              </div>
              <div class="menu-list clearfix">
                 <div class="item" v-for="subMenu in menu.submenus">
                    <a @click="goRouter(subMenu.resurl,subMenu.resid)">
                      <img :src="subMenu.resicon"><span>{{subMenu.resname}}</span>
                    </a>
                 </div>
              </div>
           </div>
           <!--<div style="height: 5px;background-color: #bd2c00;margin: 10px 0;"></div>-->
           <!--<div class="menu-nav">-->
              <!--<div class="title bd-bottom-1"><span><i class="mywork-icon"></i>我的工作</span></div>-->
              <!--<div class="menu-list clearfix">-->
                 <!--<div class="item">-->
                    <!--<router-link to="/work/pending">-->
                      <!--<img src="../../assets/img/1_icon.png"><span>待办工作</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                 <!--<div class="item">-->
                    <!--&lt;!&ndash;<router-link to="/work/done">&ndash;&gt;-->
                    <!--<router-link to="/kq/approval">-->
                      <!--<img src="../../assets/img/2_icon.png"><span>已办工作</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
              <!--</div>-->
           <!--</div>-->
           <!--<div class="menu-nav">-->
              <!--<div class="title"><i class="kq-icon"></i>考勤管理 <router-link class="more" to="/home/kq">更多功能</router-link></div>-->
              <!--<div class="menu-list clearfix">-->
                 <!--<div class="item">-->
                    <!--<router-link to="/kq/leave">-->
                      <!--<img src="../../assets/img/3_icon.png"><span>请假申请</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                 <!--<div class="item">-->
                    <!--&lt;!&ndash;<router-link to="/kq/yearLeave">&ndash;&gt;-->
                    <!--<router-link to="/kq/approval">-->
                      <!--<img src="../../assets/img/4_icon.png"><span>年假申请</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                 <!--<div class="item">-->
                    <!--<router-link to="/kq/exception">-->
                      <!--<img src="../../assets/img/5_icon.png"><span>异常处理</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                 <!--<div class="item">-->
                    <!--<router-link to="/kq/calendar">-->
                      <!--<img src="../../assets/img/6_icon.png"><span>考勤日历</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
              <!--</div>-->
           <!--</div>-->
           <!--<div class="menu-nav">-->
              <!--<div class="title"><i class="work-icon"></i>办公管理</div>-->
              <!--<div class="menu-list clearfix">-->
                 <!--<div class="item">-->
                    <!--<router-link to="/officework/sendCarApply">-->
                      <!--<img src="../../assets/img/7_icon.png"><span>派车申请</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                 <!--<div class="item">-->
                    <!--<router-link to="/officework/workLunchApply">-->
                      <!--<img src="../../assets/img/8_icon.png"><span>工作餐申请</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                 <!--<div class="item">-->
                    <!--<router-link to="/officework/sendCarQuery">-->
                      <!--<img src="../../assets/img/9_icon.png"><span>派车单据查询</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
                  <!--<div class="item">-->
                    <!--<router-link to="/officework/workLunchQuery">-->
                      <!--<img src="../../assets/img/10_icon.png"><span>工作餐单据查询</span>-->
                    <!--</router-link>-->
                 <!--</div>-->
              <!--</div>-->
           <!--</div>-->
       </div>
    </div>
</template>
<script>
import {HomeHttp} from '@/api/homeHttp';
import {Swipe,SwipeItem,Indicator,Toast,Popup} from 'mint-ui';
import LeftMenu from "@/components/menu/leftMenu";
export default {
    name:'homeInfo',
    components: {Swipe, SwipeItem ,Toast,Indicator,LeftMenu,Popup},
    data(){
        return {
           carouselImgs:[],
           menuList:[],
           list:[],
           userID:'02236654',
           userInfo:{},
           leftMenuShow:false,
           leftMenuTree:[]
        }
    },
    activated(){
        setTitle('移动门户');
    },
    mounted(){
        HomeHttp.getUserId().then((headers)=>{
            this.userID = headers["iv-user"];
            this.initUserData();
            this.queryMenuTree(()=>{
                this.queryLeftMenuTree();
            });
        }).catch(()=>{
            Toast({
                message: '网络异常',
                duration: 5000
            });
//            this.initUserData();
//            this.queryMenuTree(()=>{
//                this.queryLeftMenuTree();
//            });
        });
    },
    methods:{
        goRouterPage(url){
            this.$router.push(url);
        },
        goRouter(url,resid){
            HomeHttp.saveLog({
                staff_num:this.userInfo.staff_num,
                res_id:resid
            });
            if(url.substring(0,1)=='/'){
                this.$router.push(url+'?resid='+resid);
            }else{
                window.location.href = url;
            }
        },
        selectLink(url){
           this.leftMenuShow = false;
           if(url.substring(0,1)=='/'){
              this.$router.push(url);
           }else{
              window.location.href = url;
           }
        },
        changeTwo(){
           this.$router.push({
               path:'/home/anotherPage2'
           });
        },
        initUserData(){
            HomeHttp.queryUserInfo({"iv-user":this.userID}).then((res)=>{
                setUserInfo(res.data);
                this.userInfo = getUserInfo();
            })
        },
        queryMenuTree(callBackFn){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            HomeHttp.queryMenuTree({"iv-user":this.userID}).then((res)=>{
                if(callBackFn){
                    callBackFn();
                }
                if(res.code==0){
                    Indicator.close();
                    Toast({
                        message: res.result,
                        duration: 1000*60*60*10
                    });
                    return;
                }
                this.menuList = res.data.submenus;
                this.carouselImgs = res.data.pics.split(';');
                this.$nextTick(()=>{
                    Indicator.close();
                })
            }).catch(function (e) {
                Indicator.close();
            })
        },
        queryLeftMenuTree(){
//          Indicator.open({
//            text: '加载中...',
//            spinnerType: 'fading-circle'
//          });
          HomeHttp.queryLeftMenu({"iv-user":this.userID}).then((res)=>{
              //Indicator.close();
              if(res.code==0){
                Toast({
                  message: res.result,
                  duration: 1000*60*60*10
                });
                return;
              }
              this.leftMenuTree = res.data;
          })
        }
    }
}
</script>

<style lang="css" scoped>
  .home-box{
        height: 100vh;
  }
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
