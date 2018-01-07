<template>
    <div class="leave">
        <div class="pert1 pert">
            <table class="table-info">
                <tr>
                    <th class="th1">申请部门：</th>
                    <td>XXXX部</td>
                    <th class="th2">请假人姓名：</th>
                    <td>张三</td>
                </tr>
                <tr>
                    <th class="th1">申请时间：</th>
                    <td>2018-01-05</td>
                    <th class="th1">单据状态：</th>
                    <td>未提交</td>
                </tr>
            </table>
        </div>
        <div class="pert2 pert">
            <table class="table-info">
                <tr>
                    <th>请假类型：</th>
                    <td>
                        <select class="select" @focus="setboder($event)">
                            <option v-for="item in typeList" value="item.value">{{item.name}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>请假起日期：</th>
                    <td>
                        <!--<input type="date" class="date">-->
                        <Date></Date>
                        <span class="ampm">上午</span>
                    </td>
                </tr>
                <tr>
                    <th>请假预计止日期：</th>
                    <td>
                        <Date></Date>
                        <span class="ampm">下午</span>
                    </td>
                </tr>
                <tr>
                    <th>免打卡次数：</th>
                    <td><input type="number" class="width-min"  placeholder="请输入"><span>次</span></td>
                </tr>
                <tr>
                    <th>请假天数：</th>
                    <td><input type="number" class="width-min" placeholder="请输入 "><span>天</span></td>
                </tr>
                <tr>
                    <th>事由、备注：</th>
                    <td><input class="text-resuly" placeholder="请输入请假事由（必填）"></td>
                </tr>
            </table>
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
                ]
            }
        },
        created(){

        },
        methods:{
            setboder(event){
                let taregt = event.target;
                taregt.style.border = 'solid 1px rgba(52, 151, 245, 1)';
                taregt.style.borderRadius = '10px';
            }
        },
        components:{Date}
    }
</script>

<style lang="css" scoped>
    .leave{

    }
    .pert{
        padding: .3rem .32rem;
    }
    .pert1, .pert2, .pert3 {
        border-bottom: .25rem solid rgba(242, 242, 242, 1);
    }
    .table-info{
        width: 100%;
    }
    .table-info th,.table-info td{
        font-size: 14px;
        line-height: 30px;
        text-align: left;
    }
    .table-info th{
        color: #333;
    }
    .table-info td{
        color: #999;
    }
    .pert1 .table-info .th1{
        width: 1.40rem !important;
    }
    .pert1 .table-info .th2{
        width: 1.70rem;
    }

    .pert2 .table-info tr{
        border-bottom: 1px solid #dddddd;
    }
    .pert2 .table-info th{
        font-size: 16px;
        line-height: .8rem;
        text-align: left;
        width:2.33rem;
    }
    .pert2 .table-info td{
        font-size: 14px;
        line-height: .8rem;
        text-align: right;
    }
    .pert2 .table-info td select{
        width: 100%;
        border: solid 1px rgba(52, 151, 245, 1);
        border-radius: 10px;
        height: 4.5vh;
        line-height: 4.5vh;
    }
    .pert2 .table-info td select:hover,.pert2 .table-info td select:active,.pert2 .table-info td select:focus{
        border: none;
        //border-radius: 10px;
    }
    select:focus {
        border: solid 1px rgba(52, 151, 245, 1);
        border-radius: 10px;
    }
    .pert2 .table-info td input.text-resuly{
        padding-left:.15rem;
        width: 100%;
        border: none;
        border-radius: 10px;
        height: 4.5vh;
        line-height: 4.5vh;
        color: #f20d0d;
    }
    .pert2 .table-info td input.text-resuly:focus{

        color: #333;
    }
    .pert2 .table-info td input.width-min{
        width: 1rem;
        text-align: right;
        padding:0 .1rem;
        border:none;
    }
    .pert2 .table-info td input.date{
        width: 2.1rem;
        text-align: right;
        padding:0 .1rem;
    }
    .pert2 .table-info td input.text-resuly:focus{
        border: none;
        border-radius: 10px;
        height: 4.5vh;
        line-height: 4.5vh;
        color: #999;;
    }
    .group{

    }
    .group .group-th{
        font-size: 16px;
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
        
    }
    .pert4 button{
        width: 100%;
        height: .8rem;
        background-color: rgba(52, 151, 245, 1);
        border-radius: 10px;
        border: 1px solid rgba(52, 151, 245, 1);
        cursor: pointer;
        color: #fff;
        font-size:18px;
    }
    .ampm{
        display: inline-block;
    }
</style>