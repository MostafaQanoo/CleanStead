import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Layout, message } from 'antd';
import { Navbar, OurFooter } from '../Components';
import { Home, Category } from '../Pages';
import '../style/custom-antd.css';
import './app.css';

const { Header, Footer, Content } = Layout;

function App() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    setLoading(true);
    axios
      .get('/api/v1/categories', {
        cancelToken: cancelTokenSource.token,
      })
      .then(({ data: { data } }) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message.error('حدث خطأ ما');
      });

    return () => cancelTokenSource.cancel();
  }, []);

  return (
    <Router>
      <Layout className="page--layout">
        <Header>
          <Navbar
            isLogged={false}
            categories={categories}
            user={{ name: 'Mohammad', role: 'admin' }}
          />
        </Header>
        <Content className="page--content">
          <Routes>
            <Route
              path="/"
              element={<Home categories={categories} loading={loading} />}
            />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </Content>
        <Footer>
          <OurFooter categories={categories} />
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
