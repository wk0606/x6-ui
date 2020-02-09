import PY from '../../../server/pinyin'
export default {
  name: 'TreeNode',
  data () {
    return {

    }
  },
  props: ['data', 'query', 'value', 'color'],
  render (h) {
    let _nodes = []
    let _temp = this.$util.splitKeyWordsForQuery(this.data.name, this.query)
    for (let item of _temp) {
      _nodes.push(h('span', {
        style: {
          color: item.isred ? 'red' : this.color
        }
      }, item.txt))
    }
    const Nodes = [
      h('i', {
        class: {
          'el-icon-menu': true
        },
        style: {
          'margin-right': '5px',
          'font-size': '14px',
          'color': this.color
        }
      }),
      h('div', {
        style: {
          'white-space': 'nowrap',
        }
      }, _nodes)
    ]
    return h('div', {
      class: {
        'x6-tree-node': true
      },
      style: {
        'background': this.value === this.data.name ? '#d6eaff' : '',
      }
    }, Nodes)
  }
}
