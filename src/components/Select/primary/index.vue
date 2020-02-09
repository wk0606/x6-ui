<template>
  <div :style="{'width': `${parseInt($attrs.width)}px`}">
    <span>{{ $attrs.label }}</span>
    <el-autocomplete
      v-if="$attrs.editable"
      ref="elselect"
      v-model="val"
      value-key="name"
      :fetch-suggestions="querySearchAsync"
      :disabled="$attrs.disabled"
      :validate-event="false"
      :placeholder="$attrs.placeholder"
      :trigger-on-focus="true"
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
  </div>
</template>
<script>
import SelectCell from './render'
import selectMixins from '../mixins'
export default {
  name: 'SelectPrimary',
  mixins: [selectMixins],
  props: ['value'],
  data () {
    return {
      matchKeys: ['name'], // 本地匹配时候可以匹配的字段
    }
  },
  components: { SelectCell },
  methods: {
    getCacheData () {
      this.cacheList = this.$attrs.data
    },
  }
}
</script>
