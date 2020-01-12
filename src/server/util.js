const util = {
  /**
   *
   *  格式化
   * @param {*} lx currency-金额
   * @param {*} val 值
   */
  format(lx, val) {
    if(!lx) {
      return val
    } else {
      switch(lx) {
        case 'currency':
          return val.toString().replace(/\d{1,3}(?=(\d{3})+(\.|$))/g,'$&,')
        default:
          return val
      }
    }
  }
}

export {
  util
}