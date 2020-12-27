import React from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection, ExpandableConfig, TableCurrentDataSource } from 'antd/lib/table/interface';
import { getActionsColumn } from './columnHelpers';

type Props<T extends object> = {
    style?: React.CSSProperties;
    title?: string;

    entries: T[] | null;
    columns: ColumnsType<T>;
    renderActions?: (record: T) => JSX.Element;
    onRowSelectionChange?: (selectedRows: T[]) => void;
    onActiveDataChanged?: (activeData: T[]) => void;

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
    onActiveDataChanged,
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
        columnsType = [...columns, getActionsColumn(renderActions)];
    } else {
        columnsType = columns;
    }

    // todo - compose the table props based on the incoming handlers/callbacks. The onChange prop should be set only if there is a listener to be subscribed
    return (
        <Table
            style={style}
            title={() => (title === null ? undefined : <h3>{title}</h3>)}
            rowSelection={rowSelection}
            dataSource={entries}
            columns={columnsType}
            rowKey={(row) => rowKeySelector(row)}
            expandable={expandableConfig}
            onChange={(_pagination, _filters, _sorter, extra: TableCurrentDataSource<T>) => {
                if (onActiveDataChanged != null) onActiveDataChanged(extra.currentDataSource);
            }}
        />
    );
}
