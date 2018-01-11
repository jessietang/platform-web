<template lang="html">
  <div class="input-text">
    <el-form-item :label="labelVal">
      <el-input v-model="inputVal"></el-input>
    </el-form-item>
    <p>{{inputVal}}</p>
  </div>
</template>
<script lang="babel">
    export default {
      name: 'inputText',
      data () {
        return {
          inputVal: this.inputValue,
          labelVal: this.labelName || '车牌号'
        }
      },
      props: ['labelName', 'inputValue']
    }
</script>
<style lang="scss" scoped="" type="text/css">
</style>
