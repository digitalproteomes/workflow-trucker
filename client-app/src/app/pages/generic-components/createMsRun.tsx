import React, { FunctionComponent, useState } from 'react';
import { Button, Form, Typography } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MergeCellsOutlined } from '@ant-design/icons';
import { Sample, MsRun } from '../../types';
import { Api } from '../ms-runs/api';
import { InputModal, getFormInput } from '../../common/inputModal';
const { Text } = Typography;

type ButtonProps = {
    samples: Sample[];
    style?: React.CSSProperties | undefined;
};

export const ButtonCreateMsRun: FunctionComponent<ButtonProps> = ({ samples, style }) => {
    const [isActiveInputForm, setActiveInputFormFlag] = useState<boolean>(false);

    const onClick = () => {
        setActiveInputFormFlag(true);
    };

    const onCancel = () => {
        setActiveInputFormFlag(false);
    };

    return (
        <>
            <Button type="default" onClick={onClick} style={style} icon={<MergeCellsOutlined />}>
                Create Ms Run
            </Button>
            <InputForm
                isActiveInputForm={isActiveInputForm}
                samples={samples}
                onCancel={onCancel}
                onCreateSuccessful={(msRun: MsRun) => {
                    console.log(`created ms run is`, msRun);
                    setActiveInputFormFlag(false);
                }}
            />
        </>
    );
};

type FormProps = {
    isActiveInputForm: boolean;
    onCreateSuccessful: (msRun: MsRun) => void;
    onCancel: () => void;
    samples: Sample[];
};

const InputForm: FunctionComponent<FormProps> = ({ isActiveInputForm, onCreateSuccessful, onCancel, samples }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onCreate = (values: any) => {
        async function saveRun() {
            try {
                const sampleIds: string[] = samples.map((sample: Sample) => sample.id);

                const createdMsRun: MsRun = await Api.postAsync({ ...values, samples: sampleIds });
                onCreateSuccessful(createdMsRun);
            } catch (error) {
                setErrorMessage(error.Message);
            }
        }
        saveRun();
    };

    return (
        <InputModal
            visible={isActiveInputForm}
            title="New MsRun"
            inputForm={(form: FormInstance) => {
                return inputForm(form, errorMessage);
            }}
            onCreate={onCreate}
            onCancel={onCancel}
        />
    );
};

function inputForm(formInstance: FormInstance, errorMessage: string | null): JSX.Element {
    return (
        // todo - move the Form definition in the same file as the InputModal
        <Form {...formLayout} name="clinical-sample-input-form" initialValues={{ remember: true }} form={formInstance}>
            {getFormInput<MsRun>('name', 'Name')}
            {getFormInput<MsRun>('instrumentId', 'Instrument Id')}
            {getFormInput<MsRun>('projectId', 'Project Id')}
            {getFormInput<MsRun>('protocolId', 'Protocol Id')}
            {getFormInput<MsRun>('runCode', 'Run Code')}
            {errorMessage == null ? null : (
                <Form.Item label="Error" name="errorMessage">
                    <Text type="danger">{errorMessage}</Text>
                </Form.Item>
            )}
        </Form>
    );
}

const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
