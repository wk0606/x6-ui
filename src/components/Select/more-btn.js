export default {
  name: 'MoreBtn',
  render (h) {
    return h('div', {
      style: {
        'display': 'flex',
        'justify-content': 'flex-end',
        'box-sizing': 'border-box',
        'padding': '10px',
        'margin-top': '-10px',
        'border-bottom': '1px solid #f2f2f2'
      }
    }, [
      h('span', {
        style: {
          'padding': '3px 10px 5px 10px',
          'border-radius': '4px',
          'border': '1px solid #bfbfbf',
          'color': '#bfbfbf',
          'cursor': 'pointer'
        },
        class: {
          'x6-more-btn': true
        },
        on: {
          click() {
            console.log(this);
          }
        }
      }, 'more')
    ])
  }
}