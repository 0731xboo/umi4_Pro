import { defineConfig } from '@umijs/max';
import routes from './routes';
import defaultSetting from './defaultSetting';

export default defineConfig({
  antd: {},
  //开启权限控制
  access: {},
  model: {},
  //开启权限控制所需依赖
  initialState: {},
  request: {},
  layout: {
    siderWidth: 300,
    ...defaultSetting,
  },
  routes: routes,
  npmClient: 'yarn',
});
