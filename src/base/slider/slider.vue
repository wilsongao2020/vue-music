<template>
    <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" v-bind:key="item"></span>
    </div>
  </div>
</template>

<script>
import {addClass} from '@/assets/js/dom'
import Bscroll from 'better-scroll'
import { setTimeout, clearTimeout } from 'timers';
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
            currentPageIndex: 0
        }
    },
    mounted() {
        setTimeout(() => {
						this._setSlideWidth ()
						this._initDots()
            this._initSlider()
            if(this.autoPlay) {
              this._play()
            }      
        }, 20)

        window.addEventListener('resize',()=>{
          if(!this.slider) {
            return
          }
          this._setSlideWidth(true)
          this.slider.refresh()
        })
    },
    methods: {
        // 初始化宽度
        _setSlideWidth (isResize) {
            // 获取sliderGroup子元素
            this.children = this.$refs.sliderGroup.children
            // 定义width
            let width = 0
            // 获取slider对象内容的可视区的宽度
            // 不包括滚动条边线，会随对象显示大小的变化而变化
            let sliderWidth = this.$refs.slider.clientWidth
            // 给每个child添加样式
            for(let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                // 给每个子元素添加slider-item的样式
                addClass(child, 'slider-item')
                // 设置每个child的宽度
                child.style.width = sliderWidth + 'px'
                // 计算总的宽度
                width += sliderWidth
            }    
            // 如果loop为真宽度添加2倍的slidewidth
            if(this.loop && !isResize) {
                width += 2 * sliderWidth
            }
            // 把widh赋值给slideGroup的width
            this.$refs.sliderGroup.style.width = width + 'px'
				},
				// 初始化dots
				_initDots() {
					this.dots = new Array(this.children.length)
				},
				// 初始化Slider
				_initSlider() {
					this.slider = new Bscroll(this.$refs.slider, {
						scrollX: true,
						scrollY: false,
						momentum: false,
						snap: true,
						snapLoop: this.loop,
						snapThreshold: 0.3,
            snapSpeed: 400,
            click: true
					})
					// 当页面切换的时候,绑定dots
					this.slider.on('scrollEnd', () => {
						let pageIndex = this.slider.getCurrentPage().pageX
						if(this.loop) {
							pageIndex -= 1
						}
            this.currentPageIndex = pageIndex
            if(this.autoPlay) {
              clearTimeout(this.timer)
              this._play()
            }
					})
        },
        // 自动播放
        _play() {
          let pageIndex = this.currentPageIndex + 1
          if (this.loop) {
            pageIndex += 1
          }
          this.timer = setTimeout(()=>{
            this.slider.goToPage(pageIndex, 0, 400)
          }, this.interval)
        }
    },
    destroyed() {
      clearTimeout(this.timer);
    }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/variable'
.slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>