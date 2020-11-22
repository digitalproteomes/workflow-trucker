import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Input, Tooltip } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { InputModal_v2 } from '../../../common/inputModal';
import { BaseApi } from '../../../infrastructure/api';
import { IntermediateSample } from '../../../types';
import { SplitCellsOutlined, EyeOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ButtonFractionateProps = {
    onFractionate: () => void;
    style?: React.CSSProperties | undefined;
};

export const ButtonFractionate: FunctionComponent<ButtonFractionateProps> = ({ onFractionate, style }) => {
    return (
        <Tooltip title="Create fractionated samples">
            <Button type="default" onClick={onFractionate} style={style} icon={<SplitCellsOutlined />}>
                Fractionate
            </Button>
        </Tooltip>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type ButtonFractionDetailsProps = {
    sample: IntermediateSample;
    style?: React.CSSProperties | undefined;
};

// wait - do we need a button to view the fractionation details? (because at the moment this is not used)
export const ButtonFractionDetails: FunctionComponent<ButtonFractionDetailsProps> = ({ sample, style }) => {
    return (
        <Tooltip title="View fractionated samples">
            <Button
                type="default"
                style={style}
                icon={<EyeOutlined />}
                href={`/samples/fractionated/details?project=${sample.projectId}&parent=${sample.id}`}
            >
                Fractions
            </Button>
        </Tooltip>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

class Api {
    public static async postSampleAsync(payload: any): Promise<IntermediateSample[]> {
        return await BaseApi.postAsync(`/sample/fractionated`, payload);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

type FormProps = {
    parentSample: IntermediateSample | null;
    onCreateSuccessful: (samples: IntermediateSample[]) => void;
    onCancel: () => void;
};

export const FractionateInputForm: FunctionComponent<FormProps> = ({ parentSample, onCreateSuccessful, onCancel }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onCreate(formData: Store) {
        try {
            const names: string[] = formData.names;
            const samples = names.map((sampleName, _index) => ({ name: sampleName }));

            // wait - is the result an array of clinical samples, or an array of intermediate samples
            // wait - do we really need this array of results?
            const createdSamples: IntermediateSample[] = await Api.postSampleAsync({
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
        <InputModal_v2
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
