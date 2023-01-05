export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  },
  {
    path: '/user',
    layout: false, //不出现在布局中
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
