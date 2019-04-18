<template>
  <div></div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import { ERR_OK } from "@/api/config";
import Singer from "@/assets/js/singer.js";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = res.data.list;
          console.log(this._normalizeSinger(this.singers));
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }

        const key = item.Findex;

        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });

      //有序化处理
      let hot = [];
      let ret = [];

      //通过循环,分别把热门歌手和歌手数组分开
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      // 通过sort方法对数组进行排序
      // sort的参数函数本身接受两个参数，表示进行比较的两个数组成员。
      // 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；其他情况下，
      // 都是第一个元素排在第二个元素前面
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  }
};
</script>

<style lang='stylus' scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
