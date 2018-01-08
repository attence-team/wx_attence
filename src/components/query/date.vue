<template>
    <div class="time-text">
        <input type="date" v-model="input">
        {{input}}
        <i class="iconfont icon-ext"></i>
    </div>
</template>
<script>
    export default {
        name: 'date',
        data(){
            return {
                input: new Date().Format2String('yyyy-MM-dd')
            }
        },
        filters: {

        },
        watch:{
            input(curVal,oldVal){
                this.time = curVal;

            }
        },
        mounted(){

        },
        methods:{
            curMonth(){
                this.input = new Date().Format2String('yyyy-MM-dd');
            }
        }
    }
</script>
<style lang="css" scoped>
    .time-text{
        position: relative;
        display: inline-block;
        text-align: center;
        color: #333;
        width: 2.3rem;
        height: .8rem;
    }
    .time-text input{
        position: absolute;
        left: 0;
        top: 0;
        width: 2.2rem;
        opacity: 0;
        z-index: 10;
        display: block;
    }
    .time-text .select{
        position: absolute;
        right: 0;
        top: 0;
        display: block;
        height: .8rem;
    }

    .icon-ext{
        width: .4rem;
        height: .4rem;
        position: absolute;
        top: .15rem;
        right: 0;
        background: url("../../assets/img/icon-date.png") no-repeat 0 0;
        background-size: cover;
    }
    /*.iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        width: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .icon-date{
        width: 0;
        height: 0;
        border-width: 13px 8px 13px 8px;
        border-style: solid;
        border-color: #999 #fff #fff #fff;
        position: absolute;
        top: .23rem;
        right: 0;
    }
    .icon-date:hover{
        border-color: #666 #fff #fff #fff;
    }*/

</style>
