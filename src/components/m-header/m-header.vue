<template>
    <div class='m-header'>
        Chicken Music
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                message : 'this is a header'
            }
        }
    }
</script>

<style lang='stylus' scoped>
    @import '../../assets/stylus/variable'
    @import '../../assets/stylus/mixin'
      
    .m-header{
        color: $color-theme
    }
</style>