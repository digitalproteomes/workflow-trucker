import React from 'react';
import { Table, Skeleton } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { TableRowSelection, ExpandableConfig, TableCurrentDataSource } from 'antd/lib/table/interface';
import { getActionsColumn } from './columnHelpers';
import { ListDataContext, Store } from '.';
import { StoreContext } from './code/datastore';

type Props<T extends object> = {
    style?: React.CSSProperties;
    title?: string;

    entries: T[] | null;
    columns: ColumnsType<T>;
    renderActions?: (record: T) => JSX.Element;

    rowKeySelector: (row: T) => string;
    expandableConfig?: ExpandableConfig<T>;
};

// export function ListBase<T extends object>(: Props<T> & { children?: React.ReactNode }): React.ReactElement {
export class ListBase<T extends object> extends React.Component<Props<T>> {
    public render() {
        const storeContext = React.useContext(StoreContext);
        const store: ListDataContext<T> = Store.getStore<T>(storeContext.name);

        const rowSelection: TableRowSelection<T> = {
            onChange: (_selectedRowKeys: any, selectedRows: T[]) => store.setSelectedData(selectedRows),
            selections: [Table.SELECTION_ALL],
        };

        const { style, title, entries, columns, renderActions, rowKeySelector, expandableConfig } = { ...this.props };

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
                    store.setActiveData(extra.currentDataSource);
                    console.log('store active data', store.activeData);
                }}
            />
        );
    }
}
