import { Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { getColumn, getEditableColumn } from '../../../../common/columnHelpers';
import { ClinicalSampleNew, ClinicalSample } from '../../../../types/clinicalSample';

type Props = {
    entries: ClinicalSampleNew[];
    onListChanged: (newSamples: ClinicalSampleNew[]) => void;
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

    const handleSave = (row: ClinicalSampleNew) => {
        const newData: ClinicalSampleNew[] = [...entries];
        const index = newData.findIndex((item) => row.name === item.name);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        onListChanged(newData);
    };

    const columns: ColumnsType<ClinicalSampleNew> = [
        getColumn('Name', ClinicalSampleNew.nameof('name')),
        getEditableColumn('Clinical sample code', ClinicalSampleNew.nameof('clinicalSampleCode'), handleSave),
        getColumn('Processing person', ClinicalSampleNew.nameof('processingPerson')),
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
