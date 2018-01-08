<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <!--<div class="fl text-over clearfix">部门：<span>***部</span></div>
                <div class="fr text-over">请假人姓名：<span>***部</span></div>-->
                <div class="box1">异常14次（未填单14次）</div>
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
                    <div class="color-grey">迟到2次</div>
                    <div class="color-grey">早退3次</div>
                    <div class="color-red">未刷卡0次</div>
                </div>
            </div>
            <TableList :dataList="tableList" :columnNames="columnValue" @optfn="optfn"></TableList>
        </div>
    </div>
</template>
<script>
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
                }
            }
        },
        mounted(){
            this.tableList = [
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'},
                {time:'2017-08-09<br>星期五',type:'<i class="color-red2">8：00<br>未刷卡</i>',status:'--'}
            ];
        },
        methods:{
            selectTime(startTime,endTime){
                console.log(startTime);
                console.log(endTime);
            },
            optfn(obj){
                console.log(obj)
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
    /*.info div{
        width: 50%;
    }
    .info div span{
        color: #999;
    }
    .info div:last-child{
        text-align: right;
    }*/
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
        font-size: .35rem;
        color: #ffffff;
        margin: 0 15%;
        text-align:center;
        border-radius:5px;
    }
    .line{
        //height: 1.5rem;
        padding-top: .5rem;
        position: relative;

    }
    .line .juxing{
        margin: 0 12%;
        border: 1px solid #ddd;
        border-bottom: none;
        height: .7rem;
        line-height: .7rem;
        position: relative;
        padding: 0 3px;
    }
    .point-grey{
        display: block;
        position: absolute;
        bottom: 0;
        width: 6px;
        height: 6px;
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
        width:20px;
        margin-left: -10px;
    }
    .sanjiao{
        width:0;
        height:0;
        border-width:10px;
        border-style:solid;
        border-color: #ff6054 #fff #fff #fff;
        z-index: 99;
    }
    .line-c-line{
        width:1px;
        height:100%;
        background-color: #ddd;
        position: absolute;
        top:0;
        left:50%;
        border-top:10px solid #ff6054;
    }
    .col{
        display: flex;
        //margin: 0 11%;
        text-align: center;
        justify-content: space-between;
    }
    .col div{
        border-radius: 5px;
        line-height: .7rem;
        font-size: .3rem;
        height: .7rem;
        text-align: center;
        padding: 0 .5rem;
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
