export default {
  name: 'TableCell',
  props: ['options', 'row', 'renderMethod'],
  render (h) {
    return (
      <div>
        {
          !!this.renderMethod ? this.renderMethod.call(this, h, { row: this.row, col: this.options }) : this.setCell(h)
        }
      </div>
    )
  },
  computed: {
    setTableCellText () {
      if (this.options.format === 'currency') {
        return this.$util.format('currency', this.row[this.options.prop])
      } else {
        return this.row[this.options.prop]
      }
    }
  },
  methods: {
    setCell (h) {
      let node = null
      if (this.options.format === 'avatar') {
        node = h('x-avatar', {
          props: {
            name: this.row[this.options.prop],
            src: this.row[this.options.avatarKey]
          }
        })
      } else {
        node = h('div', {
          style: {
            'color': this.options.format === 'number' || this.options.format === 'currency' ? this.row[this.options.prop] < 0 ? 'red' : '#333' : '#333'
          }
        }, this.setTableCellText)
      }
      return h('div', {
        style: {
          'display': 'flex',
          'align-items': 'center'
        }
      }, [ node ])
    }
  },
}