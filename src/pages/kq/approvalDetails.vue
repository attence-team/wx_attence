<template>
    <div class="body-box">
        <div class="approval-details-box">
            <ul class="approval-list">
                <li class="approval-list-cell">
                    <div class="approval-name">{{name}}</div>
                    <div class="approval-info">
                        <p class="approval-title-date">
                            <span class="approval-title">{{name + title}}</span>
                        </p>
                        <p class="approval-state">{{state}}</p>
                    </div>
                </li>
            </ul>
            <div class="approval-details bd-top-1">
                <p v-for="(val,key) in data">{{key}}：<span>{{val}}</span></p>
            </div>
        </div>
        <div class="approval-details-list-box">
            <ul class="approval-details-list">
                <li class="approval-details-list-cell" v-for="node in nodeArr">
                    <div class="approval-name unapproved">{{node.staff_name}}</div>
                    <div class="approval-title-date bd-top-1">
                        <span class="approval-title">{{node.state}}</span>
                        <span class="approval-date">{{node.audit_dt}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="state2=='0'">
            <div class="approval-details-opinion">
                <span>审批意见：</span>
                <textarea class="opinion" name="name" rows="8" cols="80" v-model="opinion"></textarea>
            </div>
            <div class="approval-btn-box">
                <div class="approval-btn agree" @click='approveClk(1)'>同意</div>
                <div class="approval-btn return" @click='approveClk(2)'>退回</div>
            </div>
        </div>
    </div>
</template>
<script>
import { appHttp } from '@/api/approval';
import { WlHttp } from '@/api/workLunchHttp';
import { Indicator,Toast} from 'mint-ui';
export default {
    name: 'approval',
    components:{Indicator},
    data(){
        return {
            name:'',
            title:'',
            state:'',
            state2:'',
            params:{
                vouty:'',
                vou_id:''
            },
            data:[],
            nodeArr:[],
            opinion:''
        }
    },
    activated(){
        setTitle('待办详情');

        this.name = this.$route.query.name;
        this.title = this.$route.query.title;
        this.state = this.$route.query.state;
        this.state2 = this.$route.query.state2;
        this.params.vouty = this.$route.query.voc_cd;
        this.params.vou_id = this.$route.query.vou_id;
        this.data = [];
        this.nodeArr = [];
        this.opinion = '';
        this.getDetails();
        this.getBillStatus();
    },
    methods:{
        getDetails() {
            Indicator.open();
            appHttp.getApprovalDetails(this.params).then((res)=>{
                //console.log(res);
                if (res.code=='1') {
                    this.data = res.data;
                }
                Indicator.close();
            });
        },
        getBillStatus(){
            appHttp.getBillStatus(this.params).then((res)=>{
                //console.log(res);
                if (res.code=='1') {
                    this.nodeArr = res.data;
                }
            });
        },
        approveClk(type){
            Indicator.open();
            let opinion = this.opinion;
            if (opinion=='') {
                opinion = type==1 ? '同意' : '退回';
            }
          // 审批标识（1同意 2退回）
           WlHttp.sendWorkLunchApprove({
              vou_ids:this.$route.query.vou_id,
              opinion:opinion,
              flag:type
           }).then((res)=>{
              if(res.code==1){
                Toast({
                  message: res.result,
                  iconClass: 'icon icon-success',
                  duration: 1500
                });
                setTimeout(()=>{
                    this.$router.goBack();
                },1500);
              }else{
                Toast({
                  message: res.result,
                  duration: 1500
                });
              }
              Indicator.close();
           });
        }
    }
}
</script>
<style lang="css" scoped>
.body-box {
    background-color: #fff;
}
.approval-list {
    border: 0;
    margin: 0;
    background-color: #fff;
}
.approval-details-box {
    padding: 0 0.25rem;
    border-top: 0;
    background-color: #fff;
}
.approval-details-list-box {
    padding: 0.25rem 0;
    border-top: 0;
    background-color: #f2f2f2;
}
.approval-details-box .approval-list-cell {
    padding: 0.25rem 0;
    /* display: flex; */
    /* align-items: center; */
}
.approval-details-box .approval-info {
    margin: 0;
    padding: 0;
    margin-left: 1.25rem;
}
.approval-details-box .approval-name {

}
.approval-details {
    padding: 0.45rem 0 0.45rem 1.25rem
}
.approval-details p {
    color: #999;
    font-size: 16px;
    margin-bottom: 0.3rem;
}
.approval-details p:last-child {
    margin-bottom: 0;
}
.approval-details p span {
    color: #333;
    line-height: 22px;
}

.approval-list-box .approval-title-date {
    margin-bottom: 0;
}
.approval-details-list {
    background-color: #fff;
}
.approval-details-list .approval-details-list-cell {
    height: 1.25rem;
    line-height: 1.25rem;
    display: flex;
    align-items: center;
}
.approval-details-list-cell span {
    display: inline-block;
    vertical-align: middle;
}
.approval-details-list-cell .approval-name {
    color: #fff;
    width: 1rem;
    height: 1rem;
    font-size: 14px;
    line-height: 1rem;
    text-align: center;
    border-radius: 100%;
    background-color: #6eb4f6;
    margin: 0 0.25rem;
}
.approval-details-list-cell .unapproved {
    background-color: #fea558;
}
.approval-details-list-cell .approval-title-date {
    flex: 1;
    font-size: 0;
    padding-right: 0.25rem;
}
.approval-details-list-cell:first-child .bd-top-1:after  {
    border-bottom: 0;
}
.approval-details-list-cell .approval-title {
    color: #333;
    font-size: 16px;
}
.approval-info .approval-title {
    width: auto;
}
.approval-details-list-cell .approval-date {
    color: #666;
    float: right;
    font-size: 15px;
}
.approval-btn-box {
    padding: 20px 0;
    text-align: center;
    background-color: #fff;
}
.approval-btn-box .approval-btn {
    color: #fff;
    height: 35px;
    line-height: 35px;
    width: 2.2rem;
    margin: 0 0.6rem;
    border-radius: 5px;
    font-size: 14px;
    display: inline-block;
}
.approval-details-opinion {
    color: #999;
    padding: 10px;
    background-color: #fff;
}
.opinion {
    color: #333;
    width: 100%;
    height: 70px;
    resize:none;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    border: 1px solid #dddddd;
}

.agree {
    background-color: #11bf84;
    cursor: pointer;
}
.return {
    background-color: #aaaaaa;
    cursor: pointer;
}
</style>
