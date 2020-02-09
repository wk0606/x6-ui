<template>
  <div>
    <div>
      <x-select type="yys" v-model="form.ysydm" :addable="true" :editable="true" :moreable="true" />
      <el-button @click="showForm">click</el-button>
    </div>
    <br/><br>
    <div>
      <h3>此组件继承自XSelect，对应的type为 ‘yys’</h3><br/>
      <p>属性说明</p>
      <p>disabled: 是否禁用，默认false</p>
      <p>addable: 是否可添加（后续此字段将废弃）</p>
      <p>editable: 是否可编辑,默认true（如果为false将显示纯文本，即下方text属性提供的值）</p>
      <p>lazyload: 数据源是否需要请求接口，默认true</p>
      <p>cacheKey: 本地缓存数据源的key（将废弃），本地数据保存在sessionstorage中，此字段为对应的key</p>
      <p>ys: 样式类型，默认为1（后续添加新样式此字段才有其他值）</p>
      <p>text: 运营商名称，仅在editable为false生效</p>
      <p style="color: red;">注: 组件值采用v-model绑定，绑定的为运营商id，请知晓</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GYS',
  data () {
    return {
      form: {
        ysydm: 158
      }
    }
  },
  methods: {
    showForm () {
      console.log(this.form)
    }
  }
}
</script>
<style scoped>
p{
  line-height: 30px;
}
</style>