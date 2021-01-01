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
    const [file, setFile] = useState<RcFile | null>(null);

    const uploadProps: UploadProps = {
        fileList: file === null ? [] : [file],
        onRemove: (_: any) => {
            setFile(null);
        },
        beforeUpload: (selectedFile: RcFile, _: RcFile[]) => {
            setFile(selectedFile);
            return false;
        },
    };

    const handleUpload = async (sopData: SOP) => {
        if (file === null) {
            // wait: set error message
            return;
        }

        try {
            await Api.postAsync(sopData, file, Constants.projectId);

            setFile(null);

            onUploadSuccessful();
        } catch (error) {
            // wait: set the error message? in case the upload fails, nothing is shown on the UI at the moment
        }
    };

    const inputs: JSX.Element[] = [
        InputHelper.createFormInput('Name', SOP.nameof('name')),
        InputHelper.createFormInput('Description', SOP.nameof('description')),
        InputHelper.createFormInput('Processing person', SOP.nameof('processingPerson')),
        InputHelper.createFormInput('Author', SOP.nameof('owner')),
        InputHelper.createFormInput('Revision', SOP.nameof('revision')),
        InputHelper.createSOPFormSelect('SOP Type', SOP.nameof('artefactClass'), [
            ESOPType.sampleSOP,
            ESOPType.msRunSOP,
            ESOPType.dataSOP,
        ]),
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
            errorMessage={null}
        >
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} style={{ float: 'right' }}>
                    Attach SOP
                </Button>
            </Upload>
        </InputModal>
    );
};
