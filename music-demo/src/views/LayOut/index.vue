<template>
  <div style="overflow: hidden">
    <van-nav-bar
      :title="activeTitle"
      v-if="activeTitle != 'Chat GPT'"
      :left-text="isHistory"
      @click-left="onClickLeft"
    />
    <!-- <van-nav-bar :title="activeTitle" v-else /> -->
    <div class="chatgpt_nav_bar" v-else>
      <div class="van-nav-bar__content">
        <div class="van-nav-bar__title van-ellipsis">Chat GPT</div>
      </div>
    </div>

    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/layout/home" fixed placeholder
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="search" replace to="/layout/search"
        >搜索</van-tabbar-item
      >
      <van-tabbar-item icon="chat-o" replace to="/layout/robot/chat"
        >ChatGPT</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" replace to="/layout/user"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      activeTitle: this.$route.meta.title,
      //只有在拜访记录界面才会显示返回
      isHistory: "",
    };
  },
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title;
      this.isHistory = this.$route.meta.showBack;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push("/layout/user");
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-bottom: 50px;
}

.chatgpt_nav_bar {
  position: fixed;
  z-index: 1;
  line-height: 22px;
  text-align: center;
  background-color: #fff;
  user-select: none;
  width: 100%;
}
</style>