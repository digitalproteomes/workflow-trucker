import React from 'react';
import { PageHeader, Divider, Timeline, Upload, Space, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import diagram from '../../layouts/assets/WFT_Flow_Landscape.png';
import { UploadProps } from 'antd/lib/upload';
export function AboutPage() {
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        method: 'POST',
        action: 'http://localhost:5000/file-upload',
        onChange(info: any) {
            const { status } = info.file;
            console.log('info', info);

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

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
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            ,
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
