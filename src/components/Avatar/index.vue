<template>
  <div class="x-avatar" :title="name">
    <img :src="src || defaultAvatar" alt="">
    <span>{{ name }}</span>
  </div>
</template>
<script>
export default {
  name: 'XAvatar',
  props: {
    name: String,
    src: String
  },
  data () {
    return {
      defaultAvatar: require('../Select/yg/defaultavatar.svg')
    }
  }
}
</script>
<style scoped>
.x-avatar{
  width: 100%;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.x-avatar img{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 5px;
}
.x-avatar span{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
}
</style>