<template>
  <div v-if="visible" class="x6-tabel-panel" :style="setPosition" v-clickoutside="close">
    <div class="x6-flex-row x6-tabel-panel_header">
      <div class="x6-flex-row">
        <span class="x6-tabel-panel_btn1"><i class="el-icon-sort-up" />升序</span>
        <span class="x6-tabel-panel_btn1 x6-tabel-panel_btn2"><i class="el-icon-sort-down" />降序</span>
      </div>
      <div class="x6-flex-row">
        <a class="x6-tabel-panel_btn1">显示全部项</a>
        <div class="x6-tabel-panel_btn1 x6-tabel-panel_btn3" @click="reset">复位</div>
      </div>
    </div>
    <div class="x6-tabel-panel_box2">
      <el-input v-model="query" size="mini" placeholder="输入关键字匹配" />
    </div>
    <!-- 当有数据 -->
    <div class="x6-tabel-panel_box3" v-if="List.length > 0">
      <el-scrollbar>
        <div class="el-autocomplete-suggestion__wrap" style="padding: 0;">
          <div
            class="x6-panel-item"
            v-for="item in List"
            :key="item.value">
            <el-checkbox v-model="item.checked" />
            <span @click="handlerCheckedChange(item)">{{ item.value }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="x6-tabel-panel_box3 x6-tabel-panel_box4" v-else>
      未匹配到任何数据
    </div>
    <div class="x6-flex-row x6-tabel-panel_footer">
      <span>隐藏该列</span>
      <div>
        <el-button type="primary" size="mini" :disabled="List.length === 0" @click="confirm">确定</el-button>
        <el-button size="mini" @click="close">关闭</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
export default {
  name: 'FilterPanel',
  props: {
    top: Number,
    left: Number,
    action: String,
    actionParams: Object,
    pageId: String,
    column: String,
    pzId: [String, Number],
  },
  data () {
    return {
      query: '',
      visible: false,
      List: [],
    }
  },
  computed: {
    setPosition () {
      return {
        'left': this.left - 15 + 'px',
        'top': this.top + 15 +'px'
      }
    },
    ...mapState('FilterModule', {
      _consitions_: state => state.FilterConditions
    })
  },
  created () {
    this.visible = true
  },
  mounted () {
    this.getFilterItems()
  },
  methods: {
    ...mapMutations('FilterModule', {
      _updateConditions_: 'updateConditions',
      _clearConditions_: 'clearConditions'
    }),
    clickOut() {
      this.close()
    },
    getFilterItems() {
      this.$api[this.action]({
        ...this.actionParams,
        filterColName: this.column
      }).then(res => {
        // this.List = res.List
      })
    },
    handlerCheckedChange(item) {
      this.$set(item, 'checked', item.checked ? false : true)
    },
    confirm () {
      let temp = []
      for (let item of this.List) {
        if (item.checked) {
          temp.push(item.value)
        }
      }
      let val = {
        key: `${this.pageId}_${this.pzId}`,
        property: this.column,
        value: temp
      }
      // 更新vuex
      this._updateConditions_(val)
      this.$emit('toggle-checked')
      this.close()
    },
    reset() {
      this._clearConditions_({
        key: `${this.pageId}_${this.pzId}`
      })
      this.$emit('toggle-checked')
    },
    close () {
      this.visible = false
      setTimeout(_ => {
        this.$destroy && this.$destroy()
      }, 0)
    }
  }
}
</script>
<style scoped>
.x6-tabel-panel {
  width: 230px;
  height: auto;
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 0 5px 3px #f7f7f7;
  position: fixed;
  z-index: 9999;
}
.x6-tabel-panel_header{
  display: flex;
  color: #999;
  justify-content: space-between;
}
.x6-tabel-panel_btn1{
  cursor: pointer;
}
.x6-tabel-panel_btn2{
  margin-left: 10px;
}
.x6-tabel-panel_btn3{
  padding: 2px 5px;
  color: red;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  font-size: 12px;
}
.x6-tabel-panel_box4{
  padding: 30px 0;
  text-align: center;
  color: #999;
}
.x6-tabel-panel_header a{
  color: #439eff;
  margin-right: 15px;
}
.x6-tabel-panel_box2{
  margin: 15px 0;
}
.x6-tabel-panel_box3{
  background: #f2f2f2;
  margin-bottom: 15px;
}
.x6-tabel-panel_footer {
  justify-content: space-between;
  font-size: 12px;
  padding-top: 15px;
  border-top: 1px solid #f2f2f2;
}
.x6-tabel-panel_footer span{
  color: #999;
  cursor: pointer;
}
.x6-panel-item{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 10px;
}
.x6-panel-item > span{
  padding-left: 5px;
  cursor: pointer;
}
</style>