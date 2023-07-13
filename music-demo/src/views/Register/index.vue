<template>
  <div>
    <van-form
      validate-first
      @failed="onFailed"
      @submit="onSubmit"
      ref="checkForm"
    >
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
      <van-field
        v-model="phoneNum"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ pattern, message: '请输入正确的手机号' }]"
        autocomplete="off"
      />
      <van-field
        v-model="code"
        name="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        autocomplete="off"
        required
        :rules="[{ validator, message: '请填写正确的验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary" @click.prevent="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info">注册</van-button>
      </div>
    </van-form>
    <div class="toLog">
      <a :href="toLogin" class="login">已有账号？去登录</a>
    </div>
  </div>
</template>

<script>
import { userRegesterAPI } from "@/api";
import { Toast } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      phoneNum: "",
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      code: "",
      verificationCode: "",
      haveSentCode: false,
      toLogin: window.location.origin + "#/layout/login",
    };
  },
  methods: {
    //验证码校验
    validator() {
      //没发生过验证码，直接返回错误
      if (this.haveSentCode === false) {
        return false;
      } else {
        // 已发送验证码，进行正则校验
        const r = `^${this.verificationCode}$`;
        const reg = new RegExp(r);
        const res = reg.test(this.code);
        if (res === false) {
          Toast.fail("验证码错误");
        }
        return res;
      }
    },
    async onSubmit() {
      const res = await userRegesterAPI({
        username: this.username,
        password: this.password,
        phoneNum: this.phoneNum,
      });
      if (res.data.status === 1) {
        return Toast.fail(res.data.message);
      } else if (res.data.status === 0) {
        //注册成功
        Toast.success(res.data.message);
        //同一个验证码不能二次使用
        this.haveSentCode = false;
        //三秒后自动跳转登录页
        setTimeout(() => {
          this.$router.push("/layout/login");
        }, 3000);
      }
    },
    onFailed(errorInfo) {
      Toast.fail(`${errorInfo.errors[0].message}`);
    },
    //发送验证码
    async sendCode() {
      if (
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.phoneNum
        )
      ) {
        const res = await axios({
          url: "http://127.0.0.1:3008/users/getCode",
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: {
            phoneNum: this.phoneNum,
          },
        });
        if (res.data.code === 2) {
          Toast.success("已发送");
          this.verificationCode = res.data.verificationCode;
          //已发送验证码
          this.haveSentCode = true;
        } else {
          Toast.fail("发送失败，请稍后再试");
        }
      } else {
        return Toast.fail("请输入正确的手机号");
      }
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

