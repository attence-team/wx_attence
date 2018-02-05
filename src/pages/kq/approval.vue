<template>
    <div class="body-box">
        <div class="tab-box">
            <div class="tap-wrap" :class="{selected:tabSelected==0}" @click="tabChange(0);">
                <div class="tap-btn">待我审批的<span v-if="listData.length > 0">（{{approvedNum}}）</span></div>
            </div>
            <i></i>
            <div class="tap-wrap" :class="{selected:tabSelected==1}" @click="tabChange(1);">
              <div class="tap-btn">我已审批的</div>
            </div>
        </div>
        <div class="approval">
            <div class="batch-approval " v-if="tabSelected==0">
                <span class="allSelect" v-if="batchSwitch" @click="allSelect();"><span v-if="!checkAll">全选</span><span v-if="checkAll">取消</span></span><span class="batch-approval-text" >批量审批</span><mt-switch v-model="batchSwitch"></mt-switch>
            </div>
            <div class="approval-btn-box" v-if="batchSwitch">
                <div class="approval-btn agree" @click='approveClk(1)' >同意</div>
            </div>
            <div class="loadmore-box scroll bd-top-1" :class="{'h-1rem':tabSelected==0}">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
                 <ul class="approval-list">
                     <div v-if="listData.length<=0" class="noneData">暂无数据</div>
                     <li class="approval-list-cell checkbox-box" :class="{select:batchSwitch}" v-for="item in listData">
                         <label :for="item.vou_id" v-if="batchSwitch"><input type="checkbox" v-model='item.checked' :id="item.vou_id"><i class="checkbox-btn"></i></label>
                        <a href="javascript:;" @click="toPage(item)">
                         <div class="approval-name" :class="{appOver:tabSelected==1}">{{item.submit_staff_nm}}</div>
                         <div class="approval-info bd-bottom-1">
                             <p class="approval-title-date">
                                 <span class="approval-title">{{item.submit_staff_nm + item.wait_tip}}</span><span class="approval-date"  v-if="tabSelected==0">{{item.sumit_dt}}</span>
                             </p>
                             <p class="approval-start-date" v-if="tabSelected==1">申请时间：{{item.submit_dt}}</p>
                             <p class="approval-start-date" v-if="tabSelected==1">审批时间：{{item.verify_dtt}}</p>
                             <p class="approval-state">{{item.finish_mark_nm || item.verify_mark}}</p>
                         </div>
                        </a>
                     </li>
                 </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import { appHttp } from '@/api/approval';
import { WlHttp } from '@/api/workLunchHttp';
import { Indicator , Loadmore , Toast} from 'mint-ui';
export default {
    name: 'approval',
    components:{Indicator , Loadmore},
    data(){
        return {
            approvedNum:0,
            tabSelected:0,
            checkAll:false,
            batchSwitch:false,
            apiArr:['lywebservice/workflow/getTodoAudit','lywebservice/workflow/getMyAudited'],
            params:{
                staff_id:getUserInfo().staff_num,
                system_id:'',
                currPage:1,
                pageSize:20
            },
            listData:[],
            allLoaded:false
        }
    },
    activated(){
        setTitle('待办工作');
        this.params.system_id = this.$route.query.system_id;
        this.getApprovalList(true);
    },
    methods:{
        toPage(item){
            let url = 'approvalDetails?vou_id='+ item.vou_id +'&voc_cd='+ item.voc_cd +'&name='+ item.submit_staff_nm +'&title='+ item.wait_tip  +'&state='+ (item.finish_mark_nm || item.verify_mark) + '&type='+ this.tabSelected;
            if (item.memo) {
                url += '&opinion='+ item.memo;
            }
            this.$router.push(url);
        },
        postion(){
          if(this.params.currPage===1){
            this.$nextTick(function() {
              var dom = document.getElementsByClassName('mint-loadmore');
              if(!dom) return;
              dom[0].parentNode.scrollTop = 0;
            })
          }
        },
        loadTop() {
            this.params.currPage = 1;
            this.allLoaded = false;
            this.$refs.loadmore.onTopLoaded();
            this.getApprovalList();
        },
        loadBottom() {
            this.params.currPage=this.params.currPage + 1;
            this.getApprovalList();
        },
        tabChange(index){
            if (index==1) {
                this.batchSwitch = false;
            }
            this.tabSelected = index;
            this.getApprovalList(true);
        },
        allSelect(){
            this.checkAll = !this.checkAll;
            this.listData.map((item)=>{
                item.checked = this.checkAll;
            })
        },
        getApprovalList(loding){
            if (loding) {
                this.listData = [];
                Indicator.open();
            }

            appHttp.getApprovalList(this.apiArr[this.tabSelected],this.params).then((res)=>{
                //console.log(res);
                if (res.code==1) {

                    if (this.tabSelected == 0) {
                        this.approvedNum = res.total;
                    }

                    res.data.map((item)=>{
                        item.checked = false;
                    })

                    if(this.params.currPage==1){
                        this.listData = [];
                        this.listData = res.data;
                    }else{
                        this.listData = this.listData.concat(res.data);
                    }

                    this.allLoaded = res.data.length < this.params.pageSize;
                    this.$refs.loadmore.onBottomLoaded();

                    this.postion();
                }
                Indicator.close();
            });
        },
        approveClk(type){
            let vou_ids = '';
            this.listData.map((item)=>{
                if (item.checked) {
                    if (vou_ids == '') {
                        vou_ids = item.vou_id
                    }else{
                        vou_ids += ',' + item.vou_id
                    }

                }
            })
            Indicator.open();
          // 审批标识（1同意 2退回）
           WlHttp.sendWorkLunchApprove({
              vou_ids:vou_ids,
              opinion:'同意',
              flag:type
           }).then((res)=>{
              if(res.code==1){
                Toast({
                  message: res.result,
                  iconClass: 'icon icon-success',
                  duration: 1500
                });
                this.getApprovalList();
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
<style media="screen" scoped>
    .loadmore-box {
        height: calc(100vh - 1.25rem);
        position: relative;
        background-color: #fff;
    }
    .h-1rem {
        height: calc(100vh - 2.25rem);
    }
    .approval {
        position: relative;
    }
    .approval-list {
        margin: 0;
    }
    .approval-list .approval-list-cell {
        padding: 0 0.25rem;
    }
    .approval-list-cell .approval-name {
        left: 0.25rem;
    }
    .appOver {
        top: 0.5rem;
        margin-top: 0;
    }
    .checkbox-box label {
        margin: 0;
        position: absolute;
        font-size: 0;
        top: 50%;
        margin-top: -0.125rem;
    }
    .approval-list .approval-list-cell .approval-info {
        padding: 0.3rem 0;
        margin-left: 0;
        padding-left: 1.2rem;
    }
    .approval-list .select  .approval-info {
        padding-left: 1.75rem !important;
    }
    .select .approval-name {
        left: 0.75rem;
    }
    .allSelect {
        float: left;
    }
    .approval-btn-box {
        position: absolute;
        bottom: 10%;
        width: 100%;
        text-align: center;
        z-index: 999;
    }
    .approval-btn {
        color: #fff;
        height: 35px;
        line-height: 35px;
        width: 2.2rem;
        margin: 0 0.6rem;
        border-radius: 5px;
        font-size: 14px;
        display: inline-block;
    }
    .agree {
        background-color: #11bf84;
        cursor: pointer;
        opacity: 0.6;
    }
</style>
