import React from 'react';
import { Project } from '../../../types';
import { Descriptions } from 'antd';
import { observer } from 'mobx-react';

type ProjectViewProps = {
    project: Project;
};

@observer
export class ProjectView extends React.Component<ProjectViewProps, {}> {
    public render() {
        const project: Project = this.props.project;

        return this.props.project ? (
            <div>
                <Descriptions title="Project details" layout="horizontal" size="small">
                    <Descriptions.Item label="Name">{project.name}</Descriptions.Item>
                    <Descriptions.Item label="ORCID">{project.ownerORCID}</Descriptions.Item>
                    <Descriptions.Item label="ownerName">{project.ownerName}</Descriptions.Item>
                    <Descriptions.Item label="ID">{project.id}</Descriptions.Item>
                </Descriptions>
            </div>
        ) : (
            <span>No project loaded</span>
        );
    }
}
