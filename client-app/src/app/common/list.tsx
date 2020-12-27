import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { ListBase } from './listBase';
import { ExpandableConfig } from 'antd/lib/table/interface';

type Props<T extends object> = {
    style?: React.CSSProperties;
    tableTitle?: string;

    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: T) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: T[]) => void;
    onActiveDataChanged?: (activeData: T[]) => void;

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
    onRowSelectionChange,
    onActiveDataChanged,

    fetchEntries,
    rowKeySelector,
    columns,
    expandableConfig,
}: Props<T> & { children?: React.ReactNode }): React.ReactElement {
    const [entries, setEntries] = useState<T[] | null>(null);

    async function executeFetch() {
        const data = await fetchEntries();
        setEntries(data);

        if (onActiveDataChanged != null) onActiveDataChanged(data);
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
            onRowSelectionChange={onRowSelectionChange}
            onActiveDataChanged={onActiveDataChanged}
            rowKeySelector={rowKeySelector}
            expandableConfig={expandableConfig}
        />
    );
}
