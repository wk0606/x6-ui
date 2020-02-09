<template>
  <div class="x6-date">
    <span>{{ label || '日期' }}</span>
    <div class="x6-date-wrap">
      <div class="x6-flex-row x6-date-body" @click="visible = !visible">
        <i class="el-icon-date"></i>
        <span>{{ setDateText }}</span>
        <i class="el-icon-circle-close"></i>
      </div>
      <suggestion :visible.sync="visible" :type="type" :date="val" @change="handlerChange"/>
    </div>
    <!-- <el-date-picker
      v-model="val"
      :type="type"
      :placeholder="placeholder">
    </el-date-picker> -->
  </div>
</template>
<script>
import { props } from './props'
import Suggestion from './suggestion'
export default {
  name: 'XDate',
  props,
  data () {
    return {
      val: this.value,
      visible: false,
    }
  },
  components: { Suggestion },
  computed: {
    setDateText() {
      if (!this.val) {
        return this.placeholder
      } else if (this.type === 'year' || this.type === 'month') {
        return this.val
      } else if (this.type === 'season' || this.type === 'week') {
        return `${this.val[0]}至${this.val[1]}`
      }
    }
  },
  methods: {
    handlerChange(val) {
      this.val = val
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
<style scoped>
.x6-date{
  display: inline-flex;
  align-items: center;
}
.x6-date > span{
  margin-right: 5px;
  flex-shrink: 0;
}
.x6-date-wrap{
  position: relative;
}
.x6-date-body{
  min-width: 200px;
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  box-sizing: border-box;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  padding: 0 10px;
  user-select: none;
}
.x6-date-body:hover{
  border: 1px solid #606266;
}
.x6-date-body span{
  flex-grow: 1;
  margin: 0 5px;
  color: #999;
}
</style>