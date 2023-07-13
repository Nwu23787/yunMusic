<template>
  <div class="main">
    <div v-for="(obj, index) in chatList" :key="index">
      <RobotSayVue :words="obj.robotWords" v-if="obj.robotWords"></RobotSayVue>
      <UserSayVue :words="obj.userWords" v-if="obj.userWords"></UserSayVue>
    </div>
    <div id="end"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserSayVue from "@/components/UserSay.vue";
import RobotSayVue from "@/components/RobotSay.vue";
export default {
  components: {
    RobotSayVue,
    UserSayVue,
  },
  computed: {
    ...mapState(["chatList"]),
  },
  watch: {
    chatList: {
      deep: true,
      handler() {
        console.log(11);
        document.getElementById("end").scrollIntoView(false);
        console.log(22);
      },
    },
  },
};
</script>

<style scoped>
.main {
  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
  padding-top: 0.2667rem;
  /* padding-bottom: 2rem; */
  overflow: hidden;
}
#end {
  margin-top: 150px;
  padding-bottom: 50px;
}
</style>