import Vue from 'vue'
import Vuex from 'vuex'
import FilterModule from './modules/table-filter'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    FilterModule
  }
})
export default store