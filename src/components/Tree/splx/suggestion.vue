<template>
  <div class="x6-tree-suggestion" ref="suggestion">
    <div>
      <el-scrollbar>
        <div class="el-autocomplete-suggestion__wrap">
          <suggestion-item :data="treeData" @change="handlerNodeChange"/>
        </div>
      </el-scrollbar>
    </div>
    <div class="x6-suggestion_btn">
      <el-button type="primary" size="mini" @click="confirm">确认</el-button>
    </div>
  </div>
</template>
<script>
import SuggestionItem from './suggestion-item'
export default {
  name: 'TreeSuggestion',
  props: ['visible'],
  data () {
    return {
      treeData: []
    }
  },
  components: { SuggestionItem },
  watch: {
    visible (nv) {
      
    }
  },
  mounted () {
    this.treeData = this.$util.getCacheTreeData('splxlist')
  },
  methods: {
    confirm () {
      this.$emit('change', { ...this.form })
    },
    handlerNodeChange (node) {
      if (node.pbm) {
        let temp = this.findNode(node.pbm)
        if (this.hasAllChecked(temp)) {
          temp.checked = true
        } else {
          temp.checked = false
        }
        console.log(8098989);
      }
      if (node.children) {
        for (let row of node.children) {
          row.checked = node.checked
        }
      }
    },
    findNode (bm) {
      let temp = null
      let _findNodes = function (array) {
        for (let node of array) {
          if (node.bm == bm) {
            temp = node
            return
          } else {
            if (node.children) {
              _findNodes(node.children)
            } else {
              continue
            }
          }
        }
      }
      _findNodes(this.treeData)
      return temp
    },
    hasAllChecked (node) {
      let count = 0
      for (let row of node.children) {
        if (row.checked) {
          count += 1
        }
      }
      return count === node.children.length ? true : false
    },
  }
}
</script>
<style lang="css" scoped>

</style>