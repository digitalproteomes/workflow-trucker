import React from 'react';
import { ListDataContext } from '../..';
import { getCurrentDate } from '../../utils';
import { ButtonExportBase } from './buttonExportBase';
import { ButtonExportProps } from './types';

export function ButtonExportSelected<T extends object>(props: ButtonExportProps<T>): React.ReactElement {
    const getData = (store: ListDataContext<T>) => store.selectedData;

    return (
        <ButtonExportBase
            headers={props.headers}
            title={props.title}
            fetchData={getData}
            filename={`ProtoPile_export_${getCurrentDate()}.csv`}
        />
    );
}
