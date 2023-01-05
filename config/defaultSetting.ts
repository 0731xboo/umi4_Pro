import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: ' ',
  pwa: false,
  logo: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
  iconfontUrl: '',
};

export default Settings;
