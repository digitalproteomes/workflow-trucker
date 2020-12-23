import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent, useState } from 'react';
import { InputModal } from '../../../../common/inputModal';
import { createFormInput, createFormInputCheckbox } from '../../../../common/inputModalHelpers';
import { Project } from '../../../../types';

type Props = {
    project: Project | null;
    onCancel: () => void;
    onCreateSuccessful: (updated: Project) => void;
};

export const FormEditProject: FunctionComponent<Props> = (props: Props) => {
    const [errorMessage] = useState<string | null>(null);

    const isActiveInputForm: boolean = props.project !== null;

    if (!isActiveInputForm) return null;

    const onCreate = (data: Project) => {
        console.log('data', data);
        props.onCreateSuccessful(data);
    };

    const onCancel = () => {
        props.onCancel();
    };

    const project: Project = props.project!;

    const inputs: JSX.Element[] = [
        createFormInput('Name', Project.nameof('name'), 'name', true),
        createFormInput('Owner name', Project.nameof('ownerName'), 'owner name', true),
        createFormInput('Owner ORCID', Project.nameof('ownerORCID'), 'owner ORCID', true),
        createFormInput('Description', Project.nameof('description'), 'description', true),
        createFormInputCheckbox('isLocked', Project.nameof('isLocked'), project.isLocked),
    ];

    return (
        <InputModal
            isVisible={isActiveInputForm}
            title="Edit project details"
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={async (data: Store) => onCreate(data as Project)}
            onCancel={onCancel}
            getExistingValues={() => {
                return project;
            }}
        />
    );
};
