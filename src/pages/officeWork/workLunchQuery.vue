<template>
    <!--异常处理-->
    <div class="body-box">
        <div class="header" id="header">
            <TimeTool @selectTime="selectTime"></TimeTool>
            <div class="application-type-box bd-bottom-1">
                <div class="application-type nnsubmitted" @click="changeLd_appr('0')">未提交</div>
                <div class="application-type submitted" @click="changeLd_appr('9')">已提交</div>
                <div class="application-type approved" @click="changeLd_appr('1')">已审批</div>
                <div class="application-type confirmed" @click="changeDir_appr('1')">已确认</div>
                <div class="application-type retreated" @click="changeLd_appr('2')">已退回</div>
            </div>
        </div>
        <div class="application-list-box" >
            <div class="loadmore-box scroll">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
                  <div class="loadmore-scroll-box">
                    <ul class="application-list">
                          <div v-if="listDataArr.length<=0" class="noneData">暂无数据</div>
                         <li class="application-list-cell" v-for="item in listDataArr" @click="toPage(item)">
                             <div class="icon"></div>
                             <div class="application-list-info bd-bottom-1">
                                 <div class="application-list-info-wrap">
                                     <p class="application-title-date">
                                         <span class="application-title-wrap"><span class="application-title">{{item.dir_title}}</span><!--<span class="submitted">（已提交）</span>--></span>
                                         <span class="application-date">{{item.apply_time | formatDate}}</span>
                                     </p>
                                     <p class="eat-type">就餐类别：{{item.stand_name}}</p>
                                 </div>
                             </div>
                         </li>
                    </ul>
                  </div>
                </mt-loadmore>
            </div>

        </div>
    </div>
</template>
<script>
    import { WlHttp } from '@/api/workLunchHttp';
    import { Indicator , Loadmore } from 'mint-ui';
    import TimeTool from "@/components/query/timetool";
    export default {
        name: 'workLunchQuery',
        components:{TimeTool , Indicator , Loadmore},
        data(){
            return {
                listBox:false,
                staff_num:getUserInfo().staff_num, //职工id
                sdate:'', //开始日期
                edate:'', //结束日期
                ld_appr:'', //领导审批
                dir_appr:'',  //管理员确认
                currPage:1, //当前页面
                pageLength:20, //页数
                listDataArr:[],
                allLoaded:false
            }
        },
        mounted(){
        },
        activated(){
            setTitle('工作餐单据查询');
        },
        filters: {
          formatDate: function (value) {
              if(value.length!=8) {return value;}
             return value.slice(0,4) + '-' + value.slice(4,6) + '-' + value.slice(6,8);
          }
        },
        methods:{
            postion(){
              if(this.currPage===1){
                this.$nextTick(function() {
                  var dom = document.getElementsByClassName('mint-loadmore');
                  if(!dom) return;
                  dom[0].parentNode.scrollTop = 0;
                })
              }
            },
            loadTop() {
                this.currPage = 1;
                this.allLoaded = false;
                this.$refs.loadmore.onTopLoaded();
                this.getWorkLunchList();
            },
            loadBottom() {
                this.currPage=this.currPage + 1;
                this.getWorkLunchList();
            },
            toPage(item){
               if(item.dir_title.indexOf('未提交')){
                  this.$router.push('workLunchApply?id=' + item.dinner_id);
               }else{
                 this.$router.push('workLunchDetails?id=' + item.dinner_id);
               }
            },
            getWorkLunchList(){
                Indicator.open();
                let params = {
                    staff_num:this.staff_num,
                    sdate:this.sdate,
                    edate:this.edate,
                    ld_appr:this.ld_appr,
                    dir_appr:this.dir_appr,
                    currPage:this.currPage,
                    pageLength:this.pageLength
                };
                WlHttp.getWorkLunchList(params).then((res)=>{
                    Indicator.close();
                    if (res.code=='1') {
                        //console.log(res);
                        if(this.currPage==1){
                            this.listDataArr = [];
                            this.listDataArr = res.data.pageData;
                        }else{
                            this.listDataArr = this.listDataArr.concat(res.data.pageData);
                        }

                        this.allLoaded = res.data.pageData.length < this.pageLength;
                        this.$refs.loadmore.onBottomLoaded();

                        this.postion();
                    }
                }).catch(()=>{
                   Indicator.close();
                });
            },
            changeLd_appr(index){
                this.ld_appr = index;
                this.getWorkLunchList();
            },
            changeDir_appr(index){
                this.dir_appr = index;
                this.getWorkLunchList();
                //this.mescroll.resetUpScroll();
            },
            selectTime(startTime,endTime){
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                this.getWorkLunchList();
            }
        }
    }
</script>
<style lang="css" scoped>
@import "../../assets/css/mescroll.min.css";
    .loadmore-box {
        height: calc(100vh - 1.35rem - 65px);
    }
   .loadmore-box .loadmore-scroll-box{
      min-height: calc(100vh - 1.35rem - 65px) !important;
   }
</style>
