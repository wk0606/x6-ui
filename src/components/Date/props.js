const props = {
  label: String,
  type: {
    type: String,
    default: 'date'
  },
  value: [String, Number, Array],
  placeholder: {
    type: String,
    default: '请选择日期'
  },
}

export { props }