import React from 'react';
import app_logo from './assets/WF_logo.png';
import { Layout, Menu, Breadcrumb } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const BasicLayout: React.FC = (props) => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <img src={app_logo} className="App-logo" alt="logo" />
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        // the below two are auto selecting the open entries, but not automatically setting the route
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <LaptopOutlined />
                                    <Link to="/projects?id=5">Project 5</Link>
                                </span>
                            }
                        >
                            <Menu.Item key="0">
                                <Link to="/projects?id=5">Project details</Link>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Link to="/samples?project=5&type=1">Individual samples</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/samples?project=5&type=4">Pooling samples</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                Workflow Tracker ©2020 Created by Silvana Albert
            </Footer>
        </Layout>
    );
};

export default BasicLayout;
