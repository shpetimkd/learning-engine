import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { BuildOutlined, BlockOutlined, UserOutlined, RadarChartOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const switchToLabel = (index: number) => {
  console.log(index);
  switch (index) {
  case 0:
    return 'Build an Algorithm';
  case 1:
    return 'List Algorithms';
  case 2:
    return 'Algorithms per user';
  case 3:
    return 'Users data';
  default:
    return '';
  }
};

const menuItems: MenuProps['items'] = [BuildOutlined, BlockOutlined, RadarChartOutlined, UserOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: switchToLabel(index),
    };
  },
);

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('sub1');

  useEffect(() => {
    switch(location.pathname) {
    case '/':
      setCurrent('sub1');
      break;
    case '/list':
      setCurrent('sub2');
      break;
    case '/algorithms':
      setCurrent('sub3');
      break;
    case '/users':
      setCurrent('sub4');
      break;
    default:
      setCurrent('');
    }
  }, [location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'sub1') {
      navigate('/');
    }

    if (e.key === 'sub2') {
      navigate('/list');
    }

    if (e.key === 'sub3') {
      navigate('/algorithms');
    }

    if (e.key === 'sub4') {
      navigate('/users');
    }
    setCurrent(e.key);
  };

  return (
    <Layout
      style={{ minHeight: '100vh', padding: '0 0', borderRadius: '3px' }}
    >
      <Sider width={260}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
          items={menuItems}
          onClick={onClick}
          selectedKeys={[current]}
        />
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
