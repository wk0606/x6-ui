<template>
  <div class="x6-layout">
    <x-nav :collapse="collapse"/>
    <div class="x6-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import XNav from './Nav/index'
export default {
  name: 'Nav',
  data () {
    return {
      collapse: false
    }
  },
  components: { XNav }
}
</script>
<style lang="css">
.x6-layout{
  width: 100vw;
  height: 100vh;
  display: flex;
}
.x6-view{
  flex-grow: 1;
  box-sizing: border-box;
  padding: 15px;
  overflow-y: auto;
}
</style>
