<template>
  <div 
    class="x6-button"
    :class="{'x6-button-box': mode !== 'text', 'x6-button-text': mode === 'text', [`x6-button-${size}`]: mode === 'text' ? false : true, 'x6-button-box_disabled': mode !== 'text' && disabled !== false, 'x6-button-text_disabled': mode === 'text' && disabled !== false}"
    :style="{'background': mode !== 'text' ? background : '', 'color': mode === 'text' ? textColor : color}"
    @click="handlerClick"
    >
    <i v-if="!!setIcon && !loading" class="iconfont" :class="setIcon"></i>
    <i class="el-icon-loading" v-if="loading"></i>
    <span>{{ setLable }}</span>
  </div>
</template>
<script>
import { props } from './props'
export default {
  name: 'XButton',
  props,
  data () {
    return {
      labelMap: {
        'add': { text: '新增', icon: 'x6xinzeng' },
        'search': { text: '查询', icon: 'x6sousuo' },
        'print': { text: '打印', icon: 'x6dayin' },
        'export': { text: '导出', icon: 'x6daochu' },
        'del': { text: '删除', icon: 'x6shanchu' },
        'prev': { text: '上一条', icon: 'x6shangyitiao' },
        'next': { text: '下一条', icon: 'x6xiayitiao' },
        'save': { text: '保存', icon: 'x6baocun_mian' },
        'quote': { text: '引用', icon: 'x6yinyongfujian' },
      }
    }
  },
  computed: {
    setLable () {
      return this.label ? this.label : this.labelMap[this.type] ? this.labelMap[this.type].text : '未知'
    },
    setIcon () {
      return this.icon ? this.icon : this.labelMap[this.type] ? this.labelMap[this.type].icon : ''
    },
  },
  methods: {
    handlerClick () {
      if (this.disabled !== false) {
        return
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>
<style lang="css" scoped>
.x6-button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
}
.x6-button:hover{
  opacity: 0.8;
}
.x6-button i {
  font-size: 10px;
  margin-right: 3px;
}
.x6-button-box{
  border-radius: 4px;
}
.x6-button-large{
  padding: 10px 15px;
}
.x6-button-small{
  padding: 8px 15px;
}
.x6-button-mini{
  padding: 5px 10px;
}
.x6-button-text_disabled{
  color: #cecece !important;
  opacity: 1 !important;
  cursor: not-allowed;
}
.x6-button-box_disabled{
  background: #cecece !important;
  opacity: 1 !important;
  cursor: not-allowed;
}
.x6-button + .x6-button {
  margin-left: 10px;
}
</style>