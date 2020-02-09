const props = {
  size: {
    type: String,
    default: 'mini'
  },
  mode: {
    tyle: String,
    default: 'box'
  },
  type: {
    type: String,
    default: 'add'
  },
  icon: String,
  background: {
    type: String,
    default: '#409eff'
  },
  color: {
    type: String,
    default: '#fff'
  },
  label: String,
  disabled: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: '#409eff'
  },
  loading: {
    type: Boolean,
    default: false
  }
}

export { props }