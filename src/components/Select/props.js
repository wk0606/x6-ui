const props = {
  // select属性
  value: {
    required: true
  },
  type: {
    required: true,
    type: String,
    default: ''
  },
  // END
  // 共用属性
  width: {
    type: [String, Number],
    default: 'auto'
  },
  data: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: false
  },
  moreable: {
    type: Boolean,
    default: false
  },
  searchable: {
    type: Boolean,
    default: false
  },
  lazyload: {
    type: Boolean,
    default: false
  },
  actionName: {
    type: String,
    default: ''
  },
  cacheKey: {
    type: String,
    default: ''
  },
  ys: {
    type: [String, Number],
    default: 1
  },
  icon: {
    type: String,
    default: 'el-icon-arrow-down'
  },
  text: {
    type: String,
    default: ''
  },
  limitNum: {
    type: Number,
    default: 20
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  fw: {
    type: [String, Number],
    default: 0
  },
  // 子组件独有
  showYe: {
    type: Boolean,
    default: false
  },
  showTags: {
    type: Boolean,
    default: false
  },
  showMore: {
    type: Boolean,
    default: true
  },
  showKc: {
    type: Boolean,
    default: false
  }
}

export { props }
