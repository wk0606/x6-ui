<template>
  <div class="x6-select">
    <component
      class="x6-select-content"
      :is="`select-${type}`"
      :addable="addable"
      :disabled="disabled"
      :editable="editable"
      :lazyload="lazyload"
      :ys="ys"
      :showYe="true">
      <div class="x6-select-add" v-if="addable" @click="addMethod">
        <i class="el-icon-plus"></i>
        <span>新增</span>
      </div>
    </component>
    <i :class="icon" @click="iconMethod"/>
  </div>
</template>
<script>
import { props } from './props'
import SelectGys from './gys/index'
export default {
  name: "XSelect",
  props,
  components: {
    SelectGys
  },
  methods: {
    iconMethod() {
      this.$message.success('放大镜')
    },
    addMethod() {
      this.$message.success('你点击了添加')
    }
  }
}
</script>
<style lang="css">
.x6-select{
  display: inline-flex;
  position: relative;
}
.x6-select>i{
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #999;
}
.x6-select>i:hover{
  color: #409eff;
}
.x6-select-add{
  cursor: pointer;
  text-align: center;
  font-size: 1.2rem;
  padding: 1rem 0 1rem 0;
  border-top: 1px solid #f2f2f2;
  margin-bottom: -6px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #999;
}
.x6-select-add:hover{
  color: #fff;
  background: #409eff;
}
.x6-select-content{
  display: inline-flex;
  align-items: center;
}
.x6-select-content > span {
  font-size: 1.2rem;
  margin-right: 5px;
}
</style>