<template>
  <div>
    <div style="height: 600px;">
      <x-table
        :action-params="params"
        action="GetDmYgList"
        page-id="dmYg">
      </x-table>
    </div>
    <br/><br>
    <!-- <x-button />
    <x-button type="search" mode="text" disabled/>
    <x-button type="print" disabled/>
    <x-button type="export" size="small"/>
    <x-button type="del" :loading="true"/>
    <x-button type="prev" background="red"/>
    <x-button type="next"/>
    <x-button type="save"/>
    <x-button type="quote"/> -->
    <x-select :data="type" type="primary" label="类型" v-model="form.type" value-key="name"></x-select>
    <x-date :type="form.type" v-model="form.val"/>
    <x-button type="save" @click="show"/>
    <div>
      <h3>此组件继承自XSelect，对应的type为 ‘gys’</h3><br/>
      <p>属性说明</p>
      <p>disabled: 是否禁用，默认false</p>
      <p>addable: 是否可添加（后续此字段将废弃）</p>
      <p>editable: 是否可编辑,默认true（如果为false将显示纯文本，即下方text属性提供的值）</p>
      <p>lazyload: 数据源是否需要请求接口，默认true</p>
      <p>cacheKey: 本地缓存数据源的key（将废弃），本地数据保存在sessionstorage中，此字段为对应的key</p>
      <p>ys: 样式类型，默认为1（后续添加新样式此字段才有其他值）</p>
      <p>show-ye: 是否显示余额，默认false</p>
      <p>text: 供应商名称，仅在editable为false生效</p>
      <p style="color: red;">注: 组件值采用v-model绑定，绑定的为供应商id，请知晓</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'billtable',
  data () {
    return {
      type: [
        { name: 'date' },
        { name: 'year' },
        { name: 'month' },
        { name: 'season' },
        { name: 'week' },
      ],
      form: {
        type: 'week',
        val: ''
      },
      columns: [
        { label: '日期', prop: 'fsrq', width: '150', render: this.renderDate, filterable: true,fixed: 'left' },
        { label: '姓名', prop: 'name', width: '200' },
        { label: '状态', prop: 'status', width: '200', format: this.formatStatus, style: this.setStatusStyle },
        { label: '得分', prop: 'score', width: '', }
      ],
      List: [
        { fsrq: '2019-02-15', name: '刘备', province: '江苏省', city: '徐州市', town: '工业园区', score: 55, status: 1 },
        { fsrq: '2019-02-15', name: '关羽', province: '江苏省', city: '苏州市', town: '工业园区', score: 54, status: 2 },
        { fsrq: '2019-02-15', name: '张飞', province: '江苏省', city: '【表情】州市', town: '工业园区', score: 60, status: 3 },
      ],
      params: {
        ssgs: '0001',
        fw: 1
      }
    }
  },
  methods: {
    show() {
      console.log(this.form);
    },
    setNameStyle (row) {
      return {
        color: 'yellow'
      }
    },
    setStatusStyle (row) {
      return {
        color: row.status === 1 ? '#999' : row.status === 2 ? 'red' : 'blue'
      }
    },
    formatStatus (row, col) {
      return row.status === 1 ? '待付款' : row.status === 2 ? '已付款' : '已签收'
    },
    renderDate (h, { row, col }) {
      return h('div', {
        style: {
          color: 'red',
        }
      }, row[col.prop])
    }
  }
}
</script>
<style scoped>
p{
  line-height: 30px;
}
</style>