<template>
  <div class="x6-tree">
    <component
      ref="tree"
      :width="width"
      :value="val"
      :is="`tree-${type}`"
      @change="handlerTreeChecked"></component>
  </div>
</template>
<script>
import { props } from './props'
import TreeGs from './gs/index'
import TreeSp from './sp/index'
import TreeSplx from './splx/index'
export default {
  name: 'XTree',
  props,
  components: { TreeGs, TreeSp, TreeSplx },
  data () {
    return {
      val: this.value,
    }
  },
  methods: {
    handlerTreeChecked (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style scoped>

</style>