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
            <div class="batch-approval bd-bottom-1">
                <span class="batch-approval-text">批量审批</span><mt-switch v-model="batchSwitch"></mt-switch>
            </div>
            <div class="loadmore-box scroll">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
                 <ul class="approval-list">
                     <div v-if="listData.length<=0" class="noneData">暂无数据</div>
                     <li class="approval-list-cell" v-for="item in listData">
                         <router-link :to="'approvalDetails?vou_id='+ item.vou_id +'&voc_cd='+ item.voc_cd +'&name='+ item.submit_staff_nm +'&title='+ item.wait_tip  +'&state='+ item.finish_mark_nm">
                         <div class="approval-name">{{item.submit_staff_nm}}</div>
                         <div class="approval-info bd-bottom-1">
                             <p class="approval-title-date">
                                 <span class="approval-title">{{item.submit_staff_nm + item.wait_tip}}</span><span class="approval-date">{{item.sumit_dt || item.verify_dtt}}</span>
                             </p>
                             <p class="approval-state">{{item.finish_mark_nm || item.verify_mark}}</p>
                         </div>
                         </router-link>
                     </li>
                 </ul>
                </mt-loadmore>
            </div>
        </div>
    </div>
</template>
<script>
import { appHttp } from '@/api/approval';
import { Indicator , Loadmore } from 'mint-ui';
export default {
    name: 'approval',
    components:{Indicator , Loadmore},
    data(){
        return {
            approvedNum:0,
            tabSelected:0,
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
    },
    created(){
        this.params.system_id = this.$route.query.system_id;
        this.getApprovalList();
    },
    methods:{
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
            this.tabSelected = index;
            this.getApprovalList();
        },
        getApprovalList(){
            //Indicator.open();
            appHttp.getApprovalList(this.apiArr[this.tabSelected],this.params).then((res)=>{
                //console.log(res);
                if (res.code==1) {

                    if (this.tabSelected == 0) {
                        this.approvedNum = res.total;
                    }
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
                //Indicator.close();
            });
        }
    }
}
</script>
<style media="screen" scoped>
    .loadmore-box {
        height: calc(100vh - 2.25rem - 2px);
    }
</style>
