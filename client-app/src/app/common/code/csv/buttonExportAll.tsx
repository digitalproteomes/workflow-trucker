import React from 'react';
import { ListDataContext } from '../..';
import { getCurrentDate } from '../../utils';
import { ButtonExportBase } from './buttonExportBase';
import { ButtonExportProps } from './types';

export function ButtonExportAll<T extends object>(props: ButtonExportProps<T>): React.ReactElement {
    const getData = (store: ListDataContext<T>) => store.activeData;

    return (
        <ButtonExportBase
            headers={props.headers}
            title={props.title}
            fetchData={getData}
            filename={`ProtoPile_export_${getCurrentDate()}.csv`}
        />
    );
}
