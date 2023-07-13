<template>
  <van-cell center :title="name" :label="author + '  ' + name">
    <template #right-icon>
      <van-icon name="play-circle-o" size="0.6rem" @touchstart="playFn" />
    </template>
  </van-cell>
</template>

<script>
import { addHistoryAPI } from "@/api";
export default {
  props: {
    name: String, //歌名
    author: String, //作者名
    id: Number, //歌曲id
  },
  methods: {
    //判断目前的登录状态
    async playFn() {
      if (localStorage.getItem("token")) {
        //已登录
        const res = await addHistoryAPI({
          id: this.id,
          name: this.name,
          author: this.author,
        });
        if (res.data.status !== 0) {
          console.log("添加历史记录失败");
        }
      }
      //未登录就继续向下执行
      this.$router.push({
        path: "/play",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.search-icon {
  font-size: 24px;
  line-height: inherit;
}
</style>