import React from 'react';
import {
  Layout,
  Menu,
  Image,
  Space,
  Typography,
  Avatar,
  Button,
  Badge,
} from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  PieChartOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import './style.css';
import logo from '../../Assets/images/logo.svg';
import user from '../../Assets/images/user.png';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem(<Link to="/dashboard">نظرة عامة</Link>, '1', <PieChartOutlined />),
  getItem(
    <Link to="/dashboard/book">الحجوزات</Link>,
    '2',
    <CalendarOutlined />
  ),
  getItem(<Link to="/dashboard/contact">التواصل</Link>, '3', <MailOutlined />),
  getItem(
    <Link to="/dashboard/services"> التصنيفات</Link>,
    '4',
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/dashboard/categories"> الخدمات</Link>,
    '5',
    <ShoppingOutlined />
  ),
];
const breadcrumbNameMap = {
  '/dashboard': 'نظرة عامة',
  '/dashboard/book': 'الحجوزات',
  '/dashboard/contact': 'التواصل',
  '/dashboard/services': 'التصنيفات',
  '/dashboard/categories': 'الخدمات',
};

function Dashboard() {
  const { pathname } = useLocation();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
      className="page-layout"
    >
      <Sider className="sidebar" width={270}>
        <Image preview={false} src={logo} className="logo-image" alt="logo" />
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          className="sidebar-menu"
        />
        <Button className="logout-btn" icon={<LogoutOutlined />}>
          تسجيل الخروج
        </Button>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="dashboard-header"
          style={{
            padding: 0,
          }}
        >
          <Title>{breadcrumbNameMap[pathname]}</Title>
          <Space>
            <Badge dot>
              <Avatar shape="square" icon={<BellOutlined />} />
            </Badge>
            <Avatar
              src={
                <Image
                  src={user}
                  style={{
                    width: 32,
                    padding: '1px',
                    border: '1px solid #DFE0EB',
                    borderRadius: '50%',
                  }}
                  preview={false}
                  alt="admin-image"
                />
              }
            />
            <Title level={5}>محمد الهبيل</Title>
          </Space>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 0,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
