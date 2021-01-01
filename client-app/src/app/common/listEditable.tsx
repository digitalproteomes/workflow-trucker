import { Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

type EditableListProps<T> = {
    entries: T[];
    columns: ColumnsType<T>;
    rowKeySelector: (row: T) => string;
};

export class EditableList<T extends object> extends React.Component<EditableListProps<T>> {
    public render() {
        const EditableContext = React.createContext<any>(null);

        const EditableRow: FunctionComponent<EditableRowProps> = ({ index, ...props }) => {
            const [form] = Form.useForm();
            return (
                <Form form={form} component={false}>
                    <EditableContext.Provider value={form}>
                        <tr {...props} />
                    </EditableContext.Provider>
                </Form>
            );
        };

        const EditableCell: FunctionComponent<EditableCellProps<T>> = ({
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
                        name={dataIndex as string}
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
                    <div
                        className="editable-cell-value-wrap"
                        style={{ paddingRight: 24, minWidth: 100, minHeight: 30 }} // set the min width and height so in case the {children} will have no text, there is still an area on which the user can click
                        onClick={toggleEdit}
                    >
                        {children}
                    </div>
                );
            }

            return <td {...restProps}>{childNode}</td>;
        };

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
                dataSource={this.props.entries}
                rowKey={(row) => this.props.rowKeySelector(row)}
                columns={this.props.columns}
            />
        );
    }
}

interface EditableRowProps {
    index: number;
}

type EditableCellProps<T> = {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof T;
    record: T;
    handleSave: (record: T) => void;
};
