import React, { useEffect, useState, FunctionComponent } from 'react';
import { Table, Button, Divider, Form, Input, Modal, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Sample } from '../../types';
import { ProtocolTypes } from '../../constants';
import { FormInstance } from 'antd/lib/form';
import { Api } from '../main/api'; // todo - move the Api higher up. I should not be coupled to the other page
import { DeleteOutlined } from '@ant-design/icons';

type State = {
    activeInputForm: boolean;
    refreshNeeded: boolean;
    samples: Sample[];
};

export const ClinicalSamples: FunctionComponent = () => {
    const [state, setState] = useState<State>({
        activeInputForm: false,
        samples: [],
        refreshNeeded: true,
    });
    // or instead of having complex object as state, one can use the value directly
    // const [visible, setVisible] = useState(false);

    async function fetchClinicalSamples() {
        const projectId: number = 5;
        const protocolId: number = ProtocolTypes.Clinical;
        const samples: Sample[] = await Api.getSamplesByProtocolIdAsync(projectId, protocolId);
        setState({ ...state, refreshNeeded: false, samples });
    }

    const { activeInputForm, samples } = state;

    useEffect(() => {
        if (state.refreshNeeded) {
            console.log('refresh needed');
            fetchClinicalSamples(); // todo - what happens here in case of an exception?
            // setState({ ...state, refreshNeeded: false });
        }
    }, [state]); // empty array passed here because this effect depends on nothing. We want it to happen only once.

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setState({ ...state, activeInputForm: !state.activeInputForm });
                }}
                style={{ float: 'right', marginRight: 74 }}
            >
                Add new clinical sample
            </Button>
            <Button
                type="default"
                onClick={() => {
                    console.log('add to pooling');
                }}
                style={{ float: 'right', marginRight: 16 }}
            >
                Pooling preparation
            </Button>
            <InputModal
                visible={activeInputForm}
                onCreate={(values: any) => {
                    // todo - this any to something is scary
                    console.log('Received values of form: ', values);
                    setState({ ...state, activeInputForm: false });

                    async function saveClinicalSample() {
                        const isSuccess: boolean = await Api.postClinicalSampleAsync(
                            values.name as string,
                            5,
                            Math.random(),
                        );
                        if (isSuccess) {
                            console.log('refresh samples list');
                            setState({ ...state, refreshNeeded: true });
                        }
                    }
                    saveClinicalSample();
                }}
                onCancel={() => {
                    setState({ ...state, activeInputForm: false });
                }}
            ></InputModal>
            <Divider></Divider>
            {samples === null ? <div>No samples yet</div> : tableColumns(samples)}
        </div>
    );
};

// begin modal region

interface Values {
    title: string;
    description: string;
    modifier: string;
}

type ModalProps = {
    visible: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
};

const InputModal: FunctionComponent<ModalProps> = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new clinical sample"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            {inputForm(form)}
        </Modal>
    );
};
// end modal region

// begin form region
const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function inputForm(form: FormInstance) {
    return (
        <Form
            {...formLayout}
            name="clinical-sample-input-form"
            initialValues={{ remember: true }}
            form={form}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter a name!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
}
// end form region

// begin table region
const columns: ColumnsType<Sample> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Source Sample Id',
        dataIndex: 'sampleId',
        key: 'sampleId',
    },
    {
        title: 'Protocol Id',
        dataIndex: 'protocolId',
        key: 'protocolId',
    },
    {
        title: 'Protocol Name',
        dataIndex: 'protocolName',
        key: 'protocolName',
    },
    {
        title: 'Action',
        key: 'action',
        // todo - investicate what space is
        render: (text, record) => (
            <Space size="middle">
                {/* <DeleteOutlined /> */}
                <a>Fractionate</a>
                <a>Single Prep</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

function tableColumns(samples: Sample[]) {
    const rowSelection = {
        selectedRowKeys: [2, 3, 4], // todo - add in selectedstuff
        // onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [Table.SELECTION_ALL],
    };

    return (
        <Table
            rowSelection={rowSelection}
            dataSource={samples}
            columns={columns}
            rowKey={(row) => row.sampleId}
        />
    );
}
// end table region
