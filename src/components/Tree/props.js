const props = {
  type: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number, Array],
    default: ''
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  action: {
    type: String,
    default: ''
  },
  searchable: {
    type: Boolean,
    default: false
  }
}

export { props }