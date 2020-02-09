<template>
  <div class="x6-nav" :style="{'background-color': backgroundColor}">
    <el-scrollbar class="x6-scroll-bar" :style="{width: collapse ? '65px' : '200px'}">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        text-color="#fff"
        active-text-color="#ffd04b"
        :show-timeout="200"
        :background-color="backgroundColor"
        :collapse="collapse"
        :router="true">
        <nav-item :menus="navs" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import NavItem from './NavItem'
export default {
  name: 'Nav',
  props: {
    backgroundColor: {
      type: String,
      default: '#545c64'
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components: { NavItem },
  data () {
    return {
      navs: [
        {
          label: 'select组件',
          icon: 'el-icon-menu',
          path: '/select-comp',
          children: [
            { label: '供应商', path: '/select-comp/gys' },
            { label: '公司', path: '/select-comp/gs' },
            { label: '成员/员工', path: '/select-comp/yg' },
            { label: '运营商', path: '/select-comp/yys' },
            { label: '客户', path: '/select-comp/kh' },
            { label: '消费者', path: '/select-comp/xfz' },
            { label: '商品', path: '/select-comp/sp' },
            { label: '套餐', path: '/select-comp/tc' },
            { label: '账户', path: '/select-comp/zh' },
          ]
        },
        {
          label: 'input组件',
          path: '/input-comp',
          icon: 'el-icon-menu'
        },
        {
          label: 'table组件',
          path: '/table-comp',
          icon: 'el-icon-menu'
        }
      ]
    }
  }
}
</script>
<style lang="css">
.x6-scroll-bar {
  height: 100vh;
  transition: width 0.3s;
}
.x6-scroll-bar .el-scrollbar__wrap{
  overflow-x: hidden;
  overflow-y: scroll;
}
.x6-scroll-bar .el-menu {
  border-right: none;
}
.x6-nav-item {
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  color: #fff;
}
</style>
