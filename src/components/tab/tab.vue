<template>
    <div class="tab">
        <router-link to="/recommend" class="tab-item">
          <span class="tab-link">推荐</span>
        </router-link>
        <router-link to="/rank" class="tab-item">
          <span class="tab-link">排行</span>
        </router-link>
        <router-link to="/singer" class="tab-item">
          <span class="tab-link">歌手</span>
        </router-link>
        <router-link to="/search" class="tab-item">
          <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/variable';

.tab {
    width: 100%;
    display: flex
    height 44px
    .tab-item {
        // flex属性是
        // flex-grow 定义项目的放大比例,默认为0,表示如果存在剩余空间,也不放大
        // 如果所有项目的flex-grow属性为1,则他们将等分剩余空间,如果有一项目的
        // flex-grow属性为2,其他项目都为1,则前者占据的剩余空间将比其他多一倍
        // flex-shrink 定义了项目的缩小比列,默认为1,表示如果空间不足,
        // 该项目将缩小,如果有其他的项目为0,那么当空间不足时候,为0的项目不缩小维持不变
        // flex-basic 定义了在分配多余空间之前,项目占据的主轴空间
        // 浏览器根据这个属性,计算主轴是否有多余空间,默认为auto,表示项目的本来大小
        // 简写
        flex: 1
        text-align center
        line-height 44px
        .tab-link{
            padding-bottom: 5px
            color: $color-text-l
        } &.router-link-active {
            .tab-link{
                color: $color-theme
                border-bottom: 2px solid $color-theme 
            } 
        }               
    }
}
</style>