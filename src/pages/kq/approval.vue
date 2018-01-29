<template>
    <div class="body-box">
        <div class="tab-box">
            <div class="tap-wrap" :class="{selected:tabSelected==0}" @click="tabChange(0);">
                <div class="tap-btn">待我审批的（{{nnapprovedNum}}）</div>
            </div>
            <i></i>
            <div class="tap-wrap" :class="{selected:tabSelected==1}" @click="tabChange(1);">
              <div class="tap-btn">我已审批的</div>
            </div>
        </div>
        <div class="approval">
            <div class="batch-approval">
                <span class="batch-approval-text">批量审批</span><mt-switch v-model="batchSwitch"></mt-switch>
            </div>
            <ul class="approval-list bd-top-1">
                <li class="approval-list-cell" v-for="item in listData">
                    <router-link :to="'approvalDetails?vou_id='+ item.vou_id +'&voc_cd='+ item.voc_cd">
                    <div class="approval-name">{{item.submit_staff_nm}}</div>
                    <div class="approval-info bd-bottom-1">
                        <p class="approval-title-date">
                            <span class="approval-title">{{item.submit_staff_nm + item.wait_tip}}</span><span class="approval-date">{{item.sumit_dt}}</span>
                        </p>
                        <p class="approval-state">{{item.finish_mark_nm}}</p>
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { appHttp } from '@/api/approval';
import { Indicator } from 'mint-ui';
export default {
    name: 'approval',
    data(){
        return {
            nnapprovedNum:5,
            tabSelected:0,
            batchSwitch:false,
            apiArr:['lywebservice/workflow/getTodoAudit','lywebservice/workflow/getMyAudited'],
            params:{
                staff_id:getUserInfo().staff_num,
                system_id:'',
                currPage:1,
                pageSize:20
            },
            listData:[]
        }
    },
    created(){
        this.params.system_id = this.$route.query.system_id;
        this.getApprovalList();
    },
    methods:{
        tabChange(index){
            this.tabSelected = index;
            this.getApprovalList();
        },
        getApprovalList(){
            Indicator.open();
            appHttp.getApprovalList(this.apiArr[this.tabSelected],this.params).then((res)=>{
                //console.log(res);
                if (res.code=='1') {
                    this.listData = res.data;
                }
                Indicator.close();
            });
        }
    }
}
</script>
<style media="screen" scoped>
    .approval-info .approval-title-date {
        display: block;
        margin-bottom: 0.3rem;
    }
</style>
