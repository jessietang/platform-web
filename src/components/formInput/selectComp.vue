<template lang="html">
    <div class="select-comp">
      <el-form-item :label="labelVal">
        <!--:placeholder="labelVal"-->
        <el-select v-model="selectVal" :multiple="isMultipleParam">
          <el-option v-for="option in selectOptions" :label="option.label" :value="option.value" :key="option.value"></el-option>
        </el-select>
      </el-form-item>
    </div>
</template>
<script lang="babel">
    export default {
      name: 'selectComp',
      data () {
        return {
          selectVal: this.selectValue,
          selectOptions: this.options || [
            {label: '黄', value: 2},
            {label: '蓝', value: 1},
            {label: '白', value: 4},
            {label: '黑', value: 3},
            {label: '其他', value: 9},
          ],
          labelVal: this.labelName || '车牌颜色',
          dbVal: 0,
          isMultipleParam: this.isMultiple || false
        }
      },
      methods: {
        getDbVal () {
          var count = 0;
          var arr = this.selectVal;
          console.log(arr);
          if (this.isMultipleParam) {
            if (arr && arr.length > 0) {
              for (var i=0; i<arr.length; i++) {
                count += parseInt(arr[i])
              }
            }
          } else {
            count = this.selectVal;
          }
          this.dbVal = count;
        }
      },
      props: ['options','selectValue','labelName', 'isMultiple'],
      watch: {
        selectVal(newVal, oldVal){
          var _this = this;
          _this.getDbVal();
          _this.$emit('updateSelectVal', newVal, _this.dbVal);
        }
      }
    }
</script>
<style lang="scss" scoped="" type="text/css">
</style>
