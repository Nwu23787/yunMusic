<template>
  <div class="talk_list" style="top: 0px">
    <li class="left_word">
      <i class="iconfont icon-AIROBOT"></i>
      <span>{{ words }}</span>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    words: String,
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

.icon-AIROBOT {
  font-size: 33px !important;
  float: left;
  margin-left: 10px;
}

.talk_list {
  width: 100%;
}

.talk_list li {
  overflow: hidden;
  margin: 20px 0px 30px;
}

.talk_list .left_word img {
  float: left;
  margin-left: 20px;
}

.talk_list .left_word span {
  float: left;
  background-color: #ffffff;
  padding: 10px 15px;
  max-width: 220px;
  border-radius: 12px;
  font-size: 16px;
  color: #000;
  margin-left: 13px;
  position: relative;
  line-height: 24px;
}

.talk_list .left_word span:before {
  content: "";
  position: absolute;
  left: -8px;
  top: 3px;
  width: 13px;
  height: 12px;
  background: url("@/assets/corner01.png") no-repeat;
}
</style>