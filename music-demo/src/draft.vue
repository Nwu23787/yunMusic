<template>
  <div class="main">
    <RobotSayVue :words="say"></RobotSayVue>
    <UserSayVue></UserSayVue>
    <RobotSayVue :words="say"></RobotSayVue>
    <UserSayVue></UserSayVue>
    <RobotSayVue :words="say"></RobotSayVue>
    <UserSayVue></UserSayVue>
  </div>
</template>

<script>
import RobotSayVue from "./components/RobotSay.vue";
import UserSayVue from "./components/UserSay.vue";
export default {
  components: {
    RobotSayVue,
    UserSayVue,
  },
  data() {
    return {
      say: "你好，我是你的智慧助手，请问有什么可以帮您？你好，我是你的智慧助手，请问有什么可以帮您？你好，我是你的智慧助手，请问有什么可以帮您？你好，我是你的智慧助手，请问有什么可以帮您？",
    };
  },
};
</script>

<style scoped>
.main {

  background-color: #f5f2f2;
  box-sizing: border-box;
  padding: 10px 0;
  margin-bottom: 3.2rem;
  overflow: hidden;
}
</style>