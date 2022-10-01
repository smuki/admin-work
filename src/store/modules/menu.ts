import { getMenuList } from '@/api/url'
import Mock from 'mockjs'

export const adminRoutes = [
  {
    menuUrl: '/index',
    sName: 'Dashborad',
    routeName: 'dashborad',
    sIcon: 'icon-dashboard',
    parentPath: '',
    children: [
      {
        parentPath: '/index',
        menuUrl: '/index/home',
        sName: '主控台',
        routeName: 'home',
      },
      {
        parentPath: '/index',
        menuUrl: '/index/work-place',
        sName: '工作台',
        routeName: 'workPlace',
        isRootPath: true,
      },
    ],
  },
  {
    menuUrl: '/system',
    sName: '系统管理',
    iconPrefix: 'iconfont',
    sIcon: 'setting',
    parentPath: '',
    children: [
      {
        parentPath: '/system',
        menuUrl: '/system/department',
        sName: '部门管理',
        badge: 'new',
        localFilePath: '/system/local-path/department',
        routeName: 'my-department',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/user',
        sName: '用户管理',
        badge: 'dot',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/role',
        sName: '角色管理',
        badge: '12',
      },
      {
        parentPath: '/system',
        menuUrl: '/system/menu',
        sName: '菜单管理',
      },
    ],
  },
  {
    menuUrl: '/list',
    sName: '列表页面',
    iconPrefix: 'iconfont',
    sIcon: 'detail',
    parentPath: '',
    children: [
      {
        parentPath: '/list',
        menuUrl: '/list/table-with-search',
        sName: '表格搜索',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/table-custom',
        sName: '自定义表格',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/list',
        sName: '普通列表',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/card-list',
        sName: '卡片列表',
      },
    ],
  },
  {
    menuUrl: '/form',
    sName: '表单页面',
    badge: 'dot',
    iconPrefix: 'iconfont',
    sIcon: 'file-text',
    parentPath: '',
    children: [
      {
        parentPath: '/form',
        menuUrl: '/form/base-form-view',
        sName: '动态表单',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/advance-form',
        sName: '高级表单',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/step-form',
        sName: '分步表单',
      },
    ],
  },
  {
    menuUrl: '/other',
    sName: '功能/组件',
    iconPrefix: 'iconfont',
    sIcon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        sName: '图表',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            sName: '图标',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            sName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            sName: '图标选择器',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        sName: '打印',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        sName: '消息提示',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        sName: '剪贴板',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://www.vueadminwork.com',
        sName: '外链（官网）',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        sName: '二维码',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        sName: 'CSS动画',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        sName: '播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        sName: '大图预览',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        sName: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/result',
    sName: '结果页面',
    iconPrefix: 'iconfont',
    sIcon: 'file-unknown',
    parentPath: '',
    children: [
      {
        parentPath: '/result',
        menuUrl: '/result/success',
        sName: '成功页面',
      },
      {
        parentPath: '/result',
        menuUrl: '/result/fail',
        sName: '失败页面',
      },
    ],
  },
  {
    menuUrl: '/editor',
    sName: '编辑器',
    badge: '12',
    iconPrefix: 'iconfont',
    sIcon: 'edit',
    parentPath: '',
    children: [
      {
        parentPath: '/editor',
        menuUrl: '/editor/rich-text',
        sName: '富文本',
      },
      {
        parentPath: '/editor',
        menuUrl: '/editor/markdown',
        sName: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/draggable',
    sName: '拖拽',
    iconPrefix: 'iconfont',
    sIcon: 'interation',
    parentPath: '',
    children: [
      // {
      //   parentPath: '/draggable',
      //   menuUrl: '/draggable/dialog-draggable',
      //   sName: '拖拽对话框',
      // },
      {
        parentPath: '/draggable',
        menuUrl: '/draggable/card-draggable',
        sName: '卡片拖拽',
        cacheable: true,
      },
    ],
  },
  {
    menuUrl: '/next',
    sName: '多级菜单',
    iconPrefix: 'iconfont',
    sIcon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        sName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        sName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            sName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                sName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                sName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            sName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    sName: '地图',
    iconPrefix: 'iconfont',
    sIcon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        sName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        sName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    sName: '项目信息',
    iconPrefix: 'iconfont',
    sIcon: 'detail',
    isSingle: true,
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        sName: '项目依赖',
      },
    ],
  },
]
export const editorRoutes = [
  {
    menuUrl: '/list',
    sName: '列表页面',
    iconPrefix: 'iconfont',
    sIcon: 'detail',
    parentPath: '',
    children: [
      {
        parentPath: '/list',
        menuUrl: '/list/table-with-search',
        sName: '表格搜索',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/table-custom',
        sName: '自定义表格',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/list',
        sName: '普通列表',
      },
      {
        parentPath: '/list',
        menuUrl: '/list/card-list',
        sName: '卡片列表',
      },
    ],
  },
  {
    menuUrl: '/form',
    sName: '表单页面',
    badge: 'dot',
    iconPrefix: 'iconfont',
    sIcon: 'file-text',
    parentPath: '',
    children: [
      {
        parentPath: '/form',
        menuUrl: '/form/base-form-view',
        sName: '动态表单',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/advance-form',
        sName: '高级表单',
        cacheable: true,
      },
      {
        parentPath: '/form',
        menuUrl: '/form/step-form',
        sName: '分步表单',
      },
    ],
  },
  {
    menuUrl: '/other',
    sName: '功能/组件',
    iconPrefix: 'iconfont',
    sIcon: 'appstore',
    parentPath: '',
    children: [
      {
        parentPath: '/other',
        menuUrl: '/other/chart',
        sName: '图表',
        children: [
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon',
            sName: '图标',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/echarts',
            sName: 'echarts',
          },
          {
            parentPath: '/other/chart',
            menuUrl: '/other/chart/icon-selector',
            sName: '图标选择器',
          },
        ],
      },
      {
        parentPath: '/other',
        menuUrl: '/other/print',
        sName: '打印',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/badge',
        sName: '消息提示',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/clipboard',
        sName: '剪贴板',
      },
      {
        parentPath: '/other',
        menuUrl: 'http://www.baidu.com',
        sName: '外链',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/qrcode',
        sName: '二维码',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/css-animation',
        sName: 'CSS动画',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/flow',
        sName: '流程图',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/player',
        sName: '播放器',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/big-preview',
        sName: '大图预览',
      },
      {
        parentPath: '/other',
        menuUrl: '/other/city-selector',
        sName: '省市区选择器',
      },
    ],
  },
  {
    menuUrl: '/result',
    sName: '结果页面',
    iconPrefix: 'iconfont',
    sIcon: 'file-unknown',
    parentPath: '',
    children: [
      {
        parentPath: '/result',
        menuUrl: '/result/success',
        sName: '成功页面',
      },
      {
        parentPath: '/result',
        menuUrl: '/result/fail',
        sName: '失败页面',
      },
    ],
  },
  {
    menuUrl: '/editor',
    sName: '编辑器',
    badge: '12',
    iconPrefix: 'iconfont',
    sIcon: 'edit',
    parentPath: '',
    children: [
      {
        parentPath: '/editor',
        menuUrl: '/editor/rich-text',
        sName: '富文本',
      },
      {
        parentPath: '/editor',
        menuUrl: '/editor/markdown',
        sName: 'markdown',
      },
    ],
  },
  {
    menuUrl: '/next',
    sName: '多级菜单',
    iconPrefix: 'iconfont',
    sIcon: 'Partition',
    parentPath: '',
    children: [
      {
        parentPath: '/next',
        menuUrl: '/next/menu1',
        sName: 'menu-1',
        cacheable: true,
      },
      {
        parentPath: '/next',
        menuUrl: '/next/menu2',
        sName: 'menu-2',
        children: [
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-1',
            sName: 'menu-2-1',
            children: [
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-1',
                sName: 'menu-2-1-1',
                cacheable: true,
              },
              {
                parentPath: '/next/menu2/menu-2-1',
                menuUrl: '/next/menu2/menu-2-1/menu-2-1-2',
                sName: 'menu-2-1-2',
              },
            ],
          },
          {
            parentPath: '/next/menu2',
            menuUrl: '/next/menu2/menu-2-2',
            sName: 'menu-2-2',
            cacheable: true,
          },
        ],
      },
    ],
  },
  {
    menuUrl: '/map',
    sName: '地图',
    iconPrefix: 'iconfont',
    sIcon: 'location',
    children: [
      {
        parentPath: '/map',
        menuUrl: '/map/gaode',
        sName: '高德地图',
      },
      {
        parentPath: '/map',
        menuUrl: '/map/baidu',
        sName: '百度地图',
      },
    ],
  },
  {
    menuUrl: '/project',
    sName: '项目信息',
    iconPrefix: 'iconfont',
    sIcon: 'detail',
    isSingle: true,
    children: [
      {
        parentPath: '/project',
        menuUrl: '/project/infomation',
        sName: '项目依赖',
      },
    ],
  },
]

Mock.mock(RegExp(getMenuList), 'post', function () {
  return Mock.mock({ code: 200, data: adminRoutes, msg: '获取菜单列表成功' })
})
