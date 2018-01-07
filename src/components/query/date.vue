<template>
    <div class="time-text">
        <input type="date" v-model="input">
        {{input}}
        <i class="iconfont icon-fanhui right-arrow"></i>
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
        width: 2.2rem;
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
</style>
