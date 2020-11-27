import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { InputModal } from '../../../../common/inputModal';
import { IntermediateSample } from '../../../../types/types';
import { Store } from 'antd/lib/form/interface';
import { Api } from '../../api';

type Props = {
    parentSample: IntermediateSample | null;
    onCreateSuccessful: (samples: IntermediateSample[]) => void;
    onCancel: () => void;
};

export const FormFractionate: FunctionComponent<Props> = ({ parentSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onCreate(formData: Store) {
        try {
            const names: string[] = formData.names;
            const samples = names.map((sampleName, _index) => ({ name: sampleName }));

            // wait - is the result an array of clinical samples, or an array of intermediate samples
            // wait - do we really need this array of results?
            const createdSamples: IntermediateSample[] = await Api.postFractionatedAsync({
                projectId: parentSample!.projectId,
                parentSampleId: parentSample!.id,
                fractionatedSamples: samples,
            });

            onCreateSuccessful(createdSamples);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const inputs: JSX.Element[] = [getDynamicListInput()];

    return (
        <InputModal
            isVisible={parentSample != null}
            title={`Fractionate clinical sample`}
            inputs={inputs}
            errorMessage={errorMessage}
            onCreate={onCreate}
            onCancel={onCancel}
        />
    );
};

// debt - extract this into a helper (or into the existing inputModalHelpers)
function getDynamicListInput() {
    return (
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
