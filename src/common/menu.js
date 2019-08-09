/**
 * 导航菜单 页面级
 */
import { isUrl } from '../utils/utils';
// super: 超级用户，admin：管理员，partner：普通用户， app：普通用户（与partner表现一致）
// id: 对应服务端返回的menu列表，参考authority.js
// 菜单中的authority字段暂时废弃，采用后端返回的menu菜单进行权限控制，id作为条件

const menuData = [
  {
    name: '我的工作台',
    id: 7,
    path: 'workplatform',
    children: [
      // 三级title
      {
        name: '任务处理',
        id: 8,
        path: 'mytask',
        icon: 'custom:ziliao1',
      },
      {
        name: '待审核报告列表',
        id: 9,
        path: 'waitchecklist',
        icon: 'custom:ziliao',
      },
      {
        name: '待审批报告列表',
        id: 10,
        path: 'waitapprovelist',
        icon: 'custom:ziliao',
      },
    ],
  },
  {
    name: '我的报告管理',
    id: 30,
    path: 'report',
    children: [
      {
        name: '新建报告',
        id: 35,
        path: 'create',
        icon: 'custom:yaopin',
      },
      {
        name: '新建报告列表',
        id: 31,
        path: 'newlist',
        icon: '/tracing-web/icons-single/code.svg',
      },
      {
        name: '审核报告列表',
        id: 32,
        path: 'checklist',
        icon: '/tracing-web/icons-single/code.svg',
      },
      {
        name: '审批报告列表',
        id: 33,
        path: 'approvelist',
        icon: '/tracing-web/icons-single/code.svg',
      },
      {
        name: '归档报告列表',
        id: 34,
        icon: 'custom:chanpin',
        path: 'batches',
      },
    ],
  },
  {
    name: '个人信息',
    id: 58,
    path: 'system',
    children: [
      {
        name: '基本信息',
        id: 47,
        path: 'user',
        icon: 'custom:weibiaoti-_yonghuguanli',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
