import React, { FunctionComponent, useState } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Api } from '../api';
import { UploadProps } from 'antd/lib/upload';
import { Store } from 'rc-field-form/lib/interface';
import { Constants } from '../../../default-data/constants';
import { createFormInput, createSOPFormSelect } from '../../../common/inputModalHelpers';

import { RcFile } from 'antd/lib/upload/interface';
import { InputModal_v2 } from '../../../common/inputModal';
import { SOP, ESOPType } from '../../../types';

export { ButtonUploadSOP, FormUploadSOP };

type ButtonProps = {
    onUploadDialogOpen: () => void;
    style?: React.CSSProperties | undefined;
};

const ButtonUploadSOP: FunctionComponent<ButtonProps> = ({ onUploadDialogOpen, style }) => {
    return (
        <Button type="primary" icon={<UploadOutlined />} onClick={onUploadDialogOpen} style={style}>
            Upload SOP
        </Button>
    );
};

type FormProps = {
    isActiveUploadForm: boolean;
    onUploadSuccessful: () => void;
    onCancel: () => void;
};

const FormUploadSOP: FunctionComponent<FormProps> = ({ isActiveUploadForm, onUploadSuccessful, onCancel }) => {
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
        createFormInput('Name', SOP.nameof('name')),
        createFormInput('Description', SOP.nameof('description')),
        createFormInput('Processing person', SOP.nameof('processingPerson')),
        createFormInput('Author', SOP.nameof('owner')),
        createFormInput('Revision', SOP.nameof('revision')),
        createSOPFormSelect('SOP Type', SOP.nameof('artefactClass'), [
            ESOPType.sampleSOP,
            ESOPType.msRunSOP,
            ESOPType.dataSOP,
        ]),
    ];

    return (
        <InputModal_v2
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
        </InputModal_v2>
    );
};
