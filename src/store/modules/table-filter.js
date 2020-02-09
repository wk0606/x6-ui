const state = {
  /*** 
   * 过滤器的过滤条件
   * 格式：
   * { key: [key], property: [column], value: [checkedItems] }
   * key: 表格id（pageid + pzid）
   * column: 列props
   * checkedItems: 选中项
   */
  FilterConditions: {},
  FilterRequestParams: {}, //查询过滤项的查询条件
  Source: {}, // 表格的所有数据（如果后端过滤此字段无效）
}
const mutations = {
  updateResults (state, obj) {
    console.log(656655);
    // state.FilterResults[obj[key]] = obj.value
  },
  updateConditions (state, obj) {
    if (!state.FilterConditions[obj.key]) {
      state.FilterConditions[obj.key] = {}
    }
    state.FilterConditions[obj.key][obj.property] = obj.value
  },
  clearConditions (state, obj) {
    delete state.FilterConditions[obj.key]
  },
  updateRequestParams (state, obj) {
    
  }
}

export default {
  namespaced: true,
  state,
  mutations
}