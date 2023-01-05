// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
// import { GithubOutlined } from '@ant-design/icons';
// import { DefaultFooter } from '@ant-design/pro-components';
// import { Settings } from '@ant-design/pro-layout';
import NoFoundPage from './pages/404';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { history } from '@umijs/max';
import type { RunTimeLayoutConfig } from 'umi';
// import { PageLoading } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser } from './services/login/api';
// import { ErrorBoundary } from '@ant-design/pro-components'

import defaultSettings from '../config/defaultSetting';
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '@umijs/max' };
// }

// const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login';

// 获取用户信息较慢的时候 展示一个loading效果
// export const initStateConfig = {
//   loading: <PageLoading />
// }

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  //如果不是登录页面,执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      settings: defaultSettings,
      currentUser,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    // title: '后台管理系统', //layout标题
    // pure:true,   //是否删除所有的自带界面
    menu: {
      locale: false,
    },
    layout: 'mix', //布局模式  layout?: 'side' | 'top' | 'mix';
    loading: false, //加载状态
    // footerRender:()=><DefaultFooter/>  footer页脚渲染信息
    noFound: <NoFoundPage />,
    // menuHeaderRender:()=><Nodes />, //渲染菜单logo和title  类型ReactNode | ()=> ReactNode
    childrenRender: (children) => {
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            hideCopyButton
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitalState) => ({
                ...preInitalState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};
