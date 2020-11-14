import React from 'react';
import { Form, Card, Row, Col, Input, PageHeader, Divider, Button, Space } from 'antd';
import { Project } from '../../../types';
import { observer } from 'mobx-react';
import { LockOutlined, DownloadOutlined } from '@ant-design/icons';

interface ProjectEditProps {
    project: Project;
    onSave: () => void;
}

@observer
export class ProjectEdit extends React.Component<ProjectEditProps, any> {
    render() {
        const project = Project.default;
        if (project === null) return <span>no project selected</span>;

        return (
            <div>
                <PageHeader ghost={false} title="Project Details"></PageHeader>
                <Divider />
                <Row>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} title="Project details">
                            <Form.Item label="Project name">
                                <Input
                                    value={project.name}
                                    onChange={(ev) => {
                                        project.name = ev.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Project Id">
                                <Input
                                    value={project.id}
                                    disabled
                                    onChange={(ev) => {
                                        project.id = ev.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="ORCID">
                                <Input
                                    value={project.ownerORCID}
                                    onChange={(ev) => {
                                        project.ownerORCID = ev.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="Owner Name">
                                <Input
                                    value={project.ownerName}
                                    onChange={(ev) => {
                                        project.ownerName = ev.target.value;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row>
                                    <Col span={20}></Col>
                                    <Col span={4}>
                                        <Space>
                                            <Button type="primary">Submit</Button>
                                            <Button type="default">Cancel</Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={11}>
                        <h3>Actions</h3>
                        <Row>
                            <Button type="default" icon={<LockOutlined />}>
                                Lock Project
                            </Button>
                        </Row>
                        <Row>
                            <label>
                                <br></br>No changes will be allowed after performing this action.
                            </label>
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Button type="primary" icon={<DownloadOutlined />}>
                                Download archive for Leomed
                            </Button>
                        </Row>
                        <Row>
                            <label>
                                <p></p>
                                <p> Exports the following artefacts:</p>
                                <Card style={{ width: 300 }}>
                                    <p> - Samples and workflow metadata</p>
                                    <p> - Protein database .fasta file</p>
                                    <p> - Generated Spectral Library</p>
                                    <p> - Resulting protein matrix</p>
                                </Card>
                            </label>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
