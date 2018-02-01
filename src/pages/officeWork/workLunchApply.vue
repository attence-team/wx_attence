<template>
    <div class="body-box scroll">
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
                        <select class="" name="" v-model="workLunchTypeVal">
                          <template v-for="type in workLunchTypeArr">
                            <option :value="type.stand_id">{{type.stand_name}}</option>
                          </template>
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
                        <select v-model="temporaryCardVal">
                            <template v-for="card in temporaryCardArr">
                              <option :value="card.rsbh">{{card.rsbh}}</option>
                            </template>
                        </select>
                        <div class="selectBtn"></div>
                    </div>
                    </span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">临时卡名称：
                    <span class="approved-body-info">
                        {{temporaryCardName}}
                    </span>
                    <span class="cue">*必填</span>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">来宾单位：
                    <label class="inputLabel" for="guest">
                    <span class="approved-body-info">
                        <input type="text" id="guest" name="" v-model="info.guest">
                    </span>
                    <span class="cue">请输入来宾单位*必填</span>
                    </label>
                </div>
            </div>
            <div class="approved-body-row bd-bottom-1">
                <div class="approved-body-warp">用餐人数：
                    <label class="inputLabel" for="staff_cnt">
                    <span class="approved-body-info">
                        <input autocomplete="off" type="number" id="staff_cnt" name="" v-model="info.staff_cnt">
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
                        {{info.dinner_time}}
                        <input type="date"  name="startTime"  v-model="info.dinner_time">
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
                        {{info.dinner_time_end}}<input type="date" name="endTime"  v-model="info.dinner_time_end">
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
                temporaryCardVal:'', // 临时卡号
                temporaryCardName:'', // 临时卡号名称
                guest:'',  //来宾单位
                staff_cnt:'', //用餐人数
                dinner_time:'', //用餐开始时间
                dinner_time_end:'', //用餐结束时间
                director:'', //餐票数
                print_memo:'',  //用餐明细
                tra_memo:'',  //备注
                veriMark:true,
                info:{}
            }
        },
        filters: {
          filterCard(value) {
              if(typeof value !== 'string') return;
              console.log(value);
              return '你好'
            }
        },
      watch:{
        temporaryCardVal(n,o){
            if(!n) return;
            for(let i=0;i<this.temporaryCardArr.length;i++){
              if(n==this.temporaryCardArr[i].rsbh){
                this.temporaryCardName = this.temporaryCardArr[i].rs_name;
                break;
              }
            }
        }
      },
      activated(){
            Object.assign(this.$data, this.$options.data());
            this.apply_time = this.info.dinner_time = this.info.dinner_time_end = this.getCurrentDate();
            if(this.$route.query.id){
              this.queryLunchDetail(()=>{
                this.getWorkLunchType();
                this.getTemporaryCard();
              });
            }else{
              this.getWorkLunchType();
              this.getTemporaryCard();
            }

            setTitle('工作餐申请');
        },
        methods:{
            queryLunchDetail(callBackFn){
               WlHttp.getWorkLunchDetails({
                  dinner_id:this.$route.query.id
               }).then((res)=>{
                  this.info = res.data;
                  if(callBackFn){
                    callBackFn();
                  }
               })
            },
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
                        for(let i=0;i<res.data.length;i++){
                          if(this.info.stand_name == res.data[i].stand_name){
                            this.workLunchTypeVal = res.data[i].stand_id;
                          }
                        }
                        this.workLunchTypeArr = this.workLunchTypeArr.concat(res.data);
                    }
                });
            },
            getTemporaryCard:function() {
                let params = {dept_num:this.dept_num};
                WlHttp.getTemporaryCard(params).then((res)=>{
                    if (res.code=='1') {
                        for(let i=0;i<res.data.length;i++){
                          if(this.info.rs_name == res.data[i].rs_name){
                            this.temporaryCardVal = res.data[i].rsbh;
                          }
                        }
                        console.log(this.temporaryCardVal)
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
                    rsbh:this.temporaryCardVal,
                    rs_name:this.temporaryCardName,
                    dinner_time:this.dinner_time,
                    dinner_time_end:this.dinner_time_end,
                    guest:this.info.guest,
                    staff_cnt:this.info.staff_cnt,
                    director:this.director,
                    print_memo:this.print_memo,
                    tra_memo:this.tra_memo
                };
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
        position: relative;
    }
    .approved-body-info {
        flex: 1;
        color: #999;
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
      position: absolute;
      width: 100%;
      height: 60px;
      top: 0;
      left: 0;
      opacity: 0;
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
