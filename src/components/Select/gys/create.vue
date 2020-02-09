<template>
  <x-dialog :visible.sync="visible" title="新增供应商" @confirm="save">
    <div slot="content"></div>
  </x-dialog>
</template>
<script>
export default {
  name: 'CreateGys',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    openAddDialog () {
      this.visible = true
    },
    save () {
      console.log(45678)
    }
  }
}
</script>
<style scoped>

</style>
