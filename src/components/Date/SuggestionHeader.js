export default {
  name: 'SuggestionHeader',
  props: ['type', 'value'],
  computed: {
    setYearText() {
      if (this.type === 'year') {
        let t1 = this.value.year - ( this.value.year % 10 )
        let t2 = this.value.year + 9 - ( this.value.year % 10 )
        return `${t1} 年  -  ${t2} 年`
      } else {
        return `${this.value.year} 年`
      }
    }
  },
  render (h) {
    const _self = this
    const Nodes = []
    const Node_left = [
      // 左边大箭头
      h('i', {
        class: {
          'el-icon-d-arrow-left': true,
          'x6-date-tap': true
        },
        on: {
          click() {
            _self.handlerIconClick(-1, true)
          }
        }
      })
    ] 
    if (this.type === 'date' || this.type === 'week') {
      Node_left.push(
        // 左边小箭头
        h('i', {
          class: {
            'el-icon-arrow-left': true,
            'x6-date-tap': true
          },
          style: {
            'margin-left': '10px'
          },
          on: {
            click() {
              _self.handlerIconClick(-1)
            }
          }
        })
      )
    }

    const Node_mid = []
    Node_mid.push(
      h('b', {
        class: {
          'x6-date-tap': true
        }
      }, this.setYearText)
    )
    switch(this.type) {
      case 'year':
        break
      case 'month':
        Node_mid.push(
          h('b', {
            class: { 'x6-date-tap': true },
            style: { 'margin-left': '5px' }
          }, `${this.value.month} 月`)
        )
        break
      case 'week':
        Node_mid.push(
          h('b', {
            class: { 'x6-date-tap': true },
            style: { 'margin-left': '5px' }
          }, `${this.value.month} 月`)
        )
        break
      case 'season':
        Node_mid.push(
          h('b', {
            class: { 'x6-date-tap': true },
            style: { 'margin-left': '5px' }
          }, `第 ${Math.floor(_self.value.month / 3) + 1} 季度`)
        )
        break
      case 'date':
        Node_mid.push(
          h('b', { class: { 'x6-date-tap': true }, style: { 'margin-left': '5px' } }, `${this.value.month} 月`)
        )
        Node_mid.push(
          h('b', { class: { 'x6-date-tap': true }, style: { 'margin-left': '5px' } }, `${this.value.day} 日`)
        )
        break
      default:
        break
    }
    
    const Node_right = []
    if (this.type === 'date' || this.type === 'week') {
      Node_right.push(
        // 右边小箭头
        h('i', {
          class: {
            'el-icon-arrow-right': true,
            'x6-date-tap': true
          },
          style: {
            'margin-right': '10px'
          },
          on: {
            click() {
              _self.handlerIconClick(1)
            }
          }
        })
      )
    }
    Node_right.push(
      h('i', {
        class: {
          'el-icon-d-arrow-right': true,
          'x6-date-tap': true
        },
        on: {
          click() {
            _self.handlerIconClick(1, true)
          }
        }
      })
    )

    Nodes.push(
      h('div', {
        class: {
          'x6-flex-row': true
        }
      }, Node_left)
    )
    Nodes.push(
      h('div', {
        class: {
          'x6-flex-row': true
        }
      }, Node_mid)
    )
    Nodes.push(
      h('div', {
        class: {
          'x6-flex-row': true
        }
      }, Node_right)
    )

    return h('div', {
      class: {
        'x6-date-suggestion_header': true,
        'x6-flex-row': true
      }
    }, Nodes)
  },
  methods: {
    handlerIconClick (val, isyear = false) {
      let temp
      if (this.type === 'year') {
        temp = 9
      } else if (this.type === 'month') {
        temp = 1
      } else if (this.type === 'season') {
        temp = 1
      } else if (this.type === 'date') {
        temp = 1
      } else if (this.type === 'week') {
        temp = 1
      } else {

      }
      this.$emit('handler-change', {
        lx: this.type,
        isyear: isyear,
        val: val * temp
      })
    }
  }
}