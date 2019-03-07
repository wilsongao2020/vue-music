<template>
  <div id="recommend">
    <Slider>
        <!-- 通过后备插槽显示图片 -->
        <div v-for="item in recommends" v-bind:key="item.id">
            <a :href="item.linkUrl">
                <img :src="item.picUrl" />
            </a>
        </div>
    </Slider>
  </div>
</template>

<script>
import { getRecommend } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import Slider from "@/base/slider/slider";
export default {
  data() {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  created() {
    this._getRecomment();
  },
  methods: {
    _getRecomment() {
      // getRecoment返回的是promise
      // 通过then方法对promise继续进行操作
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>
</style>