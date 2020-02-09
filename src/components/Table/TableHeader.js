import { panel } from './panel'
export default {
  name: 'TableHeader',
  props: ['options', 'filterable',],
  render (h) {
    const _self = this
    const nodes = [
      h('span', {
        style: {
          'white-space': 'nowrap'
        }
      }, this.options.label)
    ]
    if (this.filterable === true) {
      nodes.push(
        h('i', {
          class: {
            'el-icon-arrow-down': true
          },
          style: {
            'position': 'absolute',
            'right': '5px',
            'top': '15px',
            'cursor': 'pointer'
          },
          on: {
            click (ev) {
              let { top, left } = ev.target.getBoundingClientRect()
              const vm_panel = panel.open({
                top,
                left,
                column: _self.options.property,
                ..._self.$attrs
              })
              vm_panel.$on('toggle-checked', obj => {
                _self.$emit('toggle-checked')
              })
            }
          }
        })
      )
    }
    return h('div', {
      style: {
        'position': 'relative',
        'box-sizing': 'border-box',
        'padding': '10px 20px',
        'background': '#fafafa'
      }
    }, nodes)
  },
}