export default {
  name: 'SuggestionCell',
  props: ['type', 'value', 'selected', 'year', 'month'],
  data () {
    return {
      
    }
  },
  computed: {
    setCellStyle() {
      switch(this.type){
        case 'year':
          return { width: '25%', padding: '20px 0' }
        case 'month':
          return { width: '25%', padding: '20px 0' }
        case 'season':
          return { width: '100%', padding: '10px 0', 'text-align': 'left' }
        case 'week':
          return { width: '100%', padding: '10px 0', 'text-align': 'left' }
        case 'date':
          return {
            width: '14.2857%',
            padding: '10px 0',
            color: this.selected ? '#409eff' : this.value.year == this.year && this.value.month == this.month ? '#333' : '#d0d0d0'
          }
        default:
          return {}
      }
    },
    setCellLabel() {
      if (this.type == 'season') {
        return `${this.value.text} (${this.$util.format('date', this.value.fsrqq)} 至 ${this.$util.format('date', this.value.fsrqz)})`
      } else if (this.type == 'week') {
        return `${this.value.text} (${this.$util.format('date', this.value.fsrqq)} 至 ${this.$util.format('date', this.value.fsrqz)})`
      } else {
        return this.value.text
      }
    },
  },
  render (h) {
    const _self = this
    return h('b', {
      class: {
        'x6-date-tap': true,
      },
      style: {
        ..._self.setCellStyle
      },
      on: {
        click() {
          _self.handlerCellTap()
        }
      }
    }, _self.setCellLabel)
  },
  methods: {
    handlerCellTap() {
      this.$emit('handler-tap', this.value)
    }
  }
}