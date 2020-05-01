import React from 'react';
import { Project, Sample } from '../types';
import { Descriptions } from 'antd';
import { SamplesView } from './samplesView';

type ProjectViewProps = {
    project: Project;
};

export class ProjectView extends React.Component<ProjectViewProps, {}> {
    public render() {
        const project: Project = this.props.project;

        let samples: Sample[] | null = null;
        if (project.sample !== null) {
            samples = project.sample;
        }

        return (
            <div>
                <Descriptions title="Project details" layout="horizontal" size="small">
                    <Descriptions.Item label="Name">
                        {project.project_leader.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="ORCID">
                        {project.project_leader.ORCID}
                    </Descriptions.Item>
                    <Descriptions.Item label="unit">{project.unit}</Descriptions.Item>
                    <Descriptions.Item label="ID">{project.id}</Descriptions.Item>
                </Descriptions>

                {samples ? <SamplesView samples={samples} /> : null}
            </div>
        );
    }
}
