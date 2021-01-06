import React from 'react';
import { PageHeader, Divider, Timeline, Space } from 'antd';
import diagram from '../../layouts/assets/journey.png';
export function AboutPage() {
    return (
        <div>
            <PageHeader title="Welcome to ProtoPile">
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
                    <h2>
                        Bellow there is one potential timeline of interacting with the system in ca clinical proteomics
                        setting/
                    </h2>
                </Space>
            </PageHeader>
            <img
                src={diagram}
                alt="Protopile journey"
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
