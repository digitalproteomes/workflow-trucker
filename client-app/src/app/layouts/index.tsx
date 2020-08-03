import React, { useState } from 'react';
import app_logo from './assets/logo_white.png';
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    MonitorOutlined,
    ReadOutlined,
    CoffeeOutlined,
    BarcodeOutlined,
    HeatMapOutlined,
    NotificationOutlined,
    StarOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
    ExperimentOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { CollapseType } from 'antd/lib/layout/Sider';
import { Constants } from '../default-data/constants';

const { SubMenu } = Menu;
const { Content, Footer, Sider, Header } = Layout;
const { Text } = Typography;

type State = {
    isCollapsed: boolean;
};

const BasicLayout: React.FC = (props) => {
    const [prevState, setState] = useState<State>({ isCollapsed: false });

    function onCollapse(isCollapsed: boolean, type: CollapseType) {
        console.log(`collapsed: ${isCollapsed} - event type: ${type}`);
        setState({ ...prevState, isCollapsed });
    }

    const defaultProjectId = Constants.projectId;
    const defaultProjectName = 'PHRT_005_CPAC';
    const otherProjectId = '5f_other_project_id';
    const otherProjectName = 'PHRT_006_CPAC';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                // todo - move the styling out into proper css files
                width={250}
                collapsible
                collapsed={prevState.isCollapsed}
                onCollapse={onCollapse}
            >
                <img
                    src={app_logo}
                    alt="logo"
                    style={{
                        alignContent: 'center',
                        marginLeft: '23px',
                        paddingTop: '14px',
                        width: '110px',
                    }}
                />
                <Divider style={{ margin: 0 }} />
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[`${defaultProjectId}_5`]}
                    // defaultSelectedKeys={[`${defaultProjectId}_intermediate`]}
                    // defaultSelectedKeys={[`${defaultProjectId}_msready`]}
                    defaultOpenKeys={[
                        `${defaultProjectId}_sub1`,
                        `${defaultProjectId}_sub1_1`,
                        // `${otherProjectId}_sub1`,
                    ]}
                >
                    <Menu.Item key={'about'} icon={<CoffeeOutlined />}>
                        <Link to={`/about`}>Home</Link>
                    </Menu.Item>
                    {getSubmenu(defaultProjectId, defaultProjectName)}
                    {getSubmenu(otherProjectId, otherProjectName)}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div style={{ float: 'right', alignContent: 'horizontal' }}>
                        <SearchOutlined style={{ paddingRight: 8 }} />
                        <StarOutlined style={{ paddingRight: 8 }} />
                        <QuestionCircleOutlined style={{ paddingRight: 8 }} />
                        <NotificationOutlined style={{ paddingRight: 32 }} />
                        <Avatar shape={'square'} icon={<UserOutlined />} />
                        <Text style={{ paddingRight: 16, paddingLeft: 4 }}>Patrick Pedrioli</Text>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Workflow Tracker ©2020 Created by PHRT - CPAC</Footer>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;
function getSubmenu(projectId: string, name: string) {
    return (
        <SubMenu
            key={`${projectId}_sub1`}
            icon={<ExperimentOutlined />}
            title={<Link to={`/projects?id=${projectId}`}>{name}</Link>}
        >
            <Menu.Item key={`${projectId}_0`} icon={<MonitorOutlined />}>
                <Link to={`/projects?id=${projectId}`}>Project overview</Link>
            </Menu.Item>
            <SubMenu key={`${projectId}_sub1_1`} title={'Samples'} icon={<BarcodeOutlined />}>
                <Menu.Item key={`${projectId}_5`}>
                    <Link to={`/samples/clinical?project=${projectId}`}>Clinical</Link>
                </Menu.Item>
                <Menu.Item key={`${projectId}_intermediate`}>
                    <Link to={`/samples/intermediate?project=${projectId}`}>Intermediate</Link>
                </Menu.Item>
                <Menu.Item key={`${projectId}_msready`}>
                    <Link to={`/samples/msready?project=${projectId}`}>MS Ready</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key={`${projectId}_20`} icon={<DashboardOutlined />}>
                <Link to={`/msruns`}>MS Runs</Link>
            </Menu.Item>
            <Menu.Item key={`${projectId}_30`} icon={<ReadOutlined />}>
                <Link to={`/spectrallibraries?project=${projectId}`}>Spectral Libraries</Link>
            </Menu.Item>
            <Menu.Item key={`${projectId}_40`} icon={<HeatMapOutlined />}>
                <Link to={`/swathanalyses?project=${projectId}`}>SWATH Analyses</Link>
            </Menu.Item>
        </SubMenu>
    );
}
