<template>
  <div class="x6-tree-body">
    <span>商品</span>
    <div class="x6-select-tree_warp">
      <div class="x6-select-inner" :class="{'x6-select-inner_active': visible, 'x6-select-inner_deep': setLable}" @click.stop="toggleSuggestion">{{ setLable || '请选择商品' }}</div>
      <i class="el-input__icon" :class="setIcon" @click="doIconClick"></i>
      <el-collapse-transition>
        <suggestion v-show="visible" :visible.sync="visible" @change="handlerChange"/>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
import TreeMixins from '../mixins'
import suggestion from './suggestion'
export default {
  name: 'TreeSp',
  data () {
    return {
      val: {
        pp: '',
        spmc: '',
        ys: '',
        pz: ''
      },
      visible: false
    }
  },
  mixins: [TreeMixins],
  props: ['value'],
  components: { suggestion },
  computed: {
    setLable () {
      let label = []
      if (this.val.pp) {
        label.push(this.val.pp)
      }
      if (this.val.spmc) {
        label.push(this.val.spmc)
      }
      if (this.val.ys) {
        label.push(this.val.ys)
      }
      if (this.val.pz) {
        label.push(this.val.pz)
      }
      if (label.length)
      return label.join('/')
    }
  },
  methods: {
    handlerChange (item) {
      this.val = item
      this.visible = false
    }
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
