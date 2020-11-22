import { Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { getColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { SampleNew, ClinicalSample } from '../../../../types';

type Props = {
    entries: SampleNew[];
    onListChanged: (newSamples: SampleNew[]) => void;
};

export const EditableList: FunctionComponent<Props> = ({ entries, onListChanged }) => {
    const EditableContext = React.createContext<any>(null);

    const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell: React.FC<EditableCellProps> = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef<any>();
        const form = useContext(EditableContext);

        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();

                toggleEdit();

                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const handleSave = (row: SampleNew) => {
        const newData: SampleNew[] = [...entries];
        const index = newData.findIndex((item) => row.name === item.name);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        onListChanged(newData);
    };

    const columns: ColumnsType<SampleNew> = [
        getColumn('Name', SampleNew.nameof('name')),
        getEditableColumn('Clinical sample code', SampleNew.nameof('clinicalSampleCode'), handleSave),
        getColumn('Processing person', SampleNew.nameof('processingPerson')),
    ];

    return (
        <Table
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                },
            }}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={entries}
            columns={columns}
        />
    );
};

interface EditableRowProps {
    index: number;
}

// interface EditableCellProps<T> {
interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof ClinicalSample;
    record: ClinicalSample;
    handleSave: (record: ClinicalSample) => void;
}
