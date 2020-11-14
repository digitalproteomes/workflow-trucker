import React from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection, ExpandableConfig } from 'antd/lib/table/interface';

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
