import { UserLayout, TabLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'
import CommunityView from '@comp/layouts/CommunityView'

export const asyncRouterMap = []
/**
 * 社区路由
 */
export  const communityMap = [
  // community
  {
    path: '/community',
    component: CommunityView,
    name: 'account',
    meta: { title: '社区主页', icon: 'user', keepAlive: true, permission: ['user'] },
    children: [
      {
        path: '/forum',
        name: 'forum',
        component: () => import('@/components/Forum'),
        meta: { title: '论坛', keepAlive: true, permission: ['user'] }
      },
      {
        path: '/daily',
        name: 'daily',
        component: () => import('@/components/Daily'),
        meta: { title: '日常物品', hideHeader: true, keepAlive: true, permission: ['user'] },
      },
      {
        path: '/dailyDetail',
        name: 'dailyDetail',
        component: () => import('@/components/DailyDetail'),
        meta: { title: '日常物品详情页', keepAlive: true, permission: ['user'] }
      },
      {
        path: '/skill',
        name: 'skill',
        component: () => import('@/components/Skill'),
        meta: { title: '生活技能', hideHeader: true, keepAlive: true, permission: ['user'] },
      },
      {
        path: '/skillDetail/:id',
        name: 'skillDetail',
        component: () => import('@/components/SkillDetail'),
        meta: { title: '生活技能详情页', keepAlive: true, permission: ['user'] }
      },
      {
        path: '/wish',
        name: 'wish',
        component: () => import('@/components/Wish'),
        meta: { title: '日常物品', hideHeader: true, keepAlive: true, permission: ['user'] },
      },
      {
        path: '/notification',
        name: 'notification',
        component: () => import('@/components/Notification'),
        meta: { title: '通知', hideHeader: true, keepAlive: true, permission: ['user'] },
      }
    ]
  }
]
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  }
].concat(communityMap)
