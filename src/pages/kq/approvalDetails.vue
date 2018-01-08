<template>
    <div class="body-box">
        <div class="approval-details-box">
            <ul class="approval-list">
                <li class="approval-list-cell">
                    <div class="approval-name">江楠</div>
                    <div class="approval-info">
                        <p class="approval-title-date">
                            <span class="approval-title">江楠的外出</span>
                        </p>
                        <p class="approval-state">待审批</p>
                    </div>
                </li>
            </ul>
            <div class="approval-details bd-top-1">
                <p>所在部门：<span>信息技术部</span></p>
                <p>请假类型：<span>外出</span></p>
                <p>开始时间：<span>2017-11-10 10:00</span></p>
                <p>结束时间：<span>2017-11-13 17:00</span></p>
                <p>免打卡次数：<span>32次</span></p>
                <p>请假天数：<span>8天</span></p>
                <p>请假事由：<span>家里有事，回老家</span></p>
            </div>
        </div>
        <div class="approval-details-list-box">
            <ul class="approval-details-list">
                <li class="approval-details-list-cell">
                    <div class="approval-name">江楠</div>
                    <div class="approval-title-date bd-bottom-1">
                        <span class="approval-title">发起申请</span>
                        <span class="approval-date">2017-11-12</span>
                    </div>
                </li>
                <li class="approval-details-list-cell">
                    <div class="approval-name unapproved">雄辉</div>
                    <div class="approval-title-date">
                        <span class="approval-title">未审批</span>
                        <span class="approval-date">2017-11-12</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="approval-btn-box">
            <div class="approval-btn agree">同意</div>
            <div class="approval-btn return">退回</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'approval',
    data(){
        return {
        }
    },
    created(){
    },
    methods:{
        tabBtn:function(index) {
            this.tabSelected = index;
        }
    }
}
</script>
<style lang="css" scoped>
.approval-list {
    border: 0;
    margin: 0;
    background-color: #fff;
}
.approval-details-box,.approval-details-list-box {
    padding: 0 0.3rem;
    border-top: 0;
    background-color: #fff;
}
.approval-details-box .approval-list-cell {
    padding: 0.25rem 0;
    display: flex;
    align-items: center;
}
.approval-details-box .approval-info {
    margin: 0;
    padding: 0;
    margin-left: 0.3rem;
}
.approval-details-box .approval-name {
    margin-top: 0;
}
.approval-details {
    padding: 0.5rem 0 0.5rem 1.7rem
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
}

.approval-list-box .approval-title-date {
    margin-bottom: 0;
}
.approval-details-list {
    margin: 0.25rem 0;
    background-color: #fff;
}
.approval-details-list .approval-details-list-cell {
    height: 1.6rem;
    line-height: 1.6rem;
    display: flex;
    align-items: center;
}
.approval-details-list-cell span {
    display: inline-block;
    vertical-align: middle;
}
.approval-details-list-cell .approval-name {
    color: #fff;
    width: 1.2rem;
    height: 1.2rem;
    font-size: 16px;
    line-height: 1.2rem;
    text-align: center;
    border-radius: 100%;
    background-color: #6eb4f6;
}
.approval-details-list-cell .unapproved {
    background-color: #fea558;
}
.approval-details-list-cell .approval-title-date {
    flex: 1;
    font-size: 0;
    margin-left: 0.3rem;
}
.approval-details-list-cell:last-child .approval-title-date {
    border-bottom: 0;
}
.approval-details-list-cell .approval-title {
    color: #333;
    font-size: 16px;
}
.approval-details-list-cell .approval-date {
    color: #666;
    float: right;
    font-size: 15px;
}
.approval-btn-box {
    padding: 30px 0;
    text-align: center;
    background-color: #fff;
}
.approval-btn-box .approval-btn {
    color: #fff;
    height: 42px;
    line-height: 42px;
    width: 2.2rem;
    margin: 0 0.6rem;
    border-radius: 5px;
    font-size: 16px;
    display: inline-block;
}
.agree {
    background-color: #11bf84;
}
.return {
    background-color: #aaaaaa;
}
</style>
