import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent, useState } from 'react';
import { Api } from '../..';
import { InputModal, InputHelper } from '../../../../common';
import { Project } from '../../../../types';

type Props = {
    project: Project | null;
    onCancel: () => void;
    onCreateSuccessful: (created: Project) => void;
};

export const FormCreateProject: FunctionComponent<Props> = (props: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isActiveInputForm: boolean = props.project !== null;

    if (!isActiveInputForm) return null;

    const project: Project = props.project!;

    const onCreate = (data: Store) => {
        const updated: Project = { ...project, ...(data as Project) };

        async function saveProject() {
            try {
                const result: Project = await Api.post(updated);

                props.onCreateSuccessful(result);
            } catch (error) {
                setErrorMessage(error.message);
            }
        }

        saveProject();
    };

    const onCancel = () => {
        props.onCancel();
    };

    const inputs: JSX.Element[] = [
        InputHelper.createFormInput('Id', Project.nameof('projectId'), 'project id', true),
        InputHelper.createFormInput('Name', Project.nameof('name'), 'name', true),
        InputHelper.createFormInput('Owner name', Project.nameof('ownerName'), 'owner name', true),
        InputHelper.createFormInput('Owner ORCID', Project.nameof('ownerORCID'), 'owner ORCID', true),
        InputHelper.createFormInput('Description', Project.nameof('description'), 'description', true),
        InputHelper.createFormInputCheckbox('isLocked', Project.nameof('isLocked'), project.isLocked),
    ];

    return (
        <InputModal
            isVisible={isActiveInputForm}
            title="Project details"
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={async (data: Store) => onCreate(data)}
            buttonConfirmText={'Create'}
            onCancel={onCancel}
            getExistingValues={() => {
                return project;
            }}
        />
    );
};
