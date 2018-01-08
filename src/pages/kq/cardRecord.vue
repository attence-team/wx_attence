<template>
    <!--原始刷卡记录-->
    <div class="body-box">
        <TimeTool @selectTime="selectTime"></TimeTool>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <div class="fl text-over clearfix">部门：<span>{{userInfo.dept_name}}</span></div>
                <div class="fr text-over">姓名：<span>{{userInfo.name}}</span></div>
            </div>
            <TableCell :dataList="tableList" :columnNames="columnValue"></TableCell>
        </div>
    </div>
</template>
<script>
    import {KqHttp} from '@/api/kqHttp';
    import TimeTool from "@/components/query/timetool";
    import TableCell from "@/components/query/tablecell";
    export default {
        name: 'cardRecord',
        components:{TimeTool,TableCell},
        data(){
            return {
                tableList:[],
                columnValue:{
                    titles:['日期','星期','刷卡时间'],
                    columnValues:['year_month','week','bursh_time'],
                },
                userInfo:{},
                sdate:'',
                edate:''
            }
        },
        mounted(){
            setTitle('原始刷卡记录');
            this.userInfo = getUserInfo();
            this.queryList();
        },
        methods:{
            selectTime(startTime,endTime){
                this.sdate = startTime;
                this.edate = endTime;
                this.queryList();
            },
            queryList(){
                let params = {
                    staff_num: this.userInfo.staff_num,
                    sdate:this.sdate,
                    edate:this.edate,
                    currPage:'1',
                    pageLength:'30'
                };
                KqHttp.queryCardRecaordList(params).then((res)=>{
                    this.tableList = res.data.pageData;
                });
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
