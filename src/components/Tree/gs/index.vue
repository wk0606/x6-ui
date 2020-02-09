<template>
  <div class="x6-tree-body" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <span>公司</span>
    <el-cascader
      ref="cascader"
      :options="treeData"
      :props="{ multiple: true }"
      :show-all-levels="false"
      :collapse-tags="true"
      @change="handlerChange">
      <template slot-scope="{ node, data }">
        <span style="font-size: 12px;">{{ data.name }}</span>
        <span v-if="!node.isLeaf" style="font-size: 12px;"> ({{ data.children.length }}) </span>
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
  name: 'TreeGs',
  mixins: [TreeMixins],
  props: ['value'],
  data () {
    return {
      treeData: []
    }
  },
  mounted () {
    this.treeData = this.$util.getCacheTreeData('gslist')
  }
}
</script>
<style scoped>

</style>