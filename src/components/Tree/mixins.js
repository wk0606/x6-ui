export default {
  data () {
    return {
      visible: false,
      isHovering: false,
      checked: '',
    }
  },
  computed: {
    setIcon () {
      return this.isHovering ? 'el-icon-error' : this.$attrs.searchable ? 'el-icon-search' : 'el-icon-arrow-down'
    }
  },
  methods: {
    toggleSuggestion () {
      this.visible = !this.visible
    },
    doIconClick () {
      if (this.setIcon === 'el-icon-error') {
        this.checked = ''
        this.$emit('change', '')
        this.$refs.cascader && this.$refs.cascader.handleClear()
        // this.$refs.cascader && this.$refs.cascader.close()
      }
      if (this.setIcon === 'el-icon-search') {
        console.log(9889);
      }
    },
    handlerChange (node, data) {
      let nodes = this.$refs.cascader.getCheckedNodes()
      let checked = this.findOnlyParentNodes(nodes)
      this.checked = checked
      this.$emit('change', checked)
    },
    findOnlyParentNodes (nodes) {
      let temp = []
      let _AdjectiveNode = function (array) {
        for (let item of array) {
          if (item.parent && item.parent.checked === true) {
            _AdjectiveNode([item.parent])
          } else {
            temp.push(item.value)
          }
        }
      }
      _AdjectiveNode(nodes)
      return [ ...new Set(temp) ]
    },
    onMouseEnter () {
      if (this.checked) {
        this.isHovering = true
      }
    },
    onMouseLeave () {
      this.isHovering = false
    },
  }
}