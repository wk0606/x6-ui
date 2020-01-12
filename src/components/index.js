import XSelect from './Select/index'

const components = [
  XSelect
]

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '1.0.0',
  install
}