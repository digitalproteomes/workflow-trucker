import React from 'react';
import { ListDataContext } from '..';
import { ButtonExportBase } from './csvExporterButtonBase';

export type Header<T> = {
    label: string;
    key: keyof T;
};

type ButtonExportProps<T extends object> = {
    title: string;
    headers?: Header<T>[];
};

export function ButtonExportSelected<T extends object>(props: ButtonExportProps<T>): React.ReactElement {
    const getData = (store: ListDataContext<T>) => store.activeData;

    return <ButtonExportBase headers={props.headers} title={props.title} fetchData={getData} />;
}

export function ButtonExportAll<T extends object>(props: ButtonExportProps<T>): React.ReactElement {
    const getData = (store: ListDataContext<T>) => store.activeData;

    return <ButtonExportBase headers={props.headers} title={props.title} fetchData={getData} />;
}
