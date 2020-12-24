import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent, useState } from 'react';
import { Api } from '../..';
import { InputModal } from '../../../../common/inputModal';
import { createFormInput, createFormInputCheckbox } from '../../../../common/inputModalHelpers';
import { Project } from '../../../../types';

type Props = {
    project: Project | null;
    onCancel: () => void;
    onUpdateSuccessful: (updated: Project) => void;
};

export const FormEditProject: FunctionComponent<Props> = (props: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isActiveInputForm: boolean = props.project !== null;

    if (!isActiveInputForm) return null;

    const project: Project = props.project!;

    const onCreate = (data: Store) => {
        const updated: Project = { ...project, ...(data as Project) };

        async function saveProject() {
            try {
                const result: Project = await Api.put(updated);
                props.onUpdateSuccessful(result);
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
            onCreate={async (data: Store) => onCreate(data)}
            buttonConfirmText={'Update'}
            onCancel={onCancel}
            getExistingValues={() => {
                return project;
            }}
        />
    );
};
