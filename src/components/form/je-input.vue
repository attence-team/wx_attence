<template>
  <div :class="{'je-input':true,'no-title':title==''}">
     <input v-if="disabled==='true'" disabled :type="type" v-model="val" :placeholder="placeholder" />
    <input v-else :type="type" v-model="val"  :placeholder="placeholder" />
     <i></i>
     <span>{{title}}</span>
  </div>
</template>
<script>
  export default {
    name: 'je-input',
    data(){
      return {
        val:'',
      }
    },
    props: {
        title: {
           type: String,
           default: ''
        },
        value: {
           default: ''
        },
        type:{
           type: String,
           default: 'text'
        },
        placeholder:{
           type: String,
           default: ''
        },
        disabled:{
          type: String,
          default: 'false'
        }
    },
    watch:{
        val(newVal){
            if(this.type=='number'){
                newVal = newVal.toString().replace(/[^0-9]/g,'');
            }
            this.$emit('input', newVal);
        },
        value(newVal){
            this.val = newVal;
        }
    },
    mounted(){
       this.val = this.type=='date'?new Date().Format2String('yyyy-MM-dd'):'';
    }
  }
</script>
<style lang="css" scoped>
  .je-input{
     position: relative;
     display: inline-block;
     width: 100%;
     min-height: 0.9rem;
     color: #333333;
     font-size: 16px;
  }
  .no-title.je-input{
    min-height: 0.4rem;
  }
  .je-input:before{
    content: "";
    position: absolute;
    left: 0;  right: 0;
    bottom: 0;
    border-bottom: 1px solid #dddddd;
    transform: scaleY(.5);
    -webkit-transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
  }
  .je-input input{
     width: 100%;
     height: auto;
     margin-top: 0.5rem;
     line-height: normal;
     border-radius: 0;
     color: #333;
     padding: 6px 8px 8px 0;
  }
  .no-title input{
    margin-top: 0;
  }
  .je-input input + i{
    display: block;
    position: relative;
    top: -1px;
    width: 0;
    height: 1px;
    background-color: #6179d1;
  }
  .je-input input + i + span {
      display: block;
      position: absolute;
      height: 0.5rem;
      line-height: 0.5rem;
      top: 0;
      left: 0;
      font-size: 16px;
  }
  @media screen and (min-width: 300px) and (max-width: 360px) {
      .je-input input + i + span {
          font-size: 14px;
      }
      .je-input input{
          font-size: 14px;
      }
  }
  .je-input input:focus + i{
    transition: width 1s;
    width: 100%;
  }
  .je-input input:focus + i + span{
     color: #6179d1;
  }
</style>
