import React, { FunctionComponent, useState } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Api } from '../../api';
import { UploadProps } from 'antd/lib/upload';
import { Store } from 'rc-field-form/lib/interface';
import { Constants } from '../../../../default-data/constants';

import { RcFile } from 'antd/lib/upload/interface';
import { InputModal, InputHelper } from '../../../../common';
import { SOP, ESOPType } from '../../../../types';

type Props = {
    isActiveUploadForm: boolean;
    onUploadSuccessful: () => void;
    onCancel: () => void;
};

export const FormUpload: FunctionComponent<Props> = ({ isActiveUploadForm, onUploadSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [file, setFile] = useState<RcFile | null>(null);

    const uploadProps: UploadProps = {
        fileList: file === null ? [] : [file],
        onRemove: (_: any) => {
            setFile(null);
        },
        beforeUpload: (selectedFile: RcFile, _: RcFile[]) => {
            setFile(selectedFile);
            setErrorMessage(null);
            return false;
        },
    };

    const handleUpload = async (sopData: SOP) => {
        if (file === null) {
            setErrorMessage('An SOP must be attached');
            return;
        }

        try {
            await Api.postAsync(sopData, file, Constants.projectId);

            setFile(null);

            onUploadSuccessful();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const placeholder = undefined;
    const isRequired = true;

    const inputs: JSX.Element[] = [
        InputHelper.createFormInput('Name', SOP.nameof('name'), placeholder, isRequired),
        InputHelper.createFormInput('Description', SOP.nameof('description')),
        InputHelper.createFormInput('Processing person', SOP.nameof('processingPerson'), placeholder, isRequired),
        InputHelper.createFormInput('Author', SOP.nameof('owner'), placeholder, isRequired),
        InputHelper.createFormInput('Revision', SOP.nameof('revision'), placeholder, isRequired),
        InputHelper.createSOPTypeFormSelect(
            'SOP Type',
            SOP.nameof('artefactClass'),
            [ESOPType.sampleSOP, ESOPType.msRunSOP, ESOPType.dataSOP],
            isRequired,
        ),
    ];

    return (
        <InputModal
            isVisible={isActiveUploadForm}
            title="Upload SOP"
            inputs={inputs}
            onCreate={async (data: Store) => {
                handleUpload(data as SOP);
            }}
            onCancel={onCancel}
            errorMessage={errorMessage}
        >
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} style={{ float: 'right' }}>
                    Attach SOP
                </Button>
            </Upload>
        </InputModal>
    );
};
