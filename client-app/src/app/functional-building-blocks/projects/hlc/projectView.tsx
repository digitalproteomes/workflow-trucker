import React from 'react';
import { Project } from '../../../types';

import { Typography } from 'antd';
const { Paragraph, Title, Text } = Typography;

type ProjectViewProps = {
    project: Project;
};

export class ProjectView extends React.Component<ProjectViewProps, {}> {
    public render() {
        const project: Project = this.props.project;
        return (
            <>
                <Title>Project details</Title>
                <Paragraph>{project.name}</Paragraph>
                <Paragraph>{project.ownerORCID}</Paragraph>
                <Paragraph>{project.description}</Paragraph>
                <Text strong={true}>Project id</Text>
                <Paragraph>{project.projectId}</Paragraph>
            </>
        );
    }
}
