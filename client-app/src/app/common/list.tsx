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

    fetchEntries: () => Promise<T[]>;
    rowKeySelector: (row: T) => string;
    columns: ColumnsType<T>;
    expandableConfig?: ExpandableConfig<T>;
};

// todo - analyze the difference between the FunctionComponent signature and the generic component signature
/* export const List: FunctionComponent<ListProps> = ({
    isRefreshNeeded,
    onRefreshDone,
    renderActions,
    onRowSelectionChange,
}) => {*/

export function CommonList<T extends object>({
    style,
    tableTitle,

    isRefreshNeeded,
    onRefreshDone,
    renderActions,
    onRowSelectionChange,

    fetchEntries,
    rowKeySelector,
    columns,
    expandableConfig,
}: Props<T> & { children?: React.ReactNode }): React.ReactElement {
    const [entries, setEntries] = useState<T[] | null>(null);

    async function executeFetch() {
        setEntries(await fetchEntries());
    }

    useEffect(() => {
        if (entries == null || isRefreshNeeded) {
            console.log('refresh was needed');

            executeFetch(); // todo - is this call getting executed in an async or sync manner?

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
            rowKeySelector={rowKeySelector}
            expandableConfig={expandableConfig}
        />
    );
}
