import PY from '../../../server/pinyin'
export default {
  name: 'SelectCell',
  data () {
    return {

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
      h('div', {}, _nodes)
    ]
    return h('div', {
      style: {
        'font-size': '1.2rem'
      }
    }, _nodes)
  }
}
