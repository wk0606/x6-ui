import PY from '../../../server/pinyin'
export default {
  name: 'SelectCell',
  data () {
    return {
      defaultAvatar: require('./defaultavatar.svg')
    }
  },
  props: ['options', 'data', 'query'],
  render (h) {
    let _temp = this.$util.splitKeyWordsForQuery(this.data.name, this.query)
    let _nodes = []
    for (let item of _temp) {
      _nodes.push(h('span', {
        style: {
          color: item.isred ? 'red' : '#333'
        }
      }, item.txt))
    }
    const Nodes = [
      h('img', {
        style: {
          'width': '20px',
          'height': '20px',
          'border-radius': '50%',
          'margin-right': '10px'
        },
        attrs: {
          src: this.data.userpic || this.defaultAvatar
        }
      }),
      h('div', {}, _nodes)
    ]
    return h('div', {
      style: {
        'font-size': '1.2rem',
        'display': 'flex',
        'align-items': 'center'
      }
    }, Nodes)
  }
}
