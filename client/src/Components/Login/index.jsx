/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

function Login({ setIsOpen }) {
  const onFinish = ({ email, password }) => {
    const userInfoLogin = { email, password };
    console.log('userInfoLogin', userInfoLogin);
    axios
      .post('/api/v1/signin', { email, password })
      .then(({ data }) => {
        console.log('data', data);
        setIsOpen(false);
      })
      .catch(() => {
        message.error('حدث خطأ ما');
      });
  };
  return (
    <div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="الإيميل"
          name="email"
          rules={[
            {
              required: true,
              message: 'إيميل المستخدم مطلوب',
            },
            { type: 'email', message: 'يجب ادخال إيميل صحيح' },
          ]}
          hasFeedback
        >
          <Input
            placeholder=" ادخل الإيميل"
            className="input"
            prefix={<MailOutlined className="icon-style" />}
          />
        </Form.Item>
        <Form.Item
          label="كلمة السر"
          name="password"
          rules={[
            {
              required: true,
              message: ' كلمة السر للمستخدم مطلوبة',
            },
            { min: 8, message: 'يجب ادخال كلمة السر  على الاقل 8 أحرف' },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="ادخل كلمة المرور"
            className="input"
            prefix={<LockOutlined className="icon-style" />}
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" className="button">
            دخول
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
Login.defaultProps = {
  setIsOpen: () => {
    setIsOpen(false);
  },
};
Login.propTypes = {
  setIsOpen: PropTypes.func,
};
export default Login;
