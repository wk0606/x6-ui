import Vue from 'vue'
import MoreBtn from './more-btn'
export default {
  data () {
    return {
      defaultList: [],
      cacheList: [],
      val: '',
      query: '',
      isHovering: false,
      moreNode: null,
    }
  },
  computed: {
    setIcon () {
      return this.isHovering ? 'el-icon-error' : this.$attrs.addable ? 'el-icon-plus' : this.$attrs.searchable ? 'el-icon-search' : 'el-icon-arrow-down'
    }
  },
  mounted () {
    let _MoreBtn = Vue.extend(MoreBtn)
    this.getCacheData && this.getCacheData()
    if (!!this.$attrs['action-name']) {
      this.requestDefaultData()
    } else {
      this.findSelected()
    }
    this.moreNode = new _MoreBtn().$mount()
  },
  methods: {
    handleItemChange (val) {
      this.$emit('change', val[this.$attrs['value-key']])
    },
    querySearchAsync (query, cb) {
      this.filterMethod(query, cb)
    },
    filterMethod (query, cb) {
      let List = []
      if (query) {
        this.query = query
        if (this.$attrs.lazyload === false) {
          // 本地匹配
          for (let item of this.cacheList) {
            for (let key of this.matchKeys) {
              if (this.$util.checkIsIncludes(item[key], query)) {
                List.push(item)
                break
              }
            }
          }
          cb(List)
        } else {
          this.requestData(cb)
        }
      } else {
        this.query = ''
        List = !!this.$attrs['action-name'] ? this.defaultList : this.cacheList
        cb(List)
      }
    },
    requestDefaultData () {
      if (!this.$attrs['action-name']) {
        this.showTipsInConsole()
      } else {
        this.$api[this.$attrs['action-name']](this.actionParams).then(res => {
          this.defaultList = res.List
          this.findSelected()
        }).catch(_ => {

        })
      }
    },
    getData () {
      if (!this.$attrs['action-name']) {
        this.getCacheData && this.getCacheData()
      } else {
        this.requestDefaultData()
      }
    },
    addMoreNode () {
      setTimeout(_ => {
        let AutoWrap = document.getElementsByClassName('el-autocomplete-suggestion__wrap')[0]
        AutoWrap && AutoWrap.insertBefore(this.moreNode.$el, AutoWrap.children[0])
      }, 20)
    },
    findSelected () {
      if (this.value) {
        let temp = this.cacheList.find(item => item[[this.$attrs['value-key']]] == this.value)
        this.val = temp ? temp.name : '未找到'
      }
    },
    mouseEnter () {
      if (this.val) {
        this.isHovering = true
      }
    },
    mouseLeave () {
      this.isHovering = false
    },
    focus () {
      this.getData()
      if (this.$attrs.moreable)　{
        this.addMoreNode()
      }
    },
    blur () {
      if (!!this.val) {
        this.findSelected()
      } else {
        this.$emit('change', '')
      }
    },
    doIconClick () {
      if (this.isHovering) {
        this.val = ''
        this.$emit('change', '')
        this.isHovering = false
        this.$refs.elselect && this.$refs.elselect.close()
      } else if (this.$attrs.addable) {
        this.openAddDialog()
      } else if (this.$attrs.searchable) {
        this.openMoreDialog()
      } else {
        return null
      }
    },
    // 打开更多
    openMoreDialog () {
      this.$refs.more.openMoreDialog && this.$refs.more.openMoreDialog()
    },
    // 打开+
    openAddDialog () {
      this.$refs.create.openAddDialog && this.$refs.create.openAddDialog()
    },
    showTipsInConsole () {
      console.log('%c未配置请求地址参数：action-name', 'padding:5px;color:#fff;background: red;')
    },
  }
}
