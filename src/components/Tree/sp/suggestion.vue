<template>
  <div class="x6-tree-suggestion" ref="suggestion">
    <div class="x6-suggestion_header">
      <el-input v-model="query" placeholder="快速查找品牌、型号" size="mini" @input="querySearch"/>
    </div>
    <div class="x6-tree-suggestion_middle">
      <div class="x6-tree_left">
        <div class="x6-tree-node x6-tree-node_affix_2">
          <span>请选择品牌</span>
        </div>
        <el-scrollbar class="x6-scrollbar-visible">
          <div class="el-autocomplete-suggestion__wrap" style="max-height: 330px;">
            <tree-node v-for="pp in brandList" :key="pp.name" :data="pp" :query="query" :value="form.pp" color="#333" @click.native="handlerClick(pp, 'pp')"></tree-node>
          </div>
        </el-scrollbar>
      </div>
      <div class="x6-tree_right">
        <div>
          <div class="x6-tree-node x6-tree-node_affix_2">
            <span>请选择型号</span>
          </div>
          <el-scrollbar class="x6-scrollbar-visible">
            <div class="el-autocomplete-suggestion__wrap">
              <tree-node v-for="spxx in xhList" :key="spxx.name" :data="spxx" :query="query" :value="form.spmc" @click.native="handlerClick(spxx, 'spmc')"></tree-node>
            </div>
          </el-scrollbar>
        </div>
        <div class="x6-tree-suggestion_footer">
          <x-select type="primary" v-model="form.ys" :data="ysList" :disabled="ysList.length === 0" value-key="name" label="颜色" placeholder="请选择颜色" width="170"></x-select>
          <x-select type="primary" v-model="form.pz" :data="pzList" :disabled="pzList.length === 0" value-key="name" label="配置" placeholder="请选择配置" style="margin-left: 10px;" width="170"></x-select>
        </div>
      </div>
    </div>
    <div class="x6-suggestion_btn">
      <el-button type="primary" size="mini" @click="confirm">确认</el-button>
    </div>
  </div>
</template>
<script>
import TreeNode from './render'
import { util } from '../../../server/util'
export default {
  name: 'TreeSuggestion',
  props: ['visible'],
  data () {
    return {
      query: '',
      brandList: [],
      xhList: [], //型号去重
      allXhList: [], // 保存所有型号
      ysList: [],
      pzList: [],
      form: {
        pp: '',
        spmc: '',
        ys: '',
        pz: ''
      }
    }
  },
  components: { TreeNode },
  watch: {
    visible (nv) {
      if (nv) {
        this.getBrands()
        this.getSpxxByPp(this.form.pp)
        document.addEventListener('click', this.checkIsOutSide)
      } else {
        document.removeEventListener('click', this.checkIsOutSide)
      }
    }
  },
  methods: {
    confirm () {
      this.query = ''
      console.log(this.form);
      this.$emit('change', { ...this.form })
    },
    handlerClick (item, lx) {
      if (this.form[lx] === item.name) {
        this.form[lx] = ''
      } else {
        this.form[lx] = item.name
        if (lx === 'pp') {
          this.form.spmc = ''
          this.form.ys = ''
          this.form.pz = ''
        }
        if (lx === 'spmc') {
          this.form.ys = ''
          this.form.pz = ''
        }
      }
      if (lx === 'pp') {
        this.getSpxxByPp(this.form.pp)
      }
      if (lx === 'spmc') {
        this.getYsAndPz()
      }
    },
    getYsAndPz () {
      for (let spxx of this.allXhList) {
        if (spxx.name === this.form.spmc) {
          if (spxx.gg1 && !this.ysList.includes(spxx.gg1)) {
            this.ysList.push({
              name: spxx.gg1
            })
          }
          if (spxx.gg2 && !this.pzList.includes(spxx.gg2)) {
            this.pzList.push({
              name: spxx.gg2
            })
          }
        }
      }
    },
    getBrands () {
      this.brandList = []
      this.$api.GetBrandList({
        searchVal: this.query
      }).then(res => {
        this.brandList = res.ppList
        this.loading = false
      })
    },
    getSpxxByPp (pp) {
      this.xhList = []
      this.$api.GetSpxxByBrand({
        searchVal: this.query,
        pp
      }).then(res => {
        this.allXhList = res.List
        for (let spxx of this.allXhList) {
          if (!this.xhList.find(item => item.name === spxx.name)) {
            this.xhList.push(spxx)
          }
        }
      })
    },
    querySearch: util.throttle(function () {
      this.getBrands()
      this.getSpxxByPp(this.form.pp)
    }, 200),
    checkIsOutSide (ev) {
      try {
        if (this.$refs.suggestion && !this.$refs.suggestion.contains(ev.target)) {
          this.$emit('update:visible', false)
        }
      } catch (error) {
        console.log(new Error('something is error!'))
      }
      
    }
  }
}
</script>
<style lang="css" scoped>
ul, li{
  list-style: none;
}
.el-autocomplete-suggestion__wrap{
  padding: 0;
}
.x6-tree-suggestion{
  position: absolute;
  width: auto;
  border: 1px solid 1px solid #E4E7ED;
  box-shadow: 0 0 12px 5px rgba(14, 2, 2, 0.1);
  background: #fff;
  box-sizing: border-box;
  top: 40px;
  left: 0;
  border-radius: 4px;
}
.x6-suggestion_header, .x6-suggestion_btn{
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #e8e8e8;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.x6-suggestion_btn {
  border-top: 1px solid #e8e8e8;
}
/* .x6-suggestion_header .el-input{
  margin-right: 30px;
} */
.x6-tree-suggestion_middle{
  display: flex;
}
.x6-tree-suggestion_footer{
  box-sizing: border-box;
  padding: 0 10px;
  height: 50px;
  border-top: 1px solid #f2f2f2;
  white-space: nowrap;
  min-width: 400px;
  position:relative;
  bottom: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.x6-tree_left{
  width: auto;
  min-width: 200px;
  background: #f8f8f8;
  border-right: 1px soild #f2f2f2;
}
.x6-tree_right{
  width: auto;
  min-width: 200px;
  flex-grow: 1;
  height: 370px;
  display: flex;
  flex-direction: column;
}
.x6-tree_right > div:nth-child(1) {
  flex-grow: 1;
}
.x6-tree-node{
  font-size: 1.2rem;
  padding: 10px 15px 10px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.x6-tree-node:hover{
  background: #f2f2f2;
}
.x6-tree-node i{
  margin-right: 5px;
  font-size: 14px;
}
.x6-tree-node_affix{
  color: #fff;
}
.x6-tree-node_affix_2 {
  border: 1px solid #f2f2f2;
  justify-content: center;
}
</style>