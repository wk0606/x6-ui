import Vue from 'vue'
import _Panel from './panelTemplate'
const PanelAction = Vue.extend(_Panel)
let panelInstance = null
const panel = {
  open(options) {
    panelInstance = new PanelAction({
      propsData: options
    })
    panelInstance.$mount()
    document.body.appendChild(panelInstance.$el)
    return panelInstance
  }
}
export { panel }