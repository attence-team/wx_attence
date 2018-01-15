<template lang="html">
    <div class="body-box">
       <!--待办工作-->
       <div class="carousel-box">
          <mt-swipe :show-indicators="false" :prevent="true" :auto="3000">
             <mt-swipe-item v-for="img in carouselImgs">
               <img class="img-item" :src="img">
             </mt-swipe-item>
          </mt-swipe>
          <div class="welcome">你好，{{userInfo.name}}</div>
       </div>
       <div class="menu-box menu-tree">
           <div class="menu-nav">
              <div class="menu-list clearfix">
                 <!--<mt-cell title="NC待办" @click.native="goRouter('/kq/approval')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/11_icon.png" width="24" height="24">-->
                 <!--</mt-cell>-->
                 <!--<mt-cell title="考勤管理待办" @click.native="goRouter('/kq/approval')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/5_icon.png" width="24" height="24">-->
                 <!--</mt-cell>-->
                 <!--<mt-cell title="办公管理待办" @click.native="goRouter('/kq/approval')" is-link>-->
                    <!--<img slot="icon" src="../../assets/img/5_icon.png" width="24" height="24">-->
                 <!--</mt-cell>-->
                 <mt-cell :title="subMenu.resname"
                 v-for="subMenu in menuList"
                 @click.native="goRouter(subMenu.resurl)" is-link>
                    <img slot="icon" :src="subMenu.resicon" width="24" height="24">
                 </mt-cell>
              </div>
           </div>
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
    mounted(){
        setTitle('待办工作');
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
