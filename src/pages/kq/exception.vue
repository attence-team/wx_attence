<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <!--<div class="fl text-over clearfix">部门：<span>***部</span></div>
                <div class="fr text-over">请假人姓名：<span>***部</span></div>-->
                <div class="box1">异常14次（未填单14次）<i class="sanjiao"></i></div>
                <div class="line">

                </div>
                <div class="col">
                    <div class="color-grey">迟到2次</div>
                    <div class="color-grey">早退3次</div>
                    <div class="color-red">未刷卡0次</div>
                </div>
            </div>
            <TableCell :dataList="tableList" :columnNames="columnValue"></TableCell>
        </div>
    </div>
</template>
<script>
    import TimeTool from "@/components/query/timetool";
    import TableCell from "@/components/query/tablecell";
    export default {
        name: 'exception',
        components:{TimeTool,TableCell},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['日期','星期','刷卡时间'],
                    columnValues:['time','md','dt'],
                }
            }
        },
        mounted(){
            this.tableList = [
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2017-08-09',md:'星期三',dt:'10:10:06'},
                {time:'2016-08-09',md:'星期三',dt:'11:10'}
            ];
        },
        methods:{
            selectTime(startTime,endTime){
                console.log(startTime);
                console.log(endTime);
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
        padding: .25rem 0;
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
        //width: 51%;
        height: .8rem;
        background-color: #FF6054;
        line-height: .8rem;
        font-size: .35rem;
        color: #ffffff;
        margin: 0 11%;
        //padding: 0 11%;
        text-align:center;
        border-radius:10px;
    }
    .sanjiao{
        margin: 0 auto;

    }
    .line{
        height: 1.5rem;
    }
    .col{
        display: flex;
        //margin: 0 11%;
        text-align: center;
        justify-content: space-between;
    }
    .col div{
        border-radius: 10px;
        line-height: .8rem;
        font-size: .35rem;
        height: .8rem;
        text-align:center;
        padding:0 .2rem;
    }
    .color-grey{
        background-color: #ccc;
        color: #fff;
    }
    .color-red{

        background-color: #ff8922;
        color: #fff;
    }

</style>
