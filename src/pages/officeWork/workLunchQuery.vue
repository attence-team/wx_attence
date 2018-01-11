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
        <div class="application-list-box" id="list-box" v-show="listBox">
            <ul class="application-list">
                <router-link v-for="item in listDataArr" :to="'workLunchApply?id=' + item.dinner_id ">
                <li class="application-list-cell">
                    <div class="icon"></div>
                    <div class="application-list-info bd-bottom-1">
                        <div class="application-list-info-wrap">
                            <p class="application-title-date">
                                <span class="application-title-wrap"><span class="application-title">{{item.dir_title}}</span><!--<span class="submitted">（已提交）</span>--></span>
                                <span class="application-date">{{item.apply_time | date}}</span>
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
</template>
<script>
    import { WlHttp } from '@/api/workLunchHttp';
    import TimeTool from "@/components/query/timetool";
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
        },
        activated(){
        },
        filters: {
          date: function (value) {
             return value.Format2String('yyyy-MM-dd');
          }
        },
        methods:{
            getWorkLunchList(load){
                if(!load) { this.listDataArr = []; }
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
                    console.log(res);
                    if (res.code=='1') {
                        let pageData = res.data.pageData;
                        let _this = this;
                        pageData.map(function(e) {
                            _this.listDataArr.push(e);
                        })
                        //alert(JSON.stringify(res))    
                        this.setListTop();
                    }
                });
            },
            changeLd_appr(index){
                this.ld_appr = index;
                this.getWorkLunchList();
            },
            changeDir_appr(index){
                this.dir_appr = index;
                this.getWorkLunchList();
            },
            selectTime(startTime,endTime){
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                this.getWorkLunchList();
            },
            setListTop(){
                 let header = document.getElementById('header'),
                     listBox = document.getElementById('list-box');
                     listBox.style.top = header.clientHeight + 'px';

                     this.listBox = true;
            }
        }
    }
</script>
<style lang="css" scoped>
.body-box {
    position: relative;
    overflow: hidden;
}
#list-box {
    position: absolute;
    overflow: hidden;
    bottom: 0;
    left: 0;
    right: 0;
}
#list-box ul {
    height: 100%;
    overflow: auto;
}
</style>
