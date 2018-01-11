<template lang="html">
    <div class="date-picker">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </div>
    </div>
</template>
<script lang="babel">
    export default {
        name: 'datePicker',
        data () {
            return {
              pickerOptions0: {
                disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7;
                }
              },
              value1: this.dateValue
            }
        },
        props: ['dateValue', 'labelName']
    }
</script>
<style lang="scss" scoped="" type="text/css">
</style>
