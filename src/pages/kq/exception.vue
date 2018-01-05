<template>
    <!--异常处理-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <div class="fl text-over clearfix">部门：<span>***部</span></div>
                <div class="fr text-over">请假人姓名：<span>***部</span></div>
            </div>
            <TableCell></TableCell>
        </div>
    </div>
</template>
<script>
    import TimeTool from "@/components/query/timetool";
    import TableCell from "@/components/query/tablecell";
    export default {
        name: 'exception',
        components:{TimeTool,TableCell},
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
        padding: 0 .25rem;
        min-height: calc(100% - 1rem);
    }
</style>
