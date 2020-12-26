import { ColumnType } from 'antd/lib/table';
import { getAllFilterProps } from './listBaseFiltering';

export function getColumn<T>(
    label: string,
    name: keyof T,
    render?: (record: T) => React.ReactNode,
    searchEnabled: boolean = true,
): ColumnType<T> {
    const column: ColumnType<T> = {
        title: label,
        dataIndex: name.toString(),
        ...getAllFilterProps<T>(name, searchEnabled),
    };

    if (render) column.render = (_value, record, _index) => render(record);

    return column;
}

export function getEditableColumn<T>(
    label: string,
    name: keyof T,
    handleSave: (record: T) => void,
    render?: (record: T) => React.ReactNode,
    searchEnabled: boolean = true,
): ColumnType<T> {
    const column: ColumnType<T> = {
        title: label,
        dataIndex: name.toString(),
        ...getAllFilterProps<T>(name, searchEnabled),

        onCell: (record) => ({
            record,
            editable: true,
            dataIndex: name.toString(),
            title: label,
            handleSave: handleSave,
        }),
    };

    if (render) column.render = (_value, record, _index) => render(record);

    return column;
}

export function getActionsColumn<T>(renderActions: (record: T) => JSX.Element): ColumnType<T> {
    return {
        title: 'Action',
        key: 'action',
        render: (_value: any, record: T, _index: number) => {
            return renderActions(record);
        },
    };
}
