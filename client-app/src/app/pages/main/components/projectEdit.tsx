import React from 'react';
import { Form, Input } from 'antd';
import { Project } from '../types';
import { observer } from 'mobx-react';

interface ProjectEditProps {
    project: Project;
    onSave: () => void;
}

@observer
export class ProjectEdit extends React.Component<ProjectEditProps, any> {
    render() {
        const { project } = this.props;

        return (
            <div>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} title="Project details">
                    <Form.Item label="Project name">
                        <Input
                            value={project.project_leader.name}
                            onChange={(ev) => {
                                project.project_leader.name = ev.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="ORCID">
                        <Input
                            value={project.project_leader.ORCID}
                            onChange={(ev) => {
                                project.project_leader.ORCID = ev.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="unit">
                        <Input
                            value={project.unit}
                            onChange={(ev) => {
                                project.unit = ev.target.value;
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="ID">
                        <Input
                            value={project.id}
                            onChange={(ev) => {
                                project.id = ev.target.value;
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item>
                    <Button type="primary" onClick={onSave}>
                        Submit
                    </Button>
                </Form.Item> */}
                </Form>
            </div>
        );
    }
}
