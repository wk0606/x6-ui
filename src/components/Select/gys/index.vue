<template>
  <div>
    <span>供应商</span>
    <el-select
      v-model="value"
      filterable
      remote
      placeholder="请选择供应商"
      suffix-icon="el-icon-search"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        <SelectCell :options="$attrs" :data="item"/>
      </el-option>
      <slot />
    </el-select>
  </div>
</template>
<script>
import SelectCell from './render'
export default {
  name: 'SelectGys',
  data() {
    return {
      options: [
        {
          id: 1,
          name: '苹果苏州分公司苹果苏州分公司苹果苏州分公司',
          lxr: '安培',
          phone: '13562211220',
          ye: 25151
        },
        {
          id: 2,
          name: '华为苏州分公司',
          lxr: '法拉第',
          phone: '13562211220',
          ye: 23
        },
        {
          id: 3,
          name: '小米苏州分公司',
          lxr: '麦克斯韦',
          phone: '13562211220',
          ye: 11
        },
        {
          id: 4,
          name: 'oppo苏州分公司',
          lxr: '高斯',
          phone: '13562211220',
          ye: 152
        },
        {
          id: 5,
          name: 'vivo苏州分公司',
          lxr: '傅里叶',
          phone: '13562211220',
          ye: 1
        }
      ],
      value: '',
      loading: false,
    }
  },
  components: { SelectCell },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true

      } else {
        this.loading = false
        this.options = []
      }
    },
  }
}
</script>
<style lang="css">
  
</style>