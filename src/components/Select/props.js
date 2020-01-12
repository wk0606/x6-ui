const props = {
  type: {
    required: true,
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
  lazyload: {
    type: Boolean,
    default: true
  },
  ys: {
    type: [String, Number],
    default: 1
  },
  showYe: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'el-icon-arrow-down'
  }
}

export { props }