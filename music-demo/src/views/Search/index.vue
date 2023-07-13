<template>
  <div>
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="searchValue"
    />
    <!-- 搜索下容器 -->
    <div class="search_wrap" v-if="!searchValue">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotList"
          :key="index"
          @click="btn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <SongItem
          v-for="(obj, index) in resultsList"
          :key="index"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </van-list>
    </div>
  </div>
</template>
<script>
import { hotSearchAPI, searchResultsAPI } from "@/api";
import SongItem from "@/components/SongItem.vue";
export default {
  data() {
    return {
      searchValue: "",
      hotList: [],
      resultsList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  async created() {
    this.hotList = await (await hotSearchAPI()).data.result.hots;
  },
  methods: {
    async btn(str) {
      this.searchValue = str;
      this.resultsList = await (
        await searchResultsAPI({
          type: 1,
          keywords: str,
          offset: (this.page - 1) * 30,
        })
      ).data.result.songs;
      setTimeout(() => {
        clearTimeout(this.timer);
      });
    },
    async onLoad() {
      const more = await (
        await searchResultsAPI({
          type: 1,
          keywords: this.searchValue,
          offset: (this.page - 1) * 30,
        })
      ).data.result.songs;
      if (more === undefined) {
        this.finished = true;
        return;
      }
      this.resultsList = [...this.resultsList, ...more];
      this.page++;
      this.loading = false;
    },
  },
  watch: {
    searchValue(val) {
      this.finished = false;
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.searchValue) {
          this.resultsList = await (
            await searchResultsAPI({
              type: 1,
              keywords: val,
            })
          ).data.result.songs;
        } else return (this.resultsList = []);
      }, 400);
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style  scoped>
::v-deep .van-field__control {
  font-size: 14px !important;
}

/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

/* 给单元格设置底部边框 */
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>