import Vue from 'vue'
const clickoutsideContext = '@@clickoutsideContext'
Vue.directive('drag', {
  inserted (el, bind) {
    el.style.left = (document.body.offsetWidth - bind.value.width) / 2 + 'px'
    el.style.top = bind.value.top + 'px'
    let target = el.children[0]
    target.style.cursor = 'move'
    let sx, sy
    target.addEventListener('mousedown', start)
    function start () {
      sx = event.clientX
      sy = event.clientY
      document.body.addEventListener('mousemove', move)
      document.body.addEventListener('mouseup', end)
    }
    function move () {
      el.style.left = parseInt(el.style.left) + (event.clientX - sx) + 'px'
      el.style.top = parseInt(el.style.top) + (event.clientY - sy) + 'px'
      sx = event.clientX
      sy = event.clientY
    }
    function end () {
      el.style.left = parseInt(el.style.left) + (event.clientX - sx) + 'px'
      el.style.top = parseInt(el.style.top) + (event.clientY - sy) + 'px'
      sx = event.clientX
      sy = event.clientY
      document.body.removeEventListener('mousemove', move)
      document.body.removeEventListener('mouseup', end)
    }
  }
})
Vue.directive('x6-loading', {
  inserted(el, binding) {
    const tempDiv = document.createElement('div')
    tempDiv.className = 'x6-loading'
    const round = document.createElement('div')
    round.className = 'x6-loading-round'
    const text = document.createElement('span')
    text.className = 'x6-loading-text'
    text.innerText = binding.value.text || '加载中...'
    tempDiv.appendChild(round)
    tempDiv.appendChild(text)
    el.loadingElement = tempDiv
    const curStyle = window.getComputedStyle(el)
    const position = curStyle.position
    if (position === 'absolute' || position === 'relative') {
      el.style.position = position
    } else {
      el.style.position = 'relative'
    }
    // if (binding.value) {
    //   el.appendChild(tempDiv)
    // }
  },
  update(el, binding) {
    if (binding.value.loading) {
      if (el.loadingElement.parentNode === null) {
        el.appendChild(el.loadingElement)
      }
    } else {
      if (el === el.loadingElement.parentNode) {
        el.removeChild(el.loadingElement)
      }
    }
  },
  unbind(el, binding) {
    if (el.loadingElement.parentNode === el) {
      el.removeChild(el.loadingElement)
    }
    el.loadingElement = null
  }
})
Vue.directive('clickoutside', {
  bind (el, binding, vnode) {
    const documentHandler = function(e) {
      if(!vnode.context || el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        vnode.context[el[clickoutsideContext].methodName](e)
      } else {
        el[clickoutsideContext].bindingFn(e)
      }
    }
    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    }
    setTimeout(() => {
      document.addEventListener('click', documentHandler)
    }, 0)
  },
  update (el, binding) {
    el[clickoutsideContext].methodName = binding.expression
    el[clickoutsideContext].bindingFn = binding.value
  },
  unbind(el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler)
  }
})
