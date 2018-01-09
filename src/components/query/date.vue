<template>
    <div class="time-text">
        <input type="date" v-model="input" @change="setDate">
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
                //this.time = curVal;
            }
        },
        mounted(){

        },
        methods:{
            curMonth(){
                this.input = new Date().Format2String('yyyy-MM-dd');
            },
            setDate(){
                this.$emit('setDate',new Date(this.input).Format2String('yyyyMMdd'));
            }
        }
    }
</script>
<style lang="css" scoped>
    .time-text{
        position: relative;
        display: inline-block;
        text-align: left;
        color: #999;
        width: 1.78rem;
        height: .8rem;
    }
    .time-text input{
        position: absolute;
        left: 0;
        top: 0;
        width: 1.78rem;
        opacity: 0;
        z-index: 10;
        display: block;
        height:.8rem;
    }
</style>
