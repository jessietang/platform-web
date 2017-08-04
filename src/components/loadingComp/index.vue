<template lang="html">
  <div id="page-loading">
    <img src="../../../static/img/loading.gif" />
    <p class="loading-tip">{{loadingTip}}</p>
  </div>
</template>
<script lang="babel">
    export default {
      name: 'loadingComp',
      data () {
        return {

        }
      },
      props: ['loadingTip']
    }
</script>
<style lang="scss" scoped="" type="text/css">
  #page-loading {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height: calc(100% - 1.33333rem);
    z-index:99999;
    background: rgba(0,0,0,0.3);
  }
  #page-loading img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top:-8px;
    margin-left:-8px;
  }

  .loading-tip {
    position: absolute;
    top: 60%;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
</style>
