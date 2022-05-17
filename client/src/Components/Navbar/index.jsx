/* eslint-disable no-undef */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Layout,
  Menu,
  Image,
  Button,
  Dropdown,
  Space,
  Drawer,
  message,
} from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import logo from '../../Assets/images/logo.svg';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './navbar.css';

const { Header } = Layout;

function Navbar({ isLogged, categories, setIsOpen, setIsLogged }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const categoriesMenu = () => (
    <Menu
      items={categories.map(({ id, name }) => ({
        key: id,
        label: <Link to={`/category/${id}`}>{name}</Link>,
      }))}
    />
  );

  const navItems = [
    <Link to="/">الرئيسية</Link>,
    categories.length ? (
      <Space direction="vertical">
        <Dropdown overlay={categoriesMenu()} placement="bottom">
          <Space>
            الخدمات
            <DownOutlined style={{ fontSize: '12px' }} />
          </Space>
        </Dropdown>
      </Space>
    ) : (
      <Link to="#category">الخدمات</Link>
    ),
    <Link to="/about">من نحن</Link>,
    <Link to="/contact">اتصل بنا</Link>,
  ].map((item, key) => ({
    key,
    label: item,
  }));

  const logout = () => {
    axios
      .get('/api/v1/logout')
      .then(({ data }) => {
        message.success(data.message);
        setIsLogged(false);
      })
      .catch(() => {
        message.error('حدث خطأ ما');
      });
  };

  const avatarMenu = (
    <Menu
      items={[
        {
          label: <Link to="/profile">مواعيدي</Link>,
        },
        {
          label: 'تسجيل خروج',
          onClick: logout,
          className: 'logout',
        },
      ]}
    />
  );

  return (
    <Header className="menu">
      <div className="menu__logo">
        <Link to="/">
          <Image preview={false} src={logo} width={150} />
        </Link>
      </div>
      <div className="menu_left">
        <LeftMenu mode="horizontal" navItems={navItems} />
      </div>
      <div className="menu_right">
        <RightMenu
          mode="horizontal"
          isLogged={isLogged}
          avatarMenu={avatarMenu}
          setIsOpen={setIsOpen}
        />
      </div>
      <Button
        className="menu__mobile-button"
        type="primary"
        onClick={showDrawer}
      >
        <MenuOutlined type="align-right" />
      </Button>
      <Drawer
        title="القائمة"
        placement="left"
        className="menu_drawer"
        onClose={onClose}
        visible={visible}
      >
        <LeftMenu mode="inline" navItems={navItems} />
        <RightMenu
          mode="inline"
          isLogged={isLogged}
          avatarMenu={avatarMenu}
          setIsOpen={setIsOpen}
        />
      </Drawer>
    </Header>
  );
}

Navbar.propTypes = {
  isLogged: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setIsOpen: PropTypes.func,
  setIsLogged: PropTypes.func,
};

Navbar.defaultProps = {
  setIsOpen: () => {
    setIsOpen(false);
  },
  isLogged: false,
  setIsLogged: () => {
    setIsLogged(false);
  },
};

export default Navbar;
