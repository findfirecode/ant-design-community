import { UserLayout, TabLayout, RouteView, BlankLayout, PageView } from '@/components/layouts'
import CommunityView from '@comp/layouts/CommunityView'
/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */
export const asyncRouterMap = [

  {
    path: '/',
    name: 'dashboard',
    component: TabLayout,
    meta: { title: '首页' },
    redirect: '/community',
    children: [
      //系统监控
      {
        path: '/sysmonitor',
        name: 'sysmonitor',
        redirect: '/sysmonitor',
        component: RouteView,
        meta: { title: '系统监控', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/sys/dataLog-list',
            name: 'DataLogList',
            component: () => import('@/views/system/DataLogList'),
            meta: { title: '数据日志', permission: [ 'dashboard' ] }
          },
          {
            path: 'http://localhost:8080/jeecg-boot/druid/',
            name: 'druid',
            component: () => import('@/views/jeecg/tablist/JeecgOrderDMainList'),
            meta: { title: 'SQL监控', permission: [ 'dashboard' ] }
          },
          {
            path: '/isystem/QuartzJobList',
            name: 'QuartzJobList',
            component: () => import('@/views/system/QuartzJobList'),
            meta: { title: '定时任务', permission: [ 'dashboard' ] }
          },
        ]
      },

      //jeecg demo
      {
        path: '/jeecg',
        name: 'jeecg',
        redirect: '/jeecg',
        component: RouteView,
        meta: { title: 'JEECG案例', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/jeecg/JeecgDemoList',
            name: 'DemoList',
            component: () => import('@/views/jeecg/JeecgDemoList'),
            meta: { title: '单表模型示例', permission: [ 'dashboard' ] }
          },
          {
            path: '/jeecg/tablist/JeecgOrderDMainList',
            name: 'JeecgOrderDMainList',
            component: () => import('@/views/jeecg/tablist/JeecgOrderDMainList'),
            meta: { title: '一对多Tab示例', permission: [ 'dashboard' ] }
          },
          {
            path: '/jeecg/JeecgOrderMainList',
            name: 'JeecgOrderMainList',
            component: () => import('@/views/jeecg/JeecgOrderMainList'),
            meta: { title: '一对多示例', permission: [ 'dashboard' ] }
          },
          {
            path: 'http://www.baidu.com',
            name: 'baidu',
            component: () => import('@/components/layouts/IframePageView'),
            meta: { title: '百度', permission: [ 'dashboard' ] }
          },
          {
            path: 'http://localhost:8080/jeecg-boot/auto/cgform/list',
            name: 'cgformtest',
            component: () => import('@/components/layouts/IframePageView'),
            meta: { title: 'online表单测试', permission: [ 'dashboard' ] }
          },
          {
            path: '/jeecg/helloworld',
            name: 'helloworld',
            hidden : true,
            component: () => import('@/views/jeecg/helloworld'),
            meta: { title: 'helloworld', permission: [ 'dashboard' ] }
          },
        ]
      },

      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', permission: ['dashboard'] }
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: true,
            component: () => import('@/views/dashboard/Monitor'),
            meta: { title: '监控页', permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', permission: ['dashboard'] }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/basic-form',
        component: PageView,
        meta: { title: '表单页', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', permission: ['form'] }
          }
        ]
      },


      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, keepAlive: true, permission: ['user'] },
            redirect: '/account/settings/base',
            alwaysShow: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

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
