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
        <div class="mescroll-wrap" id="listBox" v-show="listBox">
            <div class="application-list-box mescroll" id="mescroll">
                <ul class="application-list">
                    <router-link v-for="item in listDataArr" :to="'workLunchApply?id=' + item.dinner_id ">
                    <li class="application-list-cell">
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
                    </router-link>
                    <!-- <router-link to="workLunchApply">
                    <li class="application-list-cell">
                        <div class="icon"></div>
                        <div class="application-list-info bd-bottom-1">
                            <p class="application-title-date">
                                <span class="application-title">张三的工作餐申请<span class="approved">（已审批）</span></span>
                                <span class="application-date">2017-08-08</span>
                            </p>
                            <p class="eat-type">就餐类别：自助餐</p>
                        </div>
                    </li>
                    </router-link>
                        <router-link to="workLunchApply">
                    <li class="application-list-cell">
                        <div class="icon"></div>
                        <div class="application-list-info bd-bottom-1">
                            <p class="application-title-date">
                                <span class="application-title">张三的工作餐申请<span class="retreated">（已退回）</span></span>
                                <span class="application-date">2017-08-08</span>
                            </p>
                            <p class="eat-type">就餐类别：自助餐</p>
                        </div>
                    </li>
                    </router-link>
                        <router-link to="workLunchApply">
                    <li class="application-list-cell">
                        <div class="icon"></div>
                        <div class="application-list-info bd-bottom-1">
                            <p class="application-title-date">
                                <span class="application-title">张三的工作餐申请<span class="nnsubmitted">（未提交）</span></span>
                                <span class="application-date">2017-08-08</span>
                            </p>
                            <p class="eat-type">就餐类别：自助餐</p>
                        </div>
                    </li>
                    </router-link> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { WlHttp } from '@/api/workLunchHttp';
    import TimeTool from "@/components/query/timetool";
    //window.Mescroll = require('../../assets/js/mescroll.min.js');
    export default {
        name: 'workLunchQuery',
        components:{TimeTool},
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
                listDataArr:[]
            }
        },
        mounted(){
            //this.getWorkLunchList();//creatMescroll();
            let _this = this;
            setTimeout(function() {
               let header = document.getElementById('header'),
                   listBox = document.getElementById('listBox');
                   listBox.style.top = header.offsetHeight + 'px';
                   _this.listBox = true; //显示列表容器
            },1)
        },
        activated(){
        },
        filters: {
          formatDate: function (value) {
              if(value.length!=8) {return value;}
             return value.slice(0,4) + '-' + value.slice(4,6) + '-' + value.slice(6,8);
          }
        },
        methods:{
            getWorkLunchList(){
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

                    if (res.code=='1') {
                        let pageData = res.data.pageData;
                        let _this = this,hasNext = true;

                        if( this.currPage == 1) { _this.listDataArr = []; }
                        if (pageData.length < this.pageLength) { hasNext = false; }

                        pageData.map(function(e) {
                            _this.listDataArr.push(e);
                        })
                        console.log(_this.listDataArr);
                        //this.mescroll.endSuccess(20,hasNext);
                    }else{
                        //this.mescroll.endErr();
                    }
                });
            },
            changeLd_appr(index){
                this.ld_appr = index;
                this.getWorkLunchList();
                //this.mescroll.resetUpScroll();
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
                //this.mescroll.resetUpScroll();
            },
            creatMescroll(){
                 let _this = this;

                 setTimeout(function() {
                    let header = document.getElementById('header'),
                        listBox = document.getElementById('listBox');
                        listBox.style.top = header.clientHeight + 'px';
                 },1)

                 _this.mescroll = new Mescroll("mescroll", {
    	       		down: {
                        auto:false,
                        offset:50,
    					callback: _this.downCallback //下拉刷新的回调
    				},
    				up: {
                        auto:false,
                        htmlNodata:'<p class="upwarp-nodata">-- 暂无数据 --</p>',
    					callback: _this.upCallback , //上拉加载的回调
    					isBounce: true
    				}
    			});

                this.listBox = true; //显示列表容器
            },
            downCallback(){
                this.currPage = 1;
                this.mescroll.setPageNum(this.currPage); //重置mescroll当前页数
                this.getWorkLunchList();
            },
            upCallback(page){ //上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
                //console.log(page.num);
                this.currPage = page.num;
                this.getWorkLunchList();
            }
        }
    }
</script>
<style lang="css" scoped>
@import "../../assets/css/mescroll.min.css";
.body-box {
    position: relative;
}
.mescroll-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
}
</style>
