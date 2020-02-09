<template>
  <div>
    <span>套餐</span>
    <el-autocomplete
      v-if="$attrs.editable"
      ref="elselect"
      v-model="val"
      value-key="name"
      :fetch-suggestions="querySearchAsync"
      :disabled="$attrs.disabled"
      :validate-event="false"
      placeholder="请选择套餐"
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
      matchKeys: ['name'], // 本地匹配时候可以匹配的字段
    }
  },
  components: { SelectCell, More, Create },
  methods: {
    getCacheData () {
      this.cacheList = this.$util.getCache('tclxlist')
    },
    requestData () {
      this.$api.GetMyGsList({
        fw: this.$attrs.fw,
      }).then(res => {
        this.defaultList = res.List
        this.List = res.List
      })
    },
  }
}
</script>
