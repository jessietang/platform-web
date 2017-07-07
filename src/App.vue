<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import navBar from './components/navBar/navBar'
  export default {
    name: 'app',
    components: {
      navBar
    }
  }
</script>

<style>

</style>
