import XSelect from './Select/index'
import XDialog from './Dialog/index'
import XTable from './Table/index'
import XTree from './Tree/index'
import XButton from './Button/index'
import XDate from './Date/index'
import XAvatar from './Avatar/index'

const components = [
  XSelect,
  XDialog,
  XTable,
  XTree,
  XButton,
  XDate,
  XAvatar,
]

const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '1.0.0',
  install
}
