import React from 'react';
import { Button, Tooltip } from 'antd';
import { CSVLink } from 'react-csv';

// class ListDataStore<T> {
//     // todo - instead of keeping the selected entries and all the table entries in the state of a component, why not have a store like element starting from the root (index page)? this could contain both the selected and active entries, and the elements needing those would just reference them instead of getting and maintaining a full copy
//     selectedRows: T[] = [];
//     activeData: T[] = [];
// }

export type Header<T> = {
    label: string;
    key: keyof T;
};

type ButtonExportProps<T extends object> = {
    title: string;
    // dataStore: ListDataStore<T>;
    data: T[];
    headers?: Header<T>[];
};

export function ButtonExport<T extends object>(props: ButtonExportProps<T>): React.ReactElement {
    const convertedHeaders = props.headers!.map((header) => {
        return { key: header.key.toString(), label: header.label };
    });

    return (
        <Tooltip title="Download the current table data through a file">
            <Button type={'default'}>
                <CSVLink data={props.data} headers={convertedHeaders}>
                    {props.title}
                </CSVLink>
            </Button>
        </Tooltip>
    );
}
