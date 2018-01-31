<template>
    <!--原始刷卡记录-->
    <div class="body-box cardRecord">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box scroll">
            <div class="info">
                <div class="fl text-over clearfix">部门：<span>{{userInfo.dept_name}}</span></div>
                <div class="fr text-over">姓名：<span>{{userInfo.name}}</span></div>
            </div>
            <div class="table-scroll-box scroll">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
                <div class="scroll-box">
                    <TableCell :dataList="tableList" :columnNames="columnValue"></TableCell>
                </div>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TimeTool from "@/components/query/timetool";
    import TableCell from "@/components/query/tablecell";
    import { Loadmore } from 'mint-ui';
    export default {
        name: 'cardRecord',
        components:{Loadmore,TimeTool,TableCell},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['日期','星期','刷卡时间'],
                    columnValues:['year_month','week','bursh_time'],
                },
                userInfo:{},
                sdate:'',
                edate:'',
                allLoaded:false,
                currPage:1,
                pageLength:50
            }
        },
        activated(){
            setTitle('原始刷卡记录');
            this.userInfo = getUserInfo();
        },
        methods:{
            postion:function(){
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
                this.queryList();
            },
            loadBottom() {
                this.currPage=this.currPage+1;
                this.queryList();
            },
            selectTime(startTime,endTime){
                this.currPage = 1;
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                this.queryList();
            },
            queryList(){
                let params = {
                    staff_num: this.userInfo.staff_num,
                    sdate:this.sdate,
                    edate:this.edate,
                    currPage:this.currPage,
                    pageLength:this.pageLength
                };
                KqHttp.queryCardRecaordList(params).then((res)=>{
                    if(this.currPage==1){
                        this.tableList = [];
                        this.tableList = res.data.pageData;
                    }else{
                        this.tableList = this.tableList.concat(res.data.pageData);
                    }
                    this.allLoaded = res.data.pageData.length<this.pageLength;
                    this.$refs.loadmore.onBottomLoaded();
                    this.postion();
                });
            }
        }
    }
</script>
<style lang="css" scoped>
    .cardRecord{
        height: 100vh;
        overflow: hidden;
    }
    .info{
        width: 80%;
        height: 0.8rem;
        line-height: 0.8rem;
        margin: 0 auto;
    }
    .info div{
        width: 50%;
    }
    .info div span{
        color: #999;
    }
    .info div:last-child{
        text-align: right;
    }
    .exp-box{
        height: calc(100% - 0.8rem - 2*0.15rem - 0.25rem);
    }
    .table-box{
        background-color: #fff;
        padding: 0.1rem 0.1rem 0 0.1rem;
        min-height: calc(100% - 1rem);
    }
    .table-scroll-box{
        height: calc(100% - 1.25rem);
    }
</style>
