<template>
  <div>
    <span>供应商</span>
    <el-autocomplete
      v-if="$attrs.editable"
      ref="elselect"
      v-model="val"
      value-key="name"
      :fetch-suggestions="querySearchAsync"
      :disabled="$attrs.disabled"
      :validate-event="false"
      placeholder="请选择供应商"
      @select="handleItemChange"
      @focus="focus"
      @blur="blur"
      @mouseenter.native="mouseEnter"
      @mouseleave.native="mouseLeave">
      <template slot-scope="{ item }">
        <select-cell :data="item" :options="$attrs" :query="query" />
      </template>
      <i slot="suffix" class="el-input__icon" :class="setIcon" @click="doIconClick"></i>
    </el-autocomplete>
    <div v-else class="x6-select-text" :title="$attrs.text">{{ $attrs.text }}</div>
    <more ref="more"/>
    <create ref="create"/>
  </div>
</template>
<script>
import SelectCell from './render'
import More from './more'
import Create from './create'
import selectMixins from '../mixins'
import { util } from '../../../server/util'
export default {
  name: 'SelectGys',
  mixins: [selectMixins],
  props: ['value'],
  data () {
    return {
      matchKeys: ['name', 'zjm'], // 本地匹配时候可以匹配的字段
      actionParams: {
        setlx: 'hot_gysxx',
        lx: 2,
        fw: this.$attrs.fw
      }
    }
  },
  components: { SelectCell, More, Create },
  methods: {
    getCacheData () {
      this.cacheList = this.$util.getCache('dmjglist', 2)
    },
    requestData (cb) {
      
    }
  }
}
</script>
