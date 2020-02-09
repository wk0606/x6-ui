<template>
  <div>
    <template v-for="item in data">
      <div class="x6-suggestion_node" :key="`${item.id}-1`">
        <div class="x6-suggestion_text" :style="{'padding-left': `${item.cj * 10}px`}" @click="expansionNode(item)">
          <div>
            <i class="el-icon-caret-right" :class="{'i-reverse': item.open}" :style="{'opacity': item.children ? 1 : 0}"/>
            <span>{{ item.name }}</span>
          </div>
          <el-checkbox v-model="item.checked" @change="handlerChecked(item)"/>
        </div>
        <el-collapse-transition>
          <div class="x6-suggestion_group" v-show="item.children && item.open">
            <suggestion-item :data="item.children" @change="onHandler"/>
          </div>
        </el-collapse-transition>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SuggestionItem',
  props: ['data'],
  methods: {
    expansionNode (node) {
      node.open = !node.open
    },
    handlerChecked (node) {
      this.$emit('change', node)
    },
    onHandler (node) {
      this.$emit('change', node)
    }
  }
}
</script>
<style lang="css" scoped>
.x6-suggestion_node{
  min-width: 200px;
}
.x6-suggestion_text{
  box-sizing: border-box;
  padding: 10px 15px 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
}
.x6-suggestion_text:hover{
  background: #f2f2f2;
  cursor: pointer;
}
.x6-suggestion_text span{
  white-space: nowrap;
}
.el-checkbox{
  margin-left: 20px;
}
.i-reverse{
  transform: rotateZ(90deg);
}
</style>