<template>
  <div class="x6-tree-body" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <span>商品类型</span>
    <el-cascader
      ref="cascader"
      :options="treeData"
      :props="{ multiple: true }"
      :show-all-levels="false"
      :collapse-tags="true"
      @change="handlerChange">
      <template slot-scope="{ node, data }">
        <span style="font-size: 12px;">{{ data.name }}</span>
      </template>
    </el-cascader>
    <div class="x6-tree-icon">
      <i :class="setIcon" @click="doIconClick"></i>
    </div>
  </div>
</template>
<script>
import TreeMixins from '../mixins'
export default {
  name: 'TreeSplx',
  data () {
    return {
      treeData: [],
    }
  },
  mixins: [TreeMixins],
  props: ['value'],
  mounted () {
    this.treeData = this.$util.getCacheTreeData('splxlist')
  },
  methods: {
    
  }
}
</script>
<style scoped>
.x6-select-tree{
  display: inline-flex;
  position: relative;
}
.x6-select-tree_warp{
  flex-grow: 1;
  position: relative;
}
.x6-select-tree_warp .el-input__icon{
  position: absolute;
  right: 5px;
  top: -3px;
  cursor: pointer;
}
.x6-select-inner{
  min-width: 200px;
  -webkit-appearance: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #c0c4cc;
  display: inline-block;
  font-size: inherit;
  outline: 0;
  padding: 0 15px;
  width: 100%;
  height: 32px;
  line-height: 30px;
  padding-right: 30px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  cursor: pointer;
}
.x6-select-inner_deep{
  color: #606266;
}
.x6-select-inner:hover{
  border-color: #b9b9b9;
}
.x6-select-inner_active{
  border-color: #409eff !important;
}
.x6-tree-icon{
  position: absolute;
  right: 5px;
  width: 20px;
  height: 20px;
  background: #fff;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
  color: #999;
}
</style>
