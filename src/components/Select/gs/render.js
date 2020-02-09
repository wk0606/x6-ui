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
    if (this.options['show-tags']) {
      let tags = [
        { label: '热销门店', color: '#409eff' },
        { label: '促销', color: 'red' }
      ]
      let temp = []
      for (let tag of tags) {
        temp.push(h('span', {
          style: {
            'color': tag.color,
            'font-size': '1rem',
            'margin-right': '0.5rem',
          }
        }, `# ${tag.label}`))
      }
      Nodes.push(
        h('div', {
          style: {
            
          }
        }, temp)
      )
    }
    return h('div', {
      style: {
        'font-size': '1.2rem'
      }
    }, Nodes)
  }
}
