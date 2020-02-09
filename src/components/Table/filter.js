import { panel } from './panel'
/**
 * 带过滤表头渲染方法
 *
 * @param {*} h
 * @param {*} { column, $index, store, _self }
 */
function renderFilter(h, { column, $index, store, _self }) {
  return h('div', {
    style: {
      'position': 'relative',
      'box-sizing': 'border-box',
      'padding': '0 10px'
    }
  }, [
    h('span', {}, column.label ),
    h('i', {
      class: {
        'el-icon-arrow-down': true
      },
      style: {
        'position': 'absolute',
        'right': '0',
        'top': '5px',
        'cursor': 'pointer'
      },
      on: {
        click (ev) {
          console.log(_self);
          console.log(column);
          let { top, left } = ev.target.getBoundingClientRect()
          panel.open({
            top,
            left,
            name: _self.name,
          })
        }
      }
    })
  ])
}
export { renderFilter }