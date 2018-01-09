<template>
    <div class="leave">
        <div class="pert1 pert">
            <div class="table-info">
                <div class="group">
                    <div class="hf-l hf">
                        <label class="th">申请部门：</label>
                        <span class="td">XXXX部</span>
                    </div>
                    <div class="hf-r hf">
                        <label class="th">请假人姓名：</label>
                        <span class="td">张三</span>
                    </div>
                </div>
                <div class="group">
                    <div class="hf-l hf">
                        <label class="th">申请时间：</label>
                        <span class="td">2018-01-05</span>
                    </div>
                    <div class="hf-r hf">
                        <label class="th">单据状态：</label>
                        <span class="td">未提交fffff</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pert2 pert">
            <div class="table-info">
                <div class="group bd-bottom-1">
                    <label class="th">请假类型</label>
                    <span class="td td1">
                        <select class="select">
                            <option v-for="item in typeList" value="item.value">{{item.name}}</option>
                        </select>
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">请假起日期</label>
                    <span class="td">
                        <Date></Date>
                        <AmPm></AmPm>
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">请假预计止日期</label>
                    <span class="td">
                        <Date></Date>
                        <AmPm></AmPm>
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">免打卡次数</label>
                    <span class="td">
                        <input type="number" class="width-min"  placeholder="请输入">
                        <span>次</span>
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">请假天数</label>
                    <span class="td">
                        <input type="number" class="width-min" placeholder="请输入">
                        <span>天</span>
                    </span>
                </div>
                <div class="group bd-bottom-1">
                    <label class="th">事由、备注</label>
                    <span class="td">
                        <input class="text-resuly" value="请输入请假事由（必填）" v-on:focus="setValue($event)"  v-on:blur="clearValue($event)" >
                    </span>
                </div>
            </div>
        </div>
        <div class="pert3 pert group">
            <label class="group-th">审批流程</label>
            <span class="group-td"><span class="circle">雄辉</span></span>
        </div>
        <div class="pert4 pert">
            <button>提交</button>
        </div>
    </div>
</template>
<script>
    import Date from "@/components/query/date";
    import AmPm from "@/components/query/AmPm";
    export default {
        name: 'leave',
        data(){
            return {
                typeList:[
                    {value:0, name:'请假类型0'},
                    {value:1, name:'请假类型1'},
                    {value:2, name:'请假类型2'},
                    {value:3, name:'请假类型3'},
                    {value:4, name:'请假类型4'},
                    {value:5, name:'请假类型5'}
                ],
                ampm:{
                    value: 'am',
                    text: '上午'
                }
            }
        },
        created(){

        },
        methods:{
            setValue(event){
                let taregt = event.target;
                taregt.setAttribute('value', '');
            },
            clearValue(event){
                let taregt = event.target;
                taregt.setAttribute('value', '请输入请假事由（必填）');
            }
        },
        components:{Date,AmPm}
    }
</script>

<style lang="css" scoped>
    .leave{

    }
    .pert{
        padding: .3rem .32rem;
    }
    .pert2{
        padding: .3rem 0 .3rem .32rem;
    }
    .pert1, .pert2, .pert3 {
        border-bottom: .25rem solid #F2F2F2;
    }
    .table-info{
        width: 100%;
    }
    .table-info .th,
    .table-info .td{
        font-size: .30rem;
        line-height: 30px;
        text-align: left;
    }
    .table-info .th{
        color: #333;
        font-weight: 600;
    }
    .table-info .td{
        color: #999;
    }
    .table-info .group{
        position: relative;
        text-align: left;
        overflow: hidden;
    }
    .table-info .hf{
        width: 50%;
        float: left;
    }
    .table-info .hf-l{
    }
    .table-info .hf-r{
    }
    .pert2 .table-info .group{
        overflow: hidden;
        padding-right:.32rem;
    }
    .pert2 .table-info .th{
        font-size: .31rem;
        line-height: 1rem;
        text-align: left;
        float: left;
    }
    .pert2 .table-info .td{
        font-size: .30rem;
        line-height: 1rem;
        text-align: right;
        float: right;
    }
    .pert2 .table-info .group:nth-child(1) .th{
        width: 1.5rem;
    }
    .pert2 .table-info .group:nth-child(1) .td{
        width: calc(100% - 1.5rem)
    }
    .pert2 .table-info .group:nth-child(4) .th{
        width: 1.7rem;
    }
    .pert2 .table-info .group:nth-child(4) .td{
        width: calc(100% - 1.7rem)
    }
    .pert2 .table-info .group:nth-child(5) .th{
        width: 1.7rem;
    }
    .pert2 .table-info .group:nth-child(5) .td{
        width: calc(100% - 1.7rem)
    }
    .pert2 .table-info .group:nth-child(6) .th{
        width: 1.7rem;
    }
    .pert2 .table-info .group:nth-child(6) .td{
        width: calc(100% - 1.7rem);
        text-align: right;
    }
    .pert2 .table-info .td select{
        width: 100%;
        border: solid 1px #3497F5;
        border-radius: 6px;
        height: .6rem;
        line-height: .6rem;
    }
    .pert2 .table-info .td select:focus {
        border: solid 1px #3497F5;
        border-radius: 6px;
    }
    .pert2 .table-info .td input.text-resuly{
        padding: 0 .15rem;
        width: 100%;
        border: none;
        height: 4.5vh;
        line-height: 4.5vh;
        color: #f20d0d;
        text-align: right;
    }
    .pert2 .table-info .td input.text-resuly:focus{
        color: #333;
    }
    .pert2 .table-info .td input.width-min{
        text-align: right;
        padding:0 .1rem;
        border:none;
    }
    .pert2 .table-info .td input.date{
        width: 2.1rem;
        text-align: right;
        padding:0 .1rem;
    }
    .pert2 .table-info .td input.text-resuly:focus{
        border: none;
        border-radius: 10px;
        height: 4.5vh;
        line-height: 4.5vh;
        color: #999;;
    }
    .group .group-th{
        font-size: .31rem;
        line-height: .8rem;
        text-align: left;
        width:2.33rem;
        color: #333;
        font-weight: 700;
    }
    .group .group-td{
        font-size: 14px;
        line-height: .8rem;
        text-align: right;
        color: #999;
    }
    .group .group-td .circle{
        font-size: 0.25rem;
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background-color: rgba(254, 165, 88, 1);
        color: #fff;
        border-radius: 50%;
        display: inline-block;
        margin-left: .15rem;
    }
    .pert4 button{
        width: 100%;
        height: .8rem;
        background-color: rgba(52, 151, 245, 1);
        border-radius: 6px;
        border: 1px solid rgba(52, 151, 245, 1);
        cursor: pointer;
        color: #fff;
        font-size:18px;
    }
    .ampm{
        display: inline-block;
    }

    @media screen and (max-width: 320px) {
        .table-info .th,
        .table-info .td{
            font-size: .29rem;
        }
        .pert2 .table-info .th{
            font-size: .30rem;
        }
        .pert2 .table-info .td{
            font-size: .29rem;
        }
        .group .group-th {
            font-size: .30rem;
        }
    }
</style>