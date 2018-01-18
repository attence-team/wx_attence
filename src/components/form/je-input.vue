<template>
  <div class="je-input">
     <input :type="type" :value="value" :placeholder="placeholder" />
     <i></i>
  </div>
</template>
<script>
  export default {
    name: 'table-cell',
    data(){
      return {
        val:''
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      type:{
        type: String,
        default: 'text' /* text,password,number,email,tel */
      },
      placeholder:{
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="css" scoped>
  .je-input{
     position: relative;
     display: inline-block;
     width: 100%;
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
     line-height: normal;
     border-radius: 0;
     color: #333;
     padding: 6px 8px 4px 8px;
  }
  .je-input input + i{
    display: block;
    position: relative;
    top: -1px;
    width: 0;
    height: 1px;
    background-color: #2097f3;
    box-shadow: 0 0 1px #fff;
  }
  .je-input input:focus + i{
    transition: width 1s;
    width: 100%;
  }
</style>
