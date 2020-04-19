import React from 'react';
import { Form, Input, Button } from 'antd';
import { Project } from '../types';
import { observer } from 'mobx-react';

interface ProjectEditProps {
    project: Project;
    onSave: () => void;
}

@observer
export class ProjectEdit extends React.Component<ProjectEditProps, any> {
    render() {
        const { project, onSave } = this.props;

        return (
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }} title="Project details">
                <Form.Item label="Project name">
                    <Input
                        value={project.name}
                        onChange={(ev) => {
                            project.name = ev.target.value;
                        }}
                    />
                </Form.Item>
                <Form.Item label="Owner">
                    <Input
                        value={project.owner}
                        onChange={(ev) => {
                            project.owner = ev.target.value;
                        }}
                    />
                </Form.Item>
                <Form.Item label="ORCID">
                    <Input
                        value={project.orcId}
                        onChange={(ev) => {
                            project.orcId = ev.target.value;
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
                <Form.Item>
                    <Button type="primary" onClick={onSave}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
