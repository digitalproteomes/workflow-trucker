import React from 'react';
import { PageHeader, Button, Descriptions, Divider, Timeline, Space } from 'antd';
import diagram from '../../layouts/assets/WFT_Flow_Landscape.png';

export function AboutPage() {
    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader ghost={false} title="Welcome to the Workflow Tracker">
                <Divider />
                <Space direction="vertical" size="middle">
                    <h3>The first Proteomics based Laboratory Information Management system that allows:</h3>

                    <Timeline>
                        <Timeline.Item color="purple">Storing information about clinical samples</Timeline.Item>
                        <Timeline.Item color="blue">Creating connections between samples and MS runs</Timeline.Item>
                        <Timeline.Item color="green">
                            Creating connections between MS runs and computational analysis
                        </Timeline.Item>
                    </Timeline>
                </Space>
            </PageHeader>
            <img
                src={diagram}
                alt="Flow diagram"
                style={{
                    alignContent: 'center',
                    marginLeft: '23px',
                    paddingTop: '0px',
                    width: '1000px',
                }}
            />
        </div>
    );
}
