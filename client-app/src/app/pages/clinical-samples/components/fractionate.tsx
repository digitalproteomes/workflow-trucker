import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { InputModal } from '../../../common/inputModal';
import { FormInstance } from 'antd/lib/form';
import { BaseApi } from '../../../infrastructure/api';
import { Sample } from '../../../types';

const { Text } = Typography;

export { ButtonFractionate, FractionateInputForm };

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ButtonFractionateProps = {
    onFractionate: () => void;
    style?: React.CSSProperties | undefined;
};

const ButtonFractionate: FunctionComponent<ButtonFractionateProps> = ({ onFractionate, style }) => {
    return (
        <Button type="default" onClick={onFractionate} style={style}>
            Fractionate
        </Button>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

class Api {
    public static async postSampleAsync(payload: any): Promise<Sample[]> {
        return await BaseApi.postAsync(`/sample/fractionated`, payload);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormProps = {
    parentSample: Sample | null;
    onCreateSuccessful: (samples: Sample[]) => void;
    onCancel: () => void;
};

const FractionateInputForm: FunctionComponent<FormProps> = ({ parentSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (formData: any) => {
        async function saveSample() {
            try {
                const names: string[] = formData.names;
                const samples = names.map((sampleName, _index) => ({ name: sampleName }));

                const createdSamples: Sample[] = await Api.postSampleAsync({
                    projectId: parentSample!.projectId,
                    parentSampleId: parentSample!.id,
                    fractionatedSamples: samples,
                });

                onCreateSuccessful(createdSamples);
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
            title={`Fractionate sample ${'sample name goes here'}`}
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
            name="fractionate-sample-input-form"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.List name="names">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'Fractions' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input the fraction name or delete this field.',
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="fraction name" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '60%' }}
                                >
                                    <PlusOutlined /> Create fraction
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>
            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};
