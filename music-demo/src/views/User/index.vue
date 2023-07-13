<template>
  <div>
    <div class="pic">
      <img src="../../assets/userImg.png" class="userImg" alt="头像加载失败" />
    </div>
    <p class="UserName">{{ username }}</p>
    <van-cell-group inset>
      <van-cell title="播放记录" is-link to="/layout/history" />
      <van-cell title="修改用户名" is-link @click="updateName" />
      <van-cell title="修改密码" is-link @click="updataPassword" />
    </van-cell-group>
    <div class="logOut">
      <van-button color="#ff6034" @click="logOut">退出登录</van-button>
    </div>
    <!-- 修改用户名弹出层 -->
    <van-popup
      v-model="alterName"
      position="bottom"
      :style="{ height: '17%' }"
      round
    >
      <div class="alter"><p>修改用户名</p></div>
      <van-form>
        <van-field
          v-model="newUsername"
          center
          autofocus:true
          clearable
          label="新用户名"
          placeholder="请输入新的用户名"
          :rules="[{ required: true, message: '用户名不能为空' }]"
          autocomplete="off"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click.prevent="submitNewName"
              >确认</van-button
            >
          </template>
        </van-field>
      </van-form>
    </van-popup>
    <!-- 修改密码弹出层 -->
    <van-popup
      v-model="alterPassword"
      position="bottom"
      :style="{ height: '38%' }"
      round
    >
      <div class="alter"><p>修改密码</p></div>
      <van-form @submit="passwordSubmit">
        <van-field
          v-model="oldPassword"
          name="旧密码"
          label="旧密码"
          placeholder="旧密码"
          type="password"
          :rules="[{ required: true, message: '请填写旧密码' }]"
          autocomplete="off"
        />
        <van-field
          v-model="newPassword"
          name="新密码"
          label="新密码"
          placeholder="新密码"
          type="password"
          :rules="[{ required: true, message: '请填写新密码' }]"
          autocomplete="off"
        />
        <van-field
          v-model="confirmPassword"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          type="password"
          :rules="[
            { required: true, message: '请再次填写新密码' },
            { validator, message: '两次输入密码不一致' },
          ]"
          autocomplete="off"
        />
        <div style="margin: 0.4267rem">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI, updateUsernameAPI, updatePasswordAPI } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      alterName: false,
      newUsername: "",
      alterPassword: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  async created() {
    console.log(11);
    const res = await getUserInfoAPI();
    if (res.data.status === 1) {
      Toast("身份认证失败，请重新登陆");
      //删除本地token
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      //销毁组件，清除缓存
      this.$destroy();
      this.$router.push("/layout/login");
    }
    this.username = res.data.username;
  },
  methods: {
    logOut() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        Toast.success("退出成功");
        setTimeout(() => {
          //销毁组件，清除缓存
          this.$destroy();
          this.$router.push("/layout/login");
        }, 3000);
      }
    },
    //修改用户名弹出层显示
    updateName() {
      this.alterName = true;
    },
    //点击提交新用户名
    async submitNewName() {
      const res = await updateUsernameAPI({ newUsername: this.newUsername });
      if (res.data.status === 0) {
        Toast.success("修改成功");
        //设置新的token
        localStorage.setItem("token", res.data.data.token);
        //1.5s后刷新界面
        setTimeout(() => {
          this.$router.go(0);
          console.log(13);
        }, 1500);
      } else {
        Toast.fail(res.data.message);
      }
      console.log(res);
    },
    updataPassword() {
      this.alterPassword = true;
    },
    //提交密码修改
    async passwordSubmit() {
      const res = await updatePasswordAPI({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      });
      if (res.data.status === 1) {
        Toast.fail(res.data.message);
      } else {
        Toast.success("修改成功！请重新登陆");
        //修改成功，自动退出登录
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
          setTimeout(() => {
            //销毁组件，清除缓存
            this.$destroy();
            this.$router.push("/layout/login");
          }, 2000);
        }
      }
    },
    //验证二次密码
    validator() {
      if (this.newPassword === this.confirmPassword) return true;
      else return false;
    },
  },
};
</script>

<style scoped>
.pic {
  margin: 0 auto;
  margin-top: 0.5333rem;
  width: 2.6667rem;
  height: 2.6667rem;
  border-radius: 1.3333rem 1.3333rem;
  overflow: hidden;
}
.UserName {
  margin: 0.2667rem auto;
  width: 100%;
  text-align: center;
  color: rgb(70, 65, 65);
  font-size: 20px;
}
.logOut {
  text-align: center;
  margin-top: 0.5333rem;
}
.userImg {
  width: 2.6667rem;
  height: 2.6667rem;
}
.alter {
  text-align: center;
  font-size: 0.4533rem;
  color: rgb(90, 89, 89);
  margin-bottom: 0.5333rem;
  margin-top: 0.1867rem;
}
</style>