<template>
  <div class="main">
    <robot-say :words="initalWords"></robot-say>
    <div v-for="(obj, index) in imgChatList" :key="index">
      <user-say :words="obj.userWords" v-if="obj.userWords"></user-say>
      <robot-pic :imgSrc="obj.imgSrc" v-if="obj.imgSrc"></robot-pic>
    </div>
    <div class="btnList">
      <van-form>
        <van-field name="radio">
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio name="写实风格"
                >写实&nbsp;&nbsp;&nbsp;&nbsp;</van-radio
              >
              <van-radio name="二次元">二次元</van-radio>
              <van-radio name="未来主义">未来主义</van-radio>
              <van-radio name="油画">油画</van-radio>
              <van-radio name="赛博朋克">赛博朋克</van-radio>
              <van-radio name="浮世绘">浮世绘</van-radio>
              <van-radio name="古风">古风</van-radio>
              <van-radio name="像素风格">像素风</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-form>
    </div>
    <div id="end"></div>
  </div>
</template>

<script>
import RobotPic from "@/components/RobotPic.vue";
import RobotSay from "@/components/RobotSay.vue";
import UserSay from "@/components/UserSay.vue";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    RobotPic,
    RobotSay,
    UserSay,
  },
  data() {
    return {
      initalWords: "你好，需要我为您生成什么图像呢？我会尽力为您创作的！",
      radio: "写实风格",
    };
  },
  methods: {
    ...mapMutations(["changeStyle"]),
  },
  watch: {
    radio() {
      this.changeStyle(this.radio);
    },
    imgChatList: {
      deep: true,
      handler() {
        console.log(11);
        document.getElementById("end").scrollIntoView(false);
        console.log(22);
      },
    },
  },
  computed: {
    ...mapState(["imgChatList"]),
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
.btnList {
  position: fixed;
  bottom: 116px;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(245, 245, 245);
}
#end {
  margin-top: 400px;
  /* padding-bottom: 250px; */
}
</style>