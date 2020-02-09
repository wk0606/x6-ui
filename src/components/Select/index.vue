<template>
  <div class="x6-select">
    <component
      class="x6-select-content"
      ref="select"
      :width="width"
      :value="value"
      :is="`select-${type}`"
      :addable="addable"
      :disabled="disabled"
      :editable="editable"
      :searchable="searchable"
      :moreable="moreable"
      :lazyload="lazyload"
      :limit-num="limitNum"
      :value-key="valueKey"
      :fw="fw"
      :text="text"
      :ys="ys"
      :data="data"
      :label="label"
      :placeholder="placeholder"
      :show-ye="showYe"
      :show-tags="showTags"
      :show-kc="showKc"
      :action-name="actionName"
      @change="handleItemChange">
      <!-- <div v-if="showMore" class="x6-select-add" @click="openMore">
        <div>more</div>
      </div> -->
    </component>
  </div>
</template>
<script>
import { props } from './props'
import SelectGys from './gys/index'
import SelectGs from './gs/index'
import SelectYg from './yg/index'
import SelectYys from './yys/index'
import SelectKh from './kh/index'
import SelectTc from './tc/index'
import SelectZh from './zh/index'
import SelectXfz from './xfz/index'
import SelectSp from './sp/index'
import SelectPrimary from './primary/index'
export default {
  name: 'XSelect',
  props,
  data () {
    return {
      val: this.value
    }
  },
  components: {
    SelectGys,
    SelectGs,
    SelectYg,
    SelectYys,
    SelectKh,
    SelectTc,
    SelectZh,
    SelectXfz,
    SelectSp,
    SelectPrimary,
  },
  methods: {
    openMore () {
      this.$refs.select.openMoreDialog && this.$refs.select.openMoreDialog()
    },
    handleItemChange (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="css">
.x6-select{
  display: inline-flex;
  position: relative;
}
.x6-select>i{
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #999;
}
.x6-select>i:hover{
  color: #409eff;
}
.x6-select-add{
  cursor: pointer;
  text-align: right;
  font-size: 1.2rem;
  padding: 0.8rem 20px 0.8rem 0;
  border-bottom: 1px solid #f2f2f2;
  margin-top: -6px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: #999;
  user-select: none;
}
.x6-select-add div{
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1.2rem;
  color: #bfbfbf;
  background: #fff;
  border: 1px solid #bfbfbf;
  box-sizing: border-box;
  display: inline-block;
}
.x6-select-add div:hover{
  color: #fff;
  background: #409eff;
  border-color: #409eff;
}
.x6-select-content{
  display: inline-flex;
  align-items: center;
}
.x6-select-content > span {
  font-size: 1.2rem;
  margin-right: 5px;
}
.icon-suffix{
  width: 24px;
  height: 24px;
  background: #fff;
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-suffix i{
  cursor: pointer;
  font-weight: bold;
  color: #999;
}

</style>
