export default {
  name: 'SelectCell',
  data() {
    return {

    }
  },
  props: ['options', 'data'],
  render(h) {
    const Nodes = [
      h('span', {
        class: {
          'ellipsis1rows': true
        },
        style: {
          'color': '#333',
        }
      }, this.data.name)
    ]
    if (this.options.showYe) {
      Nodes.push(
        h('span', {
          style: {
            'color': 'red',
            'margin-left': '10px'
          }
        }, this.$util.format('currency', this.data.ye))
      )
    }
    return h('div', {
      style: {
        'font-size': '1.2rem',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between'
      }
    }, Nodes)
  },
}