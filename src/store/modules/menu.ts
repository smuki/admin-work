import { getMenuList } from '@/api/url'
import Mock from 'mockjs'

export const adminRoutes = [
  {
    menuUrl: '/index',
    title: 'Dashborad',
    routeName: 'dashborad',
    icon: 'icon-dashboard',
    parent: '',
    children: [
      {
        parent: '/index',
        menuUrl: '/index/home',
        title: '主控台',
        routeName: 'home',
      },
      {
        parent: '/index',
        menuUrl: '/index/work-place',
        title: '工作台',
        routeName: 'workPlace',
        isRootPath: true,
      },
    ],
  },
  {
    menuUrl: '/system',
    title: '系统管理',
    iconPrefix: 'iconfont',
    icon: 'setting',
    parent: '',
    children: [
      {
        parent: '/system',
        menuUrl: '/system/department',
        title: '部门管理',
        badge: 'new',
        localFilePath: '/system/local-path/department',
        routeName: 'my-department',
      },
      {
        parent: '/system',
        menuUrl: '/system/user',
        title: '用户管理',
        badge: 'dot',
      },
      {
        parent: '/system',
        menuUrl: '/system/role',
        title: '角色管理',
        badge: '12',
      },
      {
        parent: '/system',
        menuUrl: '/system/menu',
        title: '菜单管理',
      },
    ],
  },
  {
    menuUrl: '/list',
    title: '列表页面',
    iconPrefix: 'iconfont',
    icon: 'detail',
    parent: '',
    children: [
      {
        parent: '/list',
        menuUrl: '/list/table-with-search',
        title: '表格搜索',
      },
      {
        parent: '/list',
        menuUrl: '/list/table-custom',
        title: '自定义表格',
      },
      {
        parent: '/list',
        menuUrl: '/list/list',
        title: '普通列表',
      },
      {
        parent: '/list',
        menuUrl: '/list/card-list',
        title: '卡片列表',
      },
    ],
  },
  {
    menuUrl: '/form',
    title: '表单页面',
    badge: 'dot',
    iconPrefix: 'iconfont',
    icon: 'file-text',
    parent: '',
    children: [
      {
        parent: '/form',
        menuUrl: '/form/base-form-view',
        title: '动态表单',
        cacheable: true,
      },
      {
        parent: '/form',
        menuUrl: '/form/advance-form',
        title: '高级表单',
        cacheable: true,
      },
      {
        parent: '/form',
        menuUrl: '/form/step-form',
        title: '分步表单',
      },
    ],
  },
  {
    menuUrl: '/other',
    title: '功能/组件',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parent: '',
    children: [
      {
        parent: '/other',
        menuUrl: '/other/chart',
        title: '图表',
        children: [
          {
            parent: '/other/chart',
            menuUrl: '/other/chart/icon',
            title: '图标',
          },
          {
            parent: '/other/chart',
            menuUrl: '/other/chart/echarts',
            title: 'echarts',
          },
          {
            parent: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            title: '图标选择器',
          },
        ],
      },
      {
        parent: '/other',
        menuUrl: '/other/print',
        title: '打印',
      },
      {
        parent: '/other',
        menuUrl: '/other/badge',
        title: '消息提示',
      },
      {
        parent: '/other',
        menuUrl: '/other/clipboard',
        title: '剪贴板',
      },
      {
        parent: '/other',
        menuUrl: 'http://www.vueadminwork.com',
        title: '外链（官网）',
      },
      {
        parent: '/other',
        menuUrl: '/other/qrcode',
        title: '二维码',
      },
      {
        parent: '/other',
        menuUrl: '/other/css-animation',
        title: 'CSS动画',
      },
      {
        parent: '/other',
        menuUrl: '/other/player',
        title: '播放器',
      },
      {
        parent: '/other',
        menuUrl: '/other/big-preview',
        title: '大图预览',
      },
      {
        parent: '/other',
        menuUrl: '/other/city-selector',
        title: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/result',
    title: '结果页面',
    iconPrefix: 'iconfont',
    icon: 'file-unknown',
    parent: '',
    children: [
      {
        parent: '/result',
        menuUrl: '/result/success',
        title: '成功页面',
      },
      {
        parent: '/result',
        menuUrl: '/result/fail',
        title: '失败页面',
      },
    ],
  },
  {
    menuUrl: '/editor',
    title: '编辑器',
    badge: '12',
    iconPrefix: 'iconfont',
    icon: 'edit',
    parent: '',
    children: [
      {
        parent: '/editor',
        menuUrl: '/editor/rich-text',
        title: '富文本',
      },
      {
        parent: '/editor',
        menuUrl: '/editor/markdown',
        title: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/draggable',
    title: '拖拽',
    iconPrefix: 'iconfont',
    icon: 'interation',
    parent: '',
    children: [
      // {
      //   parent: '/draggable',
      //   menuUrl: '/draggable/dialog-draggable',
      //   title: '拖拽对话框',
      // },
      {
        parent: '/draggable',
        menuUrl: '/draggable/card-draggable',
        title: '卡片拖拽',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/next',
    title: '多级菜单',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parent: '',
    children: [
      {
        parent: '/next',
        menuUrl: '/next/menu1',
        title: 'menu-1',
        cacheable: true,
      },
      {
        parent: '/next',
        menuUrl: '/next/menu2',
        title: 'menu-2',
        children: [
          {
            parent: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            title: 'menu-2-1',
            children: [
              {
                parent: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                title: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parent: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                title: 'menu-2-1-2',
              },
            ],
          },
          {
            parent: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            title: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    title: '地图',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parent: '/map',
        menuUrl: '/map/gaode',
        title: '高德地图',
      },
      {
        parent: '/map',
        menuUrl: '/map/baidu',
        title: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    title: '项目信息',
    iconPrefix: 'iconfont',
    icon: 'detail',
    isSingle: true,
    children: [
      {
        parent: '/project',
        menuUrl: '/project/infomation',
        title: '项目依赖',
      },
    ],
  },
]
export const editorRoutes = [
  {
    menuUrl: '/list',
    title: '列表页面',
    iconPrefix: 'iconfont',
    icon: 'detail',
    parent: '',
    children: [
      {
        parent: '/list',
        menuUrl: '/list/table-with-search',
        title: '表格搜索',
      },
      {
        parent: '/list',
        menuUrl: '/list/table-custom',
        title: '自定义表格',
      },
      {
        parent: '/list',
        menuUrl: '/list/list',
        title: '普通列表',
      },
      {
        parent: '/list',
        menuUrl: '/list/card-list',
        title: '卡片列表',
      },
    ],
  },
  {
    menuUrl: '/form',
    title: '表单页面',
    badge: 'dot',
    iconPrefix: 'iconfont',
    icon: 'file-text',
    parent: '',
    children: [
      {
        parent: '/form',
        menuUrl: '/form/base-form-view',
        title: '动态表单',
        cacheable: true,
      },
      {
        parent: '/form',
        menuUrl: '/form/advance-form',
        title: '高级表单',
        cacheable: true,
      },
      {
        parent: '/form',
        menuUrl: '/form/step-form',
        title: '分步表单',
      },
    ],
  },
  {
    menuUrl: '/other',
    title: '功能/组件',
    iconPrefix: 'iconfont',
    icon: 'appstore',
    parent: '',
    children: [
      {
        parent: '/other',
        menuUrl: '/other/chart',
        title: '图表',
        children: [
          {
            parent: '/other/chart',
            menuUrl: '/other/chart/icon',
            title: '图标',
          },
          {
            parent: '/other/chart',
            menuUrl: '/other/chart/echarts',
            title: 'echarts',
          },
          {
            parent: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            title: '图标选择器',
          },
        ],
      },
      {
        parent: '/other',
        menuUrl: '/other/print',
        title: '打印',
      },
      {
        parent: '/other',
        menuUrl: '/other/badge',
        title: '消息提示',
      },
      {
        parent: '/other',
        menuUrl: '/other/clipboard',
        title: '剪贴板',
      },
      {
        parent: '/other',
        menuUrl: 'http://www.baidu.com',
        title: '外链',
      },
      {
        parent: '/other',
        menuUrl: '/other/qrcode',
        title: '二维码',
      },
      {
        parent: '/other',
        menuUrl: '/other/css-animation',
        title: 'CSS动画',
      },
      {
        parent: '/other',
        menuUrl: '/other/flow',
        title: '流程图',
      },
      {
        parent: '/other',
        menuUrl: '/other/player',
        title: '播放器',
      },
      {
        parent: '/other',
        menuUrl: '/other/big-preview',
        title: '大图预览',
      },
      {
        parent: '/other',
        menuUrl: '/other/city-selector',
        title: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/result',
    title: '结果页面',
    iconPrefix: 'iconfont',
    icon: 'file-unknown',
    parent: '',
    children: [
      {
        parent: '/result',
        menuUrl: '/result/success',
        title: '成功页面',
      },
      {
        parent: '/result',
        menuUrl: '/result/fail',
        title: '失败页面',
      },
    ],
  },
  {
    menuUrl: '/editor',
    title: '编辑器',
    badge: '12',
    iconPrefix: 'iconfont',
    icon: 'edit',
    parent: '',
    children: [
      {
        parent: '/editor',
        menuUrl: '/editor/rich-text',
        title: '富文本',
      },
      {
        parent: '/editor',
        menuUrl: '/editor/markdown',
        title: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/next',
    title: '多级菜单',
    iconPrefix: 'iconfont',
    icon: 'Partition',
    parent: '',
    children: [
      {
        parent: '/next',
        menuUrl: '/next/menu1',
        title: 'menu-1',
        cacheable: true,
      },
      {
        parent: '/next',
        menuUrl: '/next/menu2',
        title: 'menu-2',
        children: [
          {
            parent: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            title: 'menu-2-1',
            children: [
              {
                parent: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                title: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parent: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                title: 'menu-2-1-2',
              },
            ],
          },
          {
            parent: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            title: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    title: '地图',
    iconPrefix: 'iconfont',
    icon: 'location',
    children: [
      {
        parent: '/map',
        menuUrl: '/map/gaode',
        title: '高德地图',
      },
      {
        parent: '/map',
        menuUrl: '/map/baidu',
        title: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    title: '项目信息',
    iconPrefix: 'iconfont',
    icon: 'detail',
    isSingle: true,
    children: [
      {
        parent: '/project',
        menuUrl: '/project/infomation',
        title: '项目依赖',
      },
    ],
  },
]

//Mock.mock(RegExp(getMenuList), 'post', function () {
//  return Mock.mock({ code: 200, data: adminRoutes, msg: '获取菜单列表成功' })
//})
