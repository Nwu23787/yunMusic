<template>
  <div>
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        autocomplete="off"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        autocomplete="off"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="toLog">
      <a :href="toRegister" class="login">没有账号？去注册</a>
    </div>
  </div>
</template>

<script>
import { userLoginAPI } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      toRegister: window.location.origin + "#/layout/register",
    };
  },
  methods: {
    async onSubmit() {
      const res = await userLoginAPI({
        username: this.username,
        password: this.password,
      });
      if (res.data.status === 0) {
        Toast.success("登录成功");
        // 存储token到localstorage
        localStorage.setItem("token", res.data.token);
        //两秒之后自动跳转到 我的 界面
        setTimeout(() => {
          this.$router.push("/layout/user");
        }, 2000);
      } else {
        Toast.fail(res.data.message);
      }
    },
    onFailed(errorInfo) {
      Toast.fail(errorInfo.errors[0].message);
    },
  },
};
</script>

<style scoped>
.login {
  color: rgb(240, 166, 114);
  font-size: 10px;
}
.toLog {
  text-align: center;
}
</style>