import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
  ProFormCaptcha,
  ProFormCheckbox,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';

type LoginType = 'Phone' | 'account';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState('phone');

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activekey) => setLoginType(activekey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab="账号密码登录" />
          <Tabs.TabPane key={'phone'} tab="手机号登录" />
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username" //相当于form.item的name属性
              fieldProps={{ size: 'large', prefix: <MobileOutlined /> }} //传给底层子组件input的属性 size input控件大小 ,prefix:带有前缀图标的input
              placeholder="请输入用户名" //input  placeholder透传
              rules={[{ required: true, message: '用户名不能为空' }]} //验证规则
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              placeholder="密码 123456"
              rules={[{ required: true, message: '请输入密码' }]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              name="mobile"
              fieldProps={{ size: 'large', prefix: <MobileOutlined /> }}
              placeholder="手机号"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '手机号格式错误' },
              ]}
            />

            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className="prefixIcon" />,
              }}
              captchaProps={{ size: 'large' }} //获取验证码按钮props
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                //captchaTextRender 渲染时计时的文案
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return `获取验证码`;
              }}
              name={'captcha'}
              rules={[{ required: true, message: '请输入验证码' }]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功,验证码为:1234');
              }}
            />
          </>
        )}

        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a style={{ float: 'right' }}>忘记密码</a>
        </div>
      </LoginForm>
    </div>
  );
};

export default LoginPage;
