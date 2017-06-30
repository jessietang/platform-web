<template>
  <div class="hello">
    <h2 class="h2">hello jessie!</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
  .hello {
    .h2 {
      width: 200px;
      height: 20px;
      margin: 100px auto;
      border-radius: 5px;
      border: 1px solid red;
    }
  }

</style>
