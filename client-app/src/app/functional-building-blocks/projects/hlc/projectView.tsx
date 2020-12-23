import React from 'react';
import { Project } from '../../../types';

import { Descriptions } from 'antd';

type ProjectViewProps = {
    project: Project;
};

export class ProjectView extends React.Component<ProjectViewProps, {}> {
    public render() {
        const project: Project = this.props.project;
        return (
            <Descriptions title="Project details">
                <Descriptions.Item label={'Name'}>{project.name}</Descriptions.Item>
                <Descriptions.Item label={'Owner name'}>{project.ownerName}</Descriptions.Item>
                <Descriptions.Item label={'Owner ORCID'}>{project.ownerORCID}</Descriptions.Item>
                <Descriptions.Item label={'Id'}>{project.id}</Descriptions.Item>
                <Descriptions.Item label={'Description'}>{project.description}</Descriptions.Item>
                <Descriptions.Item label={'Is locked'}>{project.isLocked ? 'true' : 'false'}</Descriptions.Item>
            </Descriptions>
        );
    }
}
