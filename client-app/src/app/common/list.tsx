import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { ListBase } from './listBase';
import { ExpandableConfig } from 'antd/lib/table/interface';
import { StoreContext, Store, ListDataContext } from '.';

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

export function CommonList<T extends object>({
    style,
    tableTitle,

    isRefreshNeeded,
    onRefreshDone,
    renderActions,

    fetchEntries,
    rowKeySelector,
    columns,
    expandableConfig,
}: Props<T> & { children?: React.ReactNode }): React.ReactElement {
    const storeContext = React.useContext(StoreContext);
    const store: ListDataContext<T> = Store.getStore<T>(storeContext.name);

    const [entries, setEntries] = useState<T[] | null>(null);

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
