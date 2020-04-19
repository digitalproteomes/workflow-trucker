import React from 'react';
import { Project } from '../types';
import { Descriptions } from 'antd';
import { observer } from 'mobx-react';

type ProjectViewProps = {
    project: Project;
};

// more complex FunctionComponent examples can be found here https://fettblog.eu/typescript-react/components/
export const ProjectView = observer((props: ProjectViewProps) => (
    <div>
        <Descriptions title="Project details" layout="horizontal" size="small">
            <Descriptions.Item label="Name">{props.project.name}</Descriptions.Item>
            <Descriptions.Item label="Owner">{props.project.owner}</Descriptions.Item>
            <Descriptions.Item label="ORCID">{props.project.orcId}</Descriptions.Item>
            <Descriptions.Item label="ID">{props.project.id}</Descriptions.Item>
        </Descriptions>
    </div>
));
