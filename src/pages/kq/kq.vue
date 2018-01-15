<template lang="html">
    <div class="body-box scroll">
       <div class="carousel-box">
          <mt-swipe :show-indicators="false" :prevent="true" :auto="3000">
             <mt-swipe-item v-for="img in carouselImgs">
               <img class="img-item" :src="img">
             </mt-swipe-item>
          </mt-swipe>
          <div class="welcome">你好，{{userInfo.name}}</div>
       </div>
       <div class="menu-box menu-tree">
           <div class="menu-nav" v-for="menu in menuList">
              <div class="title bd-bottom-1">
               <i class="mywork-icon" :style="{backgroundImage: 'url('+menu.resicon+')'}"></i>{{menu.resname}}
              </div>
              <div class="menu-list clearfix">
                 <mt-cell :title="subMenu.resname"
                 v-for="subMenu in menu.submenus"
                 @click.native="goRouter(subMenu.resurl)" is-link>
                    <img slot="icon" :src="subMenu.resicon" width="18" height="18">
                 </mt-cell>
              </div>
           </div>
           <!--<div class="menu-nav">-->
              <!--<div class="title bd-bottom-1"><i class="person-icon"></i>人事统计</div>-->
              <!--<div class="menu-list clearfix">-->
                 <!--<mt-cell title="审批" @click.native="goRouter('/kq/approval')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/11_icon.png" width="18" height="18">-->
                 <!--</mt-cell>-->
                 <!--<mt-cell title="异常处理" @click.native="goRouter('/kq/exception')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/5_icon.png" width="18" height="18">-->
                 <!--</mt-cell>-->
              <!--</div>-->
           <!--</div>-->
           <!--<div class="menu-nav">-->
              <!--<div class="title bd-bottom-1"><i class="leave-icon"></i>发起申请</div>-->
              <!--<div class="menu-list clearfix">-->
                 <!--<mt-cell title="请假" @click.native="goRouter('/kq/leave')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/3_icon.png" width="18" height="18">-->
                 <!--</mt-cell>-->
                 <!--&lt;!&ndash;<mt-cell title="年休假" @click.native="goRouter('/kq/yearLeave')" is-link>&ndash;&gt;-->
                    <!--&lt;!&ndash;<img slot="icon" src="../../assets/img/4_icon.png" width="18" height="18">&ndash;&gt;-->
                 <!--&lt;!&ndash;</mt-cell>&ndash;&gt;-->
                 <!--<mt-cell title="申请记录" @click.native="goRouter('/kq/applyQuery')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/12_icon.png" width="18" height="18">-->
                 <!--</mt-cell>-->
              <!--</div>-->
           <!--</div>-->
           <!--<div class="menu-nav">-->
              <!--<div class="title bd-bottom-1"><i class="query-icon"></i>相关查询</div>-->
              <!--<div class="menu-list clearfix">-->
                 <!--<mt-cell title="原始刷卡记录" @click.native="goRouter('/kq/cardRecord')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/13_icon.png" width="18" height="18">-->
                 <!--</mt-cell>-->
                 <!--<mt-cell title="考勤日历" @click.native="goRouter('/kq/calendar')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/6_icon.png" width="18" height="18">-->
                 <!--</mt-cell>-->
              <!--</div>-->
           <!--</div>-->
       </div>
    </div>
</template>
<script>
import {HomeHttp} from '@/api/homeHttp';
import { Swipe, SwipeItem,Badge,Indicator } from 'mint-ui';
export default {
    name:'kq',
    components:{Badge,Swipe,SwipeItem,Indicator},
    data(){
        return {
            carouselImgs:[],
            menuList:[],
            userInfo:{}
        }
    },
    activated(){
        setTitle('考勤管理');
        this.userInfo = getUserInfo();
        this.queryMenuTree();
    },
    methods:{
        goRouter(url){
            if(url.substring(0,1)=='/'){
                this.$router.push({
                    path:url
                });
            }else{
                window.location.href = url;
            }
        },
        queryMenuTree(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            HomeHttp.queryMenuTowTree({
                "iv-user":this.userInfo.oa_id,
                "resid":this.$route.query.resid
            }).then((res)=>{
                //console.log(JSON.stringify(res))
                this.menuList = res.data.submenus;
                this.carouselImgs = res.data.pics.split(';');
                this.$nextTick(()=>{
                    Indicator.close();
                })
            }).catch(function (e) {
                Indicator.close();
            })
        }
    }
}
</script>
<style lang="css" scoped>
    .person-icon{
        background-image: url("../../assets/img/person-icon.png");
    }
    .leave-icon{
        background-image: url("../../assets/img/leave-icon.png");
    }
    .query-icon{
        background-image: url("../../assets/img/query-icon.png");
    }
    .menu-tree .menu-nav .title {
        line-height: 0.7rem;
        color: #999999;
    }
    .menu-list {
        padding: 0 0 0 0.4rem;
        overflow: hidden;
    }
</style>
