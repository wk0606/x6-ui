<template>
  <div class="x6-tree-node">
    dsd
  </div>
</template>
<script>
export default {
  name: 'SuggestionItem',
  props: ['data'],
  methods: {
    expansionNode (node) {
      node.show = !node.show
    }
  }
}
</script>
<style lang="css" scoped>
.x6-tree-content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  padding-right: 15px;
  position: relative;
}
.x6-tree-content i{
  transition: all .3s;
}
.i-reverse{
  transform: rotateZ(90deg);
}
.x6-tree-content:hover{
  background: #e8e8e8;
  color: #333;
}
.x6-tree-content div{
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.x6-tree-content div span{
  white-space: nowrap;
}
.x6-tree-child::before{
  content: '';
  position: absolute;
  left: 15px;
  width: 1px;
  height: 200%;
  top: -25px;
  border-left: 1px #ccc dashed;
  transform: scale(0.5)
}
.x6-tree-line{
  height: 1px;
  border-top: 1px #ccc dashed;
  position: absolute;
  top: 14px;
  left: 15px;
}
.x6-tree-checked{
  background: #6281a0;
  color: #fff;
}
</style>