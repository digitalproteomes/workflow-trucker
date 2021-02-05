import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { Project } from '../../../types';
import { FormCreateProject } from './components/formCreateProject';

type Props = {
    style?: React.CSSProperties;
    onCreateProjectSuccessful: (created: Project) => void;
};

const projectTemplate: Project = {
    id: '', // this is to be set on the backend once the entity is created
    projectId: '',
    name: '',
    ownerName: '',
    ownerORCID: '',
    description: '',
    isLocked: false,
};

export const ButtonCreateProject: FunctionComponent<Props> = (props: Props) => {
    const [project, setProject] = useState<Project | null>(null);

    const projectCreateForm =
        project === null ? (
            <></>
        ) : (
            <FormCreateProject
                project={project}
                onCancel={() => setProject(null)}
                onCreateSuccessful={(created: Project) => {
                    setProject(null);

                    props.onCreateProjectSuccessful(created);
                }}
            />
        );

    return (
        <>
            <Tooltip title={'Create project'}>
                <Button
                    type="primary"
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => {
                        setProject(projectTemplate);
                    }}
                    style={props.style}
                >
                    {'Create Project'}
                </Button>
            </Tooltip>
            {projectCreateForm}
        </>
    );
};
