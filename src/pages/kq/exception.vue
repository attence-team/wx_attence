<template>
    <!--异常处理-->
    <div class="body-box">
        <div class="tool">
            <div class="time-box">
                <span>2017年</span>
                <span>
                    <div class="rect-icon fl"><i class="iconfont icon-fanhui"></i></div>
                    <div class="time-text fl">11-01 - 11-30</div>
                    <div class="rect-icon fl"><i class="iconfont icon-fanhui right-arrow"></i></div>
                </span>
                <span>返回当月</span>
            </div>
        </div>
        <div class="exp-box table-box touch-scroll">
            <div class="info">
                <div class="fl text-over clearfix">部门：<span>***部</span></div>
                <div class="fr text-over">请假人姓名：<span>***部</span></div>
            </div>
            <div class="table-list">
                <div class="table-row table-title bd-bottom-1">
                    <span>日期</span>
                    <span>星期</span>
                    <span>刷卡时间</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
                <div class="table-row bd-bottom-1">
                    <i class="point"></i>
                    <span>2017-08-09</span>
                    <span>星期三</span>
                    <span>11:40:30</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'exception'
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

</style>
