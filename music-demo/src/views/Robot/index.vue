<template>
  <div class="main">
    <van-tabs v-model="activeName" style="margin-top: 46px">
      <van-tab title="聊天" name="chat" to="/layout/robot/chat"></van-tab>
      <van-tab
        title="生成图片"
        name="create"
        to="/layout/robot/create"
      ></van-tab>
    </van-tabs>
    <router-view></router-view>
    <div class="myInput">
      <van-cell-group>
        <van-field
          v-model="value"
          type="textarea"
          center
          autosize
          clearable
          left-icon="smile-comment-o"
          placeholder="Chat with me ..."
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              icon="plus"
              round
              @click="sendInput"
              >发送</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <!-- <van-field
      v-model="value"
      placeholder="Chat with me ..."
      left-icon="smile-comment-o"
      clearable
    />
    <template #button>
      <van-button size="small" type="primary">Send</van-button>
    </template> -->
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      // active: 0,
      value: "",
      activeName: this.$route.meta.name,
    };
  },
  methods: {
    ...mapActions(["getRobotWords", "getImgSrc"]),
    ...mapMutations(["addUserWords", "addImgUserWords"]),
    async sendInput() {
      //判断现在是什么界面
      if (this.activeName === "chat") {
        //首先把用户的话加入队列
        this.addUserWords(this.value);
        const val = this.value;
        this.value = "";
        this.getRobotWords(val);
      } else if (this.activeName === "create") {
        //是图片生成页
        this.addImgUserWords(this.value);
        const val = this.value;
        this.value = "";
        //进行图片生成
        this.getImgSrc(val);
      }
    },
  },
};
</script>

<style scoped>
.main {
  min-height: 500px;
}
.myInput {
  position: fixed;
  width: 100%;
  bottom: 1.3067rem;
  left: 0;
}
::v-deep .van-field__left-icon .van-icon,
.van-field__right-icon .van-icon {
  color: rgb(148, 148, 148);
  font-size: 1.0667rem;
  margin-right: 0.2667rem;
}

::v-deep .van-field__body {
  font-size: 0.3733rem;
}

::v-deep .van-tabs__line {
  z-index: 0;
}
</style>