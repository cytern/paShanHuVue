import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'myInfo',
        name: 'myInfo',
        meta: {
          title: '个人信息',
          auth: true
        },
        component: _import('pages/studentConf')
      },
      {
        path: 'managerPage',
        name: 'managerPage',
        meta: {
          title: '管理端',
          auth: true
        },
        component: _import('pages/managerPage')
      },
      {
        path: 'articleDetail',
        name: 'articleDetail',
        meta: {
          title: '文章详情',
          auth: true
        },
        component: _import('pages/articleDetail')
      },
      {
        path: 'leidatu',
        name: 'leidatu',
        meta: {
          title: '雷达图',
          auth: true
        },
        component: _import('echart-comment/leidatu.vue')
      },
      {
        path: 'leidatu2',
        name: 'leidatu2',
        meta: {
          title: '雷达图2',
          auth: true
        },
        component: _import('echart-comment/leidatu2.vue')
      },
      {
        path: 'leidatu3',
        name: 'leidatu3',
        meta: {
          title: '雷达图3',
          auth: true
        },
        component: _import('echart-comment/leidatu3.vue')
      },
      {
        path: 'myScript',
        name: 'myScript',
        meta: {
          title: '我的脚本',
          auth: true
        },
        component: _import('pages/myScripts')
      },
      {
        path: 'goodDetail',
        name: 'goodDetail',
        meta: {
          title: '商品详细',
          auth: true
        },
        component: _import('pages/myGoodDetail')
      },
      {
        path: 'scriptShop',
        name: 'scriptShop',
        meta: {
          title: '脚本市场',
          auth: true
        },
        component: _import('pages/scriptShop')
      },
      {
        path: 'resShop',
        name: 'resShop',
        meta: {
          title: '数据市场',
          auth: true
        },
        component: _import('pages/resShop')
      },
      {
        path: 'myOrder',
        name: 'myOrder',
        meta: {
          title: '我的订单',
          auth: true
        },
        component: _import('pages/myOrder')
      },
      {
        path: 'editCourse',
        name: 'editCourse',
        meta: {
          title: '编写教程',
          auth: true
        },
        component: _import('pages/studentCharts')
      },
      {
        path: 'myReason',
        name: 'myReason',
        meta: {
          title: '我的结果',
          auth: true
        },
        component: _import('pages/myReason')
      },
      {
        path: 'myEditScript',
        name: 'myEditScript',
        meta: {
          title: '开发脚本',
          auth: true,
          cache: true,
        },
        component: _import('pages/myEditScript')
      },
      {
        path: 'notice',
        name: 'notice',
        meta: {
          title: '公告信息',
          auth: true
        },
        component: _import('pages/notice')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
