import React from 'react';
import { Project } from '../../../types';

import { List } from 'antd';

type ProjectViewProps = {
    project: Project;
};

export class ProjectView extends React.Component<ProjectViewProps, {}> {
    public render() {
        const project: Project = this.props.project;
        return (
            <List>
                <List.Item>
                    <h3>Project details</h3>
                </List.Item>
                <List.Item>
                    <b>Id: </b>
                    {project.id}
                </List.Item>
                <List.Item>
                    <b>Name: </b>
                    {project.name}
                </List.Item>
                <List.Item>
                    <b>Owner Name: </b>
                    {project.ownerName}
                </List.Item>
                <List.Item>
                    <b>Owner ORCID: </b>
                    {project.ownerORCID}
                </List.Item>
                <List.Item>
                    <b>Description: </b>
                    {project.ownerORCID}
                </List.Item>
                <List.Item>
                    <b>Is locked: </b>
                    {project.isLocked ? 'true' : 'false'}
                </List.Item>
            </List>
        );
    }
}
