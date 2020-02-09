<template>
    <transition name="el-fade-in-linear">
      <div v-if="show" class="x-dialog">
        <transition name="dialog">
          <div
            v-if="show2"
            class="x-dialog-content"
            :style="{width: `${width}px`}"
            v-drag="{width: width, top: top}">
            <div class="x-dialog-title" :style="{background: defaultBackground,color: defaultColor}">
              <span>{{ title }}</span>
              <i class="el-icon-close" @click="cancel"></i>
            </div>
            <div>
              <slot name="content"/>
            </div>
            <div class="x-dialog-footer">
              <span></span>
              <div>
                <el-button v-if="$listeners.confirm" size="small" type="primary">{{ confirmText }}</el-button>
                <el-button size="small" @click="cancel">{{ cancelText }}</el-button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
</template>
<script>
export default {
  name: 'XDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: String,
    defaultBackground: {
      type: String,
      default: 'rgb(84, 92, 100)'
    },
    defaultColor: {
      type: String,
      default: '#fff'
    },
    top: {
      type: Number,
      default: 200
    },
    width: {
      type: Number,
      default: 600
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      show: false,
      show2: false
    }
  },
  watch: {
    visible (nv) {
      if (nv) {
        this.show = true
        setTimeout(_ => {
          this.show2 = true
        }, 0)
      }
    }
  },
  methods: {
    cancel () {
      this.show2 = false
      setTimeout(_ => {
        this.show = false
        this.$emit('update:visible', false)
      }, 200)
    }
  }
}
</script>
<style scoped>
@import url('../../style/animate.css');
.x-dialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 3000;
    user-select: none;
}
.x-dialog-content{
  height: auto;
  position: absolute;
  border-radius: 4px;
  background: #fff;
}
.x-dialog-title, .x-dialog-footer{
  width: 100%;
  height: 4.8rem;
  box-sizing: border-box;
  padding: 0 1.5rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.x-dialog-title{
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.x-dialog-title i{
  cursor: pointer;
}
.x-dialog-footer{
  border-top: 1px solid #f2f2f2;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.dialog-enter-active{
  animation: slideInTop .3s;
}
.dialog-leave-active{
  animation: slideOutTop .3s;
}
</style>
