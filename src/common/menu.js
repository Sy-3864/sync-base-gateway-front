import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    icon: 'home',
    path: 'home',
  },
  {
    name: '数据源管理',
    path: 'config',
    icon: 'setting',
    authority: ['admin', '/config'],
    children: [
      {
        name: '数据源管理',
        path: 'systemConfig',
        authority: ['admin', '/config/systemConfig'],
      },
    ],
  },
  {
    name: '用户管理',
    path: 'userManage',
    icon: 'setting',
    authority: ['admin', '/userManage'],
    children: [
      {
        name: '用户列表',
        path: 'syncRecord',
        authority: ['admin', '/userManage/syncRecord'],
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let {path} = item;
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