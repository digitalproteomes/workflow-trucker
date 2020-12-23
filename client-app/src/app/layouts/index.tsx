import React, { useState } from 'react';
import app_logo from './assets/logo_white.png';
import { Layout, Menu, Avatar, Typography, Divider, Select } from 'antd';
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
    UnorderedListOutlined,
} from '@ant-design/icons';

import { Link, withRouter } from 'react-router-dom';
import { CollapseType } from 'antd/lib/layout/Sider';
import { Constants } from '../default-data/constants';
import { Project } from '../types';

const { SubMenu } = Menu;
const { Content, Footer, Sider, Header } = Layout;
const { Text } = Typography;
const { Option } = Select;

export const BasicLayout = withRouter((props) => {
    const [isCollapsed, setCollapsedFlag] = useState<boolean>(false);
    // when this basic layout is instantiated, the projects are already loaded
    const [activeProject, setActiveProject] = useState<Project>(Constants.activeProject);
    const projects: Project[] = Constants.projects;

    function onCollapse(isCollapsed: boolean, type: CollapseType) {
        console.log(`collapsed: ${isCollapsed} - event type: ${type}`);

        setCollapsedFlag(isCollapsed);
    }

    // wait - projects - the active project could be set as null, and have a nice loading screen until the initial data is loaded from the server
    function resetActiveProject(newActiveProject: Project) {
        setActiveProject(newActiveProject);

        Constants.setActiveProject(newActiveProject);

        props.history.push('/');
    }

    let selectedMenuEntry = props.location.pathname;
    if (selectedMenuEntry === '/') selectedMenuEntry = '/about';

    const projectId = activeProject.projectId;
    const projectName = activeProject.name;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
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
                    defaultSelectedKeys={[`/about`]}
                    selectedKeys={[selectedMenuEntry]}
                    defaultOpenKeys={[`${projectId}`, `/samples`]}
                >
                    <Menu.Item key={'/about'} icon={<CoffeeOutlined />}>
                        <Link to={`/about`}>Home</Link>
                    </Menu.Item>
                    {getSubmenu(projectId, projectName)}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div style={{ float: 'right', alignContent: 'horizontal' }}>
                        <Select
                            defaultValue={activeProject.projectId}
                            onChange={(projectId: string) => {
                                resetActiveProject(projects.filter((p) => p.projectId === projectId)[0]);
                            }}
                            style={{ width: 260 }}
                        >
                            {projects.map((project) => (
                                <Option key={project.projectId} value={project.projectId}>
                                    {project.name}
                                </Option>
                            ))}
                        </Select>
                        <SearchOutlined style={{ paddingRight: 8 }} />
                        <StarOutlined style={{ paddingRight: 8 }} />
                        <QuestionCircleOutlined style={{ paddingRight: 8 }} />
                        <NotificationOutlined style={{ paddingRight: 32 }} />
                        <Avatar shape={'square'} icon={<UserOutlined />} />
                        <Text style={{ paddingRight: 16, paddingLeft: 4 }}>{activeProject.ownerName}</Text>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Workflow Trucker ©2020 Created by PHRT - CPAC</Footer>
            </Layout>
        </Layout>
    );
});

function getSubmenu(projectId: string, name: string) {
    return (
        <SubMenu
            key={`${projectId}`}
            icon={<ExperimentOutlined />}
            title={<Link to={`/projects?id=${projectId}`}>{name}</Link>}
        >
            <Menu.Item key={`/projects`} icon={<MonitorOutlined />}>
                <Link to={`/projects?id=${projectId}`}>Project overview</Link>
            </Menu.Item>
            <SubMenu key={`/samples`} title={'Samples'} icon={<BarcodeOutlined />}>
                <Menu.Item key={`/samples/clinical`}>
                    <Link to={`/samples/clinical?project=${projectId}`}>Clinical</Link>
                </Menu.Item>
                <Menu.Item key={`/samples/intermediate`}>
                    <Link to={`/samples/intermediate?project=${projectId}`}>Intermediate</Link>
                </Menu.Item>
                <Menu.Item key={`/samples/msready`}>
                    <Link to={`/samples/msready?project=${projectId}`}>MS Ready</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key={`/samples/msruns`} icon={<DashboardOutlined />}>
                <Link to={`/msruns`}>MS Runs</Link>
            </Menu.Item>
            <Menu.Item key={`/spectrallibraries`} icon={<ReadOutlined />}>
                <Link to={`/spectrallibraries?project=${projectId}`}>Spectral Libraries</Link>
            </Menu.Item>
            <Menu.Item key={`/swathanalyses`} icon={<HeatMapOutlined />}>
                <Link to={`/swathanalyses?project=${projectId}`}>SWATH Analyses</Link>
            </Menu.Item>
            <Menu.Item key={`/sops`} icon={<UnorderedListOutlined />}>
                <Link to={`/sops?project=${projectId}`}>SOPs</Link>
            </Menu.Item>
            <Menu.Item key={`/diagrams`} icon={<UnorderedListOutlined />}>
                <Link to={`/diagrams?project=${projectId}`}>Diagrams</Link>
            </Menu.Item>
        </SubMenu>
    );
}
