const props = {
  name: {
    type: String,
    value: ''
  },
  height: {
    type: [String, Array],
    default: '100%'
  },
  action: {
    type: String,
    default: ''
  },
  actionParams: {
    type: Object,
    default: () => {}
  },
  data: {
    type: Array,
    default: function () {
      return []
    }
  },
  stripe: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: '暂未找到数据'
  },
  showIndex: {
    type: Boolean,
    default: false
  },
  showTotal: {
    type: Boolean,
    default: true
  },
  totalMethod: {
    type: Function,
    default: () => {}
  },
  pagination: {
    type: Boolean,
    default: true
  },
  pageId: [String, Number],
  pzId: {
    type: [String, Number],
    default: 0
  },
}
export { props }
