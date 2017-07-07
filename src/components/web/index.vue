<template lang="html">
    <div id="web">
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <navBar></navBar>
    </div>
</template>
<script lang="babel">
  import navBar from '../navBar/navBar'
  export default {
    name: 'web',
    components: {
      navBar
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">

  #web {
    width: 100%;
    height: calc(100% - 1.333333rem);
  }
</style>
