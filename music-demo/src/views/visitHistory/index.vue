<template>
  <div>
    <van-cell-group>
      <SongItem
        v-for="obj in musicList"
        :key="obj.id"
        :name="obj.name"
        :author="obj.author"
        :id="obj.id"
      ></SongItem>
    </van-cell-group>
  </div>
</template>

<script>
import SongItem from "@/components/SongItem.vue";
import { getHistoryAPI } from "@/api";
export default {
  data() {
    return {
      musicList: [],
    };
  },
  components: {
    SongItem,
  },
  async created() {
    const res = await getHistoryAPI();
    console.log(res);
    this.musicList = res.data.data;
  },
};
</script>

<style>
</style>