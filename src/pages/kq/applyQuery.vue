<template>
    <!--申请记录-->
    <div class="body-box cardRecord">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <div class="fl text-over clearfix">部门：<span>{{userInfo.dept_name}}</span></div>
                <div class="fr text-over">姓名：<span>{{userInfo.name}}</span></div>
            </div>
            <TableCellAuto autowidth="150%"  :dataList="tableList" :columnNames="columnValue"></TableCellAuto>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TimeTool from "@/components/query/timetool";
    import TableCellAuto from "@/components/query/tablecellauto";
    export default {
        name: 'applyQuery',
        components:{TimeTool,TableCellAuto},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['','姓名','请假起日期','请假止日期','请假类型','审批状态','审批状态名称'],
                    columnValues:['staff_name','start_date','intending_date','leave_cause','all_sign','all_sign_nm']
                },
                userInfo:{},
                sdate:'',
                edate:''
            }
        },
        activated(){
            setTitle('申请记录');
            this.userInfo = getUserInfo();
        },
        methods:{
            selectTime(startTime,endTime){
                this.sdate = startTime.Format2String('yyyyMMdd');
                this.edate = endTime.Format2String('yyyyMMdd');
                this.queryList();
            },
            queryList(){
                let params = {
                    staff_num: this.userInfo.staff_num,
                    sdate:this.sdate,
                    edate:this.edate,
                    currPage:'1',
                    pageLength:'1000'
                };
                KqHttp.queryLeave(params).then((res)=>{
                    this.tableList = res.data.pageData;
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
        padding: 0 .25rem;
        min-height: calc(100% - 1rem);
    }
</style>
