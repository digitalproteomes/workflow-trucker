import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { ListBase } from './listBase';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { Store, ListDataContext } from '.';
import { StoreContext } from './code/datastore';

type Props<T extends object> = {
    style?: React.CSSProperties;
    tableTitle?: string;

    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: T) => JSX.Element;

    fetchEntries: () => Promise<T[]>;
    rowKeySelector: (row: T) => string;
    columns: ColumnsType<T>;
    expandableConfig?: ExpandableConfig<T>;
};

export class CommonList<T extends object> extends React.Component<Props<T>> {
    public render() {
        const storeContext = React.useContext(StoreContext);
        const store: ListDataContext<T> = Store.getStore<T>(storeContext.name);

        const [entries, setEntries] = useState<T[] | null>(null);

        const {
            style,
            tableTitle,

            isRefreshNeeded,
            onRefreshDone,
            renderActions,

            fetchEntries,
            rowKeySelector,
            columns,
            expandableConfig,
        } = { ...this.props };

        async function executeFetch() {
            const data = await fetchEntries();
            setEntries(data);

            store.setActiveData(data);
        }

        useEffect(() => {
            if (entries == null || isRefreshNeeded) {
                console.log('refresh was needed');

                executeFetch();
                onRefreshDone();
            }
        });

        return (
            <ListBase
                style={style}
                title={tableTitle}
                entries={entries}
                columns={columns}
                renderActions={renderActions}
                rowKeySelector={rowKeySelector}
                expandableConfig={expandableConfig}
            />
        );
    }
}
