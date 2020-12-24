import React, { FunctionComponent, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { DeliveredProcedureOutlined } from '@ant-design/icons';
import { Project } from '../../../types';
import { FormEditProject } from './components/formEditProject';

type Props = {
    project: Project | null;
    style?: React.CSSProperties;
    onUpdateProjectSuccess: (updated: Project) => void;
};

export const ButtonEditProject: FunctionComponent<Props> = (props: Props) => {
    const [project, setProject] = useState<Project | null>(null);

    const projectEditForm =
        project === null ? (
            <></>
        ) : (
            <FormEditProject
                project={project}
                onCancel={() => setProject(null)}
                onUpdateSuccessful={(updated: Project) => {
                    setProject(null);
                    props.onUpdateProjectSuccess(updated);
                }}
            />
        );

    return (
        <>
            <Tooltip title={'Edit project'}>
                <Button
                    type="primary"
                    icon={<DeliveredProcedureOutlined />}
                    onClick={() => {
                        setProject(props.project);
                    }}
                    style={props.style}
                >
                    {'Edit Project'}
                </Button>
            </Tooltip>
            {projectEditForm}
        </>
    );
};
