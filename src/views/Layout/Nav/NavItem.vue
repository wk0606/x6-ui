<template>
  <div>
    <template v-for="item in menus">
      <el-menu-item v-if="!item.children" :index="item.path" :key="item.index">
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-if="item.children && item.children.length > 0" :index="item.path" :key="item.index">
        <template slot="title">
          <i v-if="item.icon" :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <nav-item :menus="item.children"/>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name: 'NavItem',
  props: {
    menus: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
