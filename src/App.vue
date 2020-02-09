<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.getAllCache()
  },
  methods: {
    getAllCache () {
      this.$api.GetAllCache({}).then(res => {
        delete res.result
        delete res.message
        this.$util.saveAllCache(res)
      })
    }
  }
}
</script>

<style>

</style>
