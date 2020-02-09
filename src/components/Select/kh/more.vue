<template>
  <x-dialog :visible.sync="visible" title="选择供应商" @confirm="save">
    <div slot="content"></div>
  </x-dialog>
</template>
<script>
export default {
  name: 'MoreGys',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    openMoreDialog () {
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
