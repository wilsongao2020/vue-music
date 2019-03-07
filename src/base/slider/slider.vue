<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
            <div class="dots">
                <span class="dot"></span>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/js/dom'
import Bscroll from 'better-scroll'
export default { 
    name: 'slider',
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data () {
        return {
            dots: [],
            currrentPageIndex: 0
        }
    },
    mounted() {

    },
    methods: {
        // 初始化
        _setSlideWidth () {
            // 获取sliderGroup子元素
            this.children = this.$refs.sliderGroup.children
            // 定义width
            let width = 0
            // 获取slider对象内容的可视区的宽度
            // 不包括滚动条边线，会随对象显示大小的变化而变化
            let sliderWidth = this.$refs.slider.clientWidth
            // 给每个child添加样式
            
            // 设置每个child的宽度
            // 计算总的宽度
            // 如果loop为真宽度添加2倍的slidewidth
            // 把widh赋值给slideGroup的width
        }
    }
}
</script>

<style lang='stylus' scoped>

</style>