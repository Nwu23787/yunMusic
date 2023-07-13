import Vue from 'vue'
import App from './App.vue'
// import draft from './draft.vue'
import '@/mobile/flexible'//rem适配
import '@/styles/reset.css'//去除浏览器默认样式
import router from '@/router'
// 引入全部样式
import 'vant/lib/index.less';
import '@/styles/fonts/iconfont.css'
//引入vuex
import Vuex from 'vuex'
import axios from "axios";

import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, CellGroup, Icon, Search, Tab, Tabs, Field, Button, List, Form, RadioGroup, Radio, Toast, Popup } from 'vant';

Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Field);
Vue.use(Button);
Vue.use(List);
Vue.use(Form);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Toast);
Vue.use(Popup);

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    chatList: [{
      robotWords: '你好，我是你的语音助手，请问有什么可以帮您？',
    }],
    imgChatList: [],
    style: '写实风格'
  },
  mutations: {
    addUserWords(state, payload) {
      state.chatList[state.chatList.length - 1].userWords = payload
      state.chatList.push({})
      state.chatList.splice(state.chatList.length - 1, 1)
    },
    addRobotList(state, payload) {
      state.chatList.push({
        robotWords: payload
      })
    },
    addImgUserWords(state, payload) {
      // state.imgChatList[state.imgChatList.length - 1].userWords = payload
      state.imgChatList.push({
        userWords: payload
      })
      console.log(11);

      console.log(state.imgChatList);
    },
    addImgList(state, payload) {
      state.imgChatList[state.imgChatList.length - 1].imgSrc = payload
      state.imgChatList.push({})
      state.imgChatList.splice(state.imgChatList.length - 1, 1)
      console.log(payload);
    },
    //改变风格
    changeStyle(state, payload) {
      state.style = payload
    }
  },
  actions: {
    async getRobotWords(context, params) {
      const res = await axios.post(
        "https://api.openai-proxy.org/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: params }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "请使用你的chatGPT token",
          },
        }
      );
      console.log(res);
      context.commit('addRobotList', res.data.choices[0].message.content)
    },
    //params要包含用户输入的信息text和选择的风格style
    async getImgSrc(context, params) {
      //发起创建图片的请求
      const res = await axios.post(
        'https://aip.baidubce.com/rpc/2.0/ernievilg/v1/txt2img?access_token=24.95ddfedbbb619f78c67dc129888296b1.2592000.1689665724.282335-34985089',
        {
          text: params,
          style: context.state.style,
          resolution: "1024*1024",
          num: 1
        },
        {
          heaaders: {
            'Content-Type': 'application/json',
          }
        }
      )
      // 获取到taskID
      const taskId = res.data.data.taskId
      //检查图片是否生成好
      let waitTime = 1
      let result = ''
      //waitTime不等于0的时候，每两秒检查一次图片是不是完成了
      let timmer = setInterval(async () => {
        result = await axios.post(
          '使用百度AI',
          {
            taskId
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        waitTime = result.data.data.waiting
        console.log(waitTime);
        console.log(typeof waitTime);
        if (waitTime == 0) {
          clearInterval(timmer)
          console.log('等于0了');
          context.commit('addImgList', result.data.data.imgUrls[0].image)
        }
      }, 2000);
      //图片生成成功之后，清除定时器，把url地址添加到队列中
      // while (1) {
      //   if (waitTime == 0) {
      //     clearInterval(timmer)
      //     console.log('等于0了');
      //     context.commit('addImgList', result.data.data.imgUrls[0].image)
      //     break
      //   }
      // }

    }
  },

})


Vue.config.productionTip = false





new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
