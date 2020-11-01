import React from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection, ColumnType, ExpandableConfig } from 'antd/lib/table/interface';
import { getAllFilterProps } from './listBaseFiltering';

type Props<T extends object> = {
    style?: React.CSSProperties;
    title?: string;

    entries: T[] | null;
    columns: ColumnsType<T>;
    renderActions?: (record: T) => JSX.Element;
    onRowSelectionChange?: (selectedRows: T[]) => void;

    rowKeySelector: (row: T) => string;
    expandableConfig?: ExpandableConfig<T>;
};

export function ListBase<T extends object>({
    style,
    title,
    entries,
    columns,
    renderActions,
    onRowSelectionChange,
    rowKeySelector,
    expandableConfig,
}: Props<T> & { children?: React.ReactNode }): React.ReactElement {
    const rowSelection: TableRowSelection<T> | undefined =
        onRowSelectionChange == null
            ? undefined
            : {
                  onChange: (_selectedRowKeys: any, selectedRows: T[]) => onRowSelectionChange(selectedRows),
                  selections: [Table.SELECTION_ALL],
              };

    if (entries == null) {
        return <Skeleton active />;
    }

    let columnsType: ColumnsType<T>;

    if (renderActions) {
        columnsType = [...columns, getRenderObject(renderActions)];
    } else {
        columnsType = columns;
    }

    return title != null ? (
        <Table
            style={style}
            title={() => <h3>{title}</h3>}
            rowSelection={rowSelection}
            dataSource={entries}
            columns={columnsType}
            rowKey={(row) => rowKeySelector(row)}
            expandable={expandableConfig}
        />
    ) : (
        <Table
            style={style}
            rowSelection={rowSelection}
            dataSource={entries}
            columns={columnsType}
            rowKey={(row) => rowKeySelector(row)}
            expandable={expandableConfig}
        />
    );
}

function getRenderObject<T>(renderActions: (record: T) => React.ReactNode) {
    return {
        title: 'Action',
        key: 'action',
        render: (_value: any, record: T, _index: number) => {
            return renderActions(record);
        },
    };
}

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