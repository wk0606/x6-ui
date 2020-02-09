const props = {
    value: [String, Number],
    editable: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text'  // text, currency, number, card-银行卡号
    },
    size: {
        type: String,
        default: 'small'
    },
    placeholder: {
        type: String,
        default: '请输入...'
    },
    decimalLength: {
        type: Number,
        default: 2 // 小数长度
    }
}
export { props }