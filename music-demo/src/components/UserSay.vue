<template>
  <div class="talk_list" style="top: 0px">
    <li class="right_word">
      <i class="iconfont icon-user"></i> <span>{{ words }}</span>
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
.icon-user {
  font-size: 33px !important;
  float: right;
  margin-right: 10px;
}

.talk_list {
  /* position: absolute; */
  width: 100%;
}

.talk_list li {
  overflow: hidden;
  margin: 20px 0px 30px;
}

.talk_list .right_word img {
  float: right;
  margin-right: 20px;
}

.talk_list .right_word span {
  float: right;
  background-color: #fff;
  padding: 10px 15px;
  max-width: 230px;
  border-radius: 12px;
  font-size: 16px;
  color: #000;
  margin-right: 13px;
  position: relative;
  line-height: 24px;
}

.talk_list .right_word span:before {
  content: "";
  position: absolute;
  right: -8px;
  top: 3px;
  width: 13px;
  height: 12px;
  background: url("@/assets/corner02.png") no-repeat;
}

li {
  list-style-type: none;
}
</style>