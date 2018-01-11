<template>
    <div class="body-box">
        <div class="approved-head">
            <div class="approved-head-row">
                <div class="approved-head-warp">申请部门：<span class="approved-head-info">{{dept_name}}</span></div>
                <div class="approved-head-warp">经办人：<span class="approved-head-info">{{name}}</span></div>
            </div>
            <div class="approved-head-row">
                <div class="approved-head-warp">申请时间：<span class="approved-head-info">{{apply_time}}</span></div>
                <div class="approved-head-warp">单据状态：<span class="approved-head-info">{{apply_state}}</span></div>
            </div>
        </div>
        <form id="form">
        <div class="approved-body">
            <div class="approved-body-row bd-bottom-1 sendCarType">
                <div class="approved-body-warp">
                    就餐类别：
                    <span class="approved-body-info">
                    <div class="selectWrap">
                        <select id="sendCarType" class="" name="" v-model="workLunchTypeVal">
                            <option v-for="type in workLunchTypeArr" :value="type.stand_id">{{type.stand_name}}</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                    </span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarType">
                <div class="approved-body-warp">
                    临时卡号：
                    <span class="approved-body-info">
                    <div class="selectWrap">
                        <select id="sendCarType" class="" name="" v-model="temporaryCardVal">
                            <option v-for="card in temporaryCardArr" :value="card">{{card.rsbh}}</option>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                    </span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">临时卡名称：
                    <span class="approved-body-info">
                        {{temporaryCardVal.rs_name}}
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">来宾单位：
                    <label class="inputLabel" for="guest">
                    <span class="approved-body-info">
                        <input type="text" id="guest" name="" v-model="guest">
                    </span>
                    <span class="cue">请输入来宾单位*必填</span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">用餐人数：
                    <label class="inputLabel" for="staff_cnt">
                    <span class="approved-body-info">
                        <input autocomplete="off" type="number" id="staff_cnt" name="" v-model="staff_cnt">
                    </span>
                    <span class="cue">请输入用餐人数*必填</span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarDate">
                <div class="approved-body-warp">
                    用餐开始时间：
                    <label class="inputLabel" for="startTime">
                    <span class="approved-body-info">
                        {{dinner_time}}
                        <input type="date" id="startTime" name="startTime"  v-model="dinner_time">
                    </span>
                    <span class="cue">*必填</span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 sendCarDate">
                <div class="approved-body-warp">
                    用餐结束时间：
                    <label class="inputLabel" for="endTime">
                    <span class="approved-body-info">
                        {{dinner_time_end}}<input type="date" id="endTime" name="endTime"  v-model="dinner_time_end">
                    </span>
                    <span class="cue">*必填</span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">餐票：
                    <label class="inputLabel" for="director">
                    <span class="approved-body-info">
                        <input type="number" id="director" name="" v-model="director">
                    </span>
                    <span class="cue">*必填</span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">餐票明细：
                    <label class="inputLabel" for="print_memo">
                    <span class="approved-body-info">
                        <input type="text" name="" id="print_memo" v-model="print_memo">
                    </span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">备注：
                    <label class="inputLabel" for="tra_memo">
                    <span class="approved-body-info">
                        <input type="text" name="" id="tra_memo" v-model="tra_memo">
                    </span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1 approvalProcess">
                <div class="approved-body-warp">审批流程：
                    <span class="approved-body-info">
                        <span class="approver">{{name}}</span>
                        <i></i>
                        <span class="approver">雄辉</span>
                    </span>
                </div>
            </div>
            <div class="submit" @click="submit()">提交</div>
        </div>
        </form>
    </div>
</template>
<script>
    import { WlHttp } from '@/api/workLunchHttp';
    import { Toast,Indicator } from 'mint-ui';
    export default {
        name: 'workLunchApply',
        data(){
            return {
                name:getUserInfo().name, //申请人
                staff_num:getUserInfo().staff_num, //职工id
                dept_name:getUserInfo().dept_name, //部门名称
                dept_num:getUserInfo().dept_num, //部门id
                apply_time:'', //申请时间
                apply_state:'未提交', //单据状态
                workLunchTypeArr:[{stand_id:'',stand_name:'请选择'}],
                workLunchTypeVal:'', //工作餐类别
                temporaryCardArr:[{rsbh:'请选择',rs_name:''}],
                temporaryCardVal:{rsbh:'请选择',rs_name:''}, // 临时卡号和名称
                guest:'',  //来宾单位
                staff_cnt:'', //用餐人数
                dinner_time:'', //用餐开始时间
                dinner_time_end:'', //用餐结束时间
                director:'', //餐票数
                print_memo:'',  //用餐明细
                tra_memo:'',  //备注
                veriMark:true
            }
        },
        mounted(){
        },
        activated(){
            Object.assign(this.$data, this.$options.data())
            this.getWorkLunchType();
            this.getTemporaryCard();
            this.apply_time = this.dinner_time = this.dinner_time_end = this.getCurrentDate()
        },
        methods:{
            getCurrentDate:function() {
                var D = new Date(),
                    y = D.getFullYear(),m = (D.getMonth()+1),d = D.getDate();
                function zerofill(num) {
                    return num > 9 ? num : '0'+ num;
                }
                return y + '-' + zerofill(m) + '-' + zerofill(d);
            },
            getWorkLunchType:function() {
                WlHttp.getWorkLunchType().then((res)=>{
                    if (res.code=='1') {
                        this.workLunchTypeArr = this.workLunchTypeArr.concat(res.data);
                    }
                });
            },
            getTemporaryCard:function() {
                let params = {dept_num:this.dept_num};
                WlHttp.getTemporaryCard(params).then((res)=>{
                    if (res.code=='1') {
                        this.temporaryCardArr = this.temporaryCardArr.concat(res.data);
                    }
                });
            },
            verification:function(obj) {
                let tipsObj = {
                    stand_id:'请选择就餐类别',dept_id:'部门id不存在',staff_num:'申请人id不存在',apply_time:'申请日期不存在',
                    dinner_time:'请选择用餐开始时间',dinner_time_end:'请选择用餐结束时间',guest:'请输入来宾单位',staff_cnt:'请输入用餐人数',
                    director:'请输入餐票数',rsbh:'请选择临时卡号',rs_name:'请选择临时卡号'
                }
                let pass = true;
                for (let i in obj) {
                    let tips = tipsObj[i];
                    if (tips) {
                        if (obj[i] == '' || obj[i] == '请选择') {
                            Toast(tips);
                            pass = false;
                            return false;
                        }
                    }
                }
                return pass;
            },
            submit:function() {
                let params = {
                    dept_id:this.dept_num,
                    staff_num:this.staff_num,
                    apply_time:this.apply_time,
                    stand_id:this.workLunchTypeVal,
                    rsbh:this.temporaryCardVal.rsbh,
                    rs_name:this.temporaryCardVal.rs_name,
                    dinner_time:this.dinner_time,
                    dinner_time_end:this.dinner_time_end,
                    guest:this.guest,
                    staff_cnt:this.staff_cnt,
                    director:this.director,
                    print_memo:this.print_memo,
                    tra_memo:this.tra_memo
                }

                if (!this.verification(params)) {return false;}
                Indicator.open();
                WlHttp.submit(params).then((res)=>{
                    if (res.code=='1') {
                        Toast('提交成功');
                    }else{
                        Toast('提交失败');
                    }
                    Indicator.close();
                });
            }
        }
    }
</script>
<style lang="css" scoped>
    .approved-body-warp {
        display: flex;
        align-items: center;
        line-height: 30px;
        overflow: hidden;
    }
    .approved-body-warp .inputLabel {
        flex: 1;
        display: flex;
    }
    .approved-body-info {
        flex: 1;
    }
    .approved-body-info input {
        width: 100%;
    }
    .route {
        width: 1.2rem;
        border-radius: 5px;
        padding: 0 0.1rem;
        border: 1px solid #3497f5;
    }
    .sendCarType .selectWrap {
        margin-right: 0;
        width: 100%;
    }
    .sendCarType #rideNum {
        width: 0.5rem;
    }
    .sendCarDate #sendCarDateLable {
        color: #999;
    }
    .sendCarDate input[type="date"] {
        width: 0;
        height: 0;
    }
    .aboard-place-box {
        display: flex;
    }
    .aboard-place-wrap {
        flex: 1;
    }
    .checkbox-box {
        display: flex;
    }
    .passenger-name .aboard-place-text{
        line-height: 30px;
    }
    .passenger-name input[type="text"] {
        margin-left: 10px;
    }
    .checkbox-box .checkbox-label {
        flex: 1;
    }
    .remarks input[type="text"] {
        width: 80%;
    }
</style>
