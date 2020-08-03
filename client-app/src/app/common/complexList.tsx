import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { SampleListV2 } from './sampleList';
import { ExpandableConfig } from 'antd/lib/table/interface';

type ListProps<T extends object> = {
    style?: React.CSSProperties;
    tableTitle?: string;

    isRefreshNeeded: boolean;
    onRefreshDone: () => void;
    renderActions?: (sample: T) => JSX.Element;
    onRowSelectionChange?: (selectedSamples: T[]) => void;

    fetchSamples: () => Promise<T[]>;
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

export function ComplexList<T extends object>({
    style,
    tableTitle,

    isRefreshNeeded,
    onRefreshDone,
    renderActions,
    onRowSelectionChange,

    fetchSamples,
    rowKeySelector,
    columns,
    expandableConfig,
}: ListProps<T> & { children?: React.ReactNode }): React.ReactElement {
    const [samples, setSamples] = useState<T[] | null>(null);

    async function executeSampleFetch() {
        setSamples(await fetchSamples());
    }

    useEffect(() => {
        if (samples == null || isRefreshNeeded) {
            console.log('refresh was needed');

            executeSampleFetch(); // todo - is this call getting executed in an async or sync manner?

            onRefreshDone();
        }
    });

    return (
        <SampleListV2
            style={style}
            title={tableTitle}
            samples={samples}
            columns={columns}
            renderActions={renderActions}
            onRowSelectionChange={onRowSelectionChange}
            rowKeySelector={rowKeySelector}
            expandableConfig={expandableConfig}
        />
    );
}
