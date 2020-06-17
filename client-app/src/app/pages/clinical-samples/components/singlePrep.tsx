import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Typography } from 'antd';
import { InputModal } from '../../../common/inputModal';
import { FormInstance } from 'antd/lib/form';
import { BaseApi } from '../../../infrastructure/api';
import { Sample } from '../../../types';

const { Text } = Typography;

export { ButtonSinglePrep, SinglePrepInputForm };

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ButtonProps = {
    onSinglePrep: () => void;
    style?: React.CSSProperties | undefined;
};

const ButtonSinglePrep: FunctionComponent<ButtonProps> = ({ onSinglePrep, style }) => {
    return (
        <Button type="default" onClick={onSinglePrep} style={style}>
            Single Prep
        </Button>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

class Api {
    public static async postSampleAsync(payload: any): Promise<Sample> {
        return await BaseApi.postAsync(`/sample/individual`, payload);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormProps = {
    parentSample: Sample | null;
    onCreateSuccessful: (sample: Sample) => void;
    onCancel: () => void;
};

const SinglePrepInputForm: FunctionComponent<FormProps> = ({ parentSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (formData: any) => {
        async function saveSample() {
            try {
                console.log(formData);

                const createdSample: Sample = await Api.postSampleAsync({
                    projectId: parentSample!.projectId,
                    parentSampleId: parentSample!.id,
                    //formData,
                });

                onCreateSuccessful(createdSample);
            } catch (error) {
                // const err = error as FriendlyError;
                // setCreateErrorMessage(err.message);

                setErrorMessage(error.message);
            }
        }

        saveSample();
    };

    return (
        <InputModal
            visible={parentSample != null}
            title={`Create individual sample`}
            inputForm={(form: FormInstance) => {
                return inputForm(form, errorMessage);
            }}
            onCreate={onCreate}
            onCancel={onCancel}
        />
    );
};

function inputForm(form: FormInstance, errorMessage: string | null): JSX.Element {
    return (
        <Form
            {...formItemLayoutWithOutLabel}
            name="individual-sample-input-form"
            initialValues={{ remember: true }}
            form={form}
        >
            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};
