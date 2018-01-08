<template>
    <span class="wrap" v-on:click="setValue">{{text}}</span>
</template>
<script>
    export default {
        name: 'AmPm',
        data(){
            return {
                text: '上午'
            }
        },
        mounted(){

        },
        methods:{
            setValue() {
                if(this.text == '上午'){
                    this.text = '下午';
                }else{
                    this.text = '上午';
                }
            }
        }
    }
</script>
<style lang="css" scoped>
    .wrap{
        display: inline-block;
        font-size: .30rem;
        line-height: .8rem;
        color: #999;
    }
</style>
