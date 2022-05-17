import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import OurFooter from '../Footer';
import Navbar from '../Navbar';
import LoginRegisterContainer from '../LoginRegisterContainer';
import { ModalLoginProvider } from '../../Context/ModalLogin';

const { Header, Footer, Content } = Layout;
function LayoutUser({ categories }) {
  return (
    <ModalLoginProvider>
      <Layout className="page--layout">
        <Header>
          <Navbar
            categories={categories}
            user={{ name: 'Mohammad', role: 'admin' }}
          />
          <LoginRegisterContainer />
        </Header>
        <Content className="page--content">
          <Outlet />
        </Content>
        <Footer>
          <OurFooter categories={categories} />
        </Footer>
      </Layout>
    </ModalLoginProvider>
  );
}
LayoutUser.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};
export default LayoutUser;
