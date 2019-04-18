<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <Slider>
            <!-- 通过后备插槽显示图片 -->
            <div v-for="item in recommends" v-bind:key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <ul>
            <li v-for="item in discList" :key="item.dissid" class="item">
              <div class="icon">
                <img width="60" height="60" @load="loadImage" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../base/scroll/scroll"
import { getRecommend, getDiscList } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import Slider from "@/base/slider/slider";
import { setTimeout } from 'timers';
import Loading  from '@/base/loading/loading'

export default {
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created() {
    this._getRecomment();
    this._getDiscList();
  },
  methods: {
    _getRecomment() {
      // getRecoment返回的是promise
      // 通过then方法对promise继续进行操作
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data.list);
          this.discList = res.data.list;
        }
      });
    },
    // 图片加载后重新刷新scroll
    loadImage() {
      if (!this.checkLoaded)
        this.$refs.scroll.refresh()
        this.checkLoaded = true
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>