import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '@/views/LayOut'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'
import Robot from '@/views/Robot'
import Chat from '@/views/Robot/Robot_components/Chat.vue'
import CreateImg from '@/views/Robot/Robot_components/CreateImg.vue'
import User from '@/views/User'
import Register from '@/views/Register'
import Login from '@/views/Login'
import { Toast } from 'vant'
import VisitHistory from '@/views/visitHistory'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: LayOut,
        redirect: '/layout/home',
        children: [
            {
                path: 'search',
                component: Search,
                meta: {
                    title: '搜索'
                }
            },
            {
                path: 'home',
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: 'history',
                component: VisitHistory,
                meta: {
                    title: '播放记录',
                    showBack: '返回'
                }
            },
            {
                path: 'user',
                component: User,
                meta: {
                    title: '我的'
                },
                //设置路由守卫，判断是否登录了
                beforeEnter: (to, from, next) => {
                    if (!localStorage.getItem('token')) {
                        Toast('请先登录！')
                        next('/layout/login')
                    } else {
                        next()
                    }
                }
            },
            {
                path: 'register',
                component: Register,
                meta: {
                    title: '注册'
                }
            },
            {
                path: 'login',
                component: Login,
                meta: {
                    title: '登录',
                }
            },
            {
                path: 'robot',
                component: Robot,
                redirect: '/layout/robot/chat',
                meta: {
                    title: 'Chat GPT'
                },
                children: [
                    {
                        path: 'chat',
                        component: Chat,
                        meta: {
                            title: 'Chat GPT',
                            name: 'chat'
                        },
                    },
                    {
                        path: 'create',
                        component: CreateImg,
                        meta: {
                            title: 'Chat GPT',
                            name: 'create'
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '/play',
        component: Play
    }
]

const router = new VueRouter({ routes })

export default router 