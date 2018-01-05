<template>
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
</template>
<script>
    export default {
        name: 'table-cell'
    }
</script>
<style lang="css" scoped>
    .table-list{
        margin-bottom: 1rem;
    }
    .table-title{
        background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#d7eafd), to(#feffff));
    }
    .table-title span{
        color: #333;
        font-weight: bold;
    }
    .table-row{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
    }
    .table-row span{
        flex: 1;
        text-align: center;
        color: #999;
    }
    .table-row .point{
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #ff8922;
    }
</style>
