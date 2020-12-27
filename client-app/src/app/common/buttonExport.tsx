import React, { FunctionComponent } from 'react';
import { Button, Tooltip } from 'antd';
import { SampleNotifications } from './notifications';

// class ListDataStore<T> {
//     // todo - instead of keeping the selected entries and all the table entries in the state of a component, why not have a store like element starting from the root (index page)? this could contain both the selected and active entries, and the elements needing those would just reference them instead of getting and maintaining a full copy
//     selectedRows: T[] = [];
//     activeData: T[] = [];
// }
export type ButtonExportProps<T> = {
    title: string;
    // dataStore: ListDataStore<T>;
    activeData: T[];
};

export function ButtonExport<T extends object>(): FunctionComponent<ButtonExportProps<T>> {
    return (props: ButtonExportProps<T>) => {
        return (
            <Tooltip title="Download the current table data through a file">
                <Button
                    type={'default'}
                    onClick={() => {
                        console.log('active data', props.activeData);

                        SampleNotifications.queueExportSuccess();
                    }}
                >
                    {props.title}
                </Button>
            </Tooltip>
        );
    };
}
