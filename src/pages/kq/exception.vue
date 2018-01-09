<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <div class="box1">异常{{exceptionCount.all_count}}次（未刷卡{{exceptionCount.no_punch}}次）</div>
                <div class="line">
                    <div class="juxing">
                        <div class="point-grey point-lb"></div>
                        <div class="point-grey point-rb"></div>
                    </div>
                    <div class="line-c">
                        <div class="sanjiao"></div>
                        <div class="line-c-line"></div>
                        <div class="point-grey point-cb"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="color-grey color-l">迟到{{exceptionCount.late}}次</div>
                    <div class="color-grey color-c">早退{{exceptionCount.early}}次</div>
                    <div class="color-red color-r">未刷卡{{exceptionCount.no_punch}}次</div>
                </div>
            </div>
            <TableList :dataList="tableList" :columnNames="columnValue" @optfn="optfn"></TableList>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TimeTool from "@/components/query/timetool";
    import TableList from "@/components/query/tablelist";
    export default {
        name: 'exception',
        components:{TimeTool,TableList},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['异常日期','异常类型','处理状态','处理方式'],
                    columnValues:['time','type','status']
                },
                startTime:'',
                endTime:'',
                exceptionCount:{
                    all_count:"0",
                    early:"0",
                    late:"0",
                    no_punch:"0"
                }
            }
        },
        mounted(){
            this.tableList = [
                /*{time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'}*/
            ];
            this.getAbnormalLeave();
            this.getAbnormalLeaveCount();
        },
        methods:{
            selectTime(startTime,endTime){
                console.log(startTime);
                console.log(endTime);
                this.startTime = startTime;
                this.endTime = endTime;

                this.getAbnormalLeave();
                this.getAbnormalLeaveCount();
            },
            optfn(obj){
                console.log(obj)
            },
            getAbnormalLeave(){
                let _this = this;
                let params = {
                    staff_num: getUserInfo().staff_num,
                    sdate: new Date(_this.startTime).Format2String('yyyyMMdd'),
                    edate: new Date(_this.endTime).Format2String('yyyyMMdd'),
                    currPage: '1',
                    pageLength: '1000'
                };
                KqHttp.queryAbnormalLeave(params).then((res)=>{
                    if(res.code == '1' && res.data.rowCount > 0){
                        let data = res.data.pageData;
                        _this.tableList = [];
                        data.forEach(function(value){
                            _this.tableList.push({
                                time:value.year_month + '<br>' + value.week,
                                type:'<i class="color-red2">'+ value.bursh_name +'</i>', //+'<br>'+未刷卡+'</i>',
                                status:'--'
                            })
                        })
                    }
                });
            },
            getAbnormalLeaveCount(){
                let _this = this;
                let params = {
                    staff_num: getUserInfo().staff_num,
                    sdate: new Date(_this.startTime).Format2String('yyyyMMdd'),
                    edate: new Date(_this.endTime).Format2String('yyyyMMdd'),
                };
                KqHttp.queryAbnormalLeaveCount(params).then((res)=>{
                    if(res.code == '1'){
                        _this.exceptionCount = {
                            all_count: res.data.all_count,
                            early: res.data.early,
                            late: res.data.late,
                            no_punch: res.data.no_punch
                        }
                    }
                    console.log(res);
                });
            }
        }
    }
</script>
<style lang="css" scoped>
    .info{
        //width: 80%;
        //height: 0.8rem;
        //line-height: 0.8rem;
        //margin: 0 auto;
        padding: .4rem 0 .5rem;
    }
    .exp-box{
        height: calc(100% - 0.8rem - 2*0.15rem - 0.25rem);
    }
    .table-box{
        background-color: #fff;
        padding: 0 .25rem;
        min-height: calc(100% - 1rem);
    }
    .box1{
        height: .8rem;
        background-color: #FF6054;
        line-height: .8rem;
        font-size: .3rem;
        color: #ffffff;
        margin: 0 auto;
        text-align:center;
        border-radius:5px;
        width: calc(100% - 2.5rem);
    }
    .line{
        padding-top: .5rem;
        position: relative;
    }
    .line .juxing{
        margin: 0 auto;
        border: 1px solid #ddd;
        border-bottom: none;
        height: .7rem;
        line-height: .7rem;
        position: relative;
        padding: 0 3px;
        width: calc(100% - 2.1rem);
    }
    .point-grey{
        display: block;
        position: absolute;
        bottom: 0;
        width: 5px;
        height: 5px;
        border-radius:50%;
        background-color: #aaa;
        z-index: 9;
    }
    .point-lb{
        left:0;
        margin-left: -3px;
    }
    .point-cb{
        left:50%;
        margin-left: -2px;
        z-index: 99;
    }
    .point-rb{
        right:0;
        margin-right:-3px;
    }
    .line-c{
        height:100%;
        position: absolute;
        top:0;
        left:50%;
        width:12px;
        margin-left: -6px;
    }
    .sanjiao{
        width:0;
        height:0;
        border-width: 8px 6px 8px 6px;
        border-style:solid;
        border-color: #ff6054 #fff #fff #fff;
        z-index: 99;
    }
    .line-c-line{
        width:1px;
        height:100%;
        background-color: #ddd;
        /* position: absolute; */
        /* top: 0; */
        /* left: 6px; */
        margin: -8px auto 0;
        /* display: inline-block; */
    }
    .col{
        display: flex;
        text-align: center;
        justify-content: space-between;
    }
    .col div{
        border-radius: 5px;
        line-height: .7rem;
        font-size: .3rem;
        height: .7rem;
        text-align: center;
        width:2.1rem;
        z-index: 9;
    }
    .color-grey{
        background-color: #ccc;
        color: #fff;
    }
    .color-red{
        background-color: #ff8922;
        color: #fff;
    }
    .color-red2{
        color: #ff6054;
    }

</style>
<style>
    .color-red2{
        color: #ff6054;
    }
</style>
