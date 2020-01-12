// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import X6UI from './components/index'
import './style/common.css'
import { util } from './server/util'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(X6UI)
Vue.prototype.$util = util
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
