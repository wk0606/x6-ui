<template>
    <div class="x6-input" :class="{[`x6-input_${size}`]: true, 'x6-input_edit': editable}">
        <input
            v-if="editable"
            class="x6-input_inner"
            :class="{[`x6-input_${size}`]: true}"
            :placeholder="placeholder"
            v-model="val"
            @blur="blur"
            @focus="focus"
            @input="input"/>
        <span v-else>{{ formatValue('') }}</span>
        <div v-if="visible" class="x6-input_assist">{{ formatCardNumber }}</div>
    </div>
</template>
<script>
import { props } from './props'
export default {
    name: 'XInput',
    props,
    data() {
        return {
            val: this.value,
            visible: false,
        }
    },
    computed: {
        setInputType() {

        },
        formatCardNumber() {
            let s = ''
            let val = this.val.toString()
            for (let i = 0;i < val.length; i++) {
                s += val[i]
                if (i % 3 === 0 && i !== 0) {
                    s += ' '
                }
            }
            return s
        }
    },
    methods: {
        blur() {
            this.val = this.formatValue(this.value)
            this.visible = false
            this.$emit('input', this.val)
            this.$emit('blur')
        },
        focus() {
            if (this.type === 'card') {
                this.visible = true
            }
        },
        input() {
            if (this.type === 'card') {
                this.visible = !!this.val || this.val === 0 ? true : false
            }
        },
        formatValue(initVal) {
            if (this.type === 'number') {
                let val = parseFloat(this.val)
                if (isNaN(val)) {
                    return initVal
                } else {
                    return val
                }
            } else if (this.type === 'currency') {
                let val = parseFloat(this.val)
                if (isNaN(val)) {
                    return initVal
                } else {
                    return val.toFixed(this.decimalLength)
                }
            } else {
                return this.val
            }
        }
    }
}
</script>
<style scoped>
.x6-input{
    position: relative;
    font-size: 12px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    border-radius: 4px;
    text-align: left;
    padding: 0 10px;
    border: 1px solid #DCDFE6;
}4
input::placeholder{
    color: #999;
}
.x6-input_edit{
    
}
.x6-input_inner{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    width: 100%;
    border: none;
}
.x6-input_large{
    height: 40px;
    line-height: 40px;
}
.x6-input_small{
    height: 30px;
    line-height: 30px;
}
.x6-input_mini{
    height: 25px;
    line-height: 25px;
}
.x6-input_assist{
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #f18031;
    opacity: .5;
    box-sizing: border-box;
    padding: 2px 10px;
    font-size: 15px;
    font-weight: bold;
    color: red;
}
</style>