import React from 'react';
import { Button, Tooltip } from 'antd';
import { CSVLink } from 'react-csv';
import { StoreContext, ListDataContext, Store } from '.';

export type Header<T> = {
    label: string;
    key: keyof T;
};

type ButtonExportProps<T extends object> = {
    title: string;
    data: T[];
    headers?: Header<T>[];
};

export function ButtonExportSelected<T extends object>(props: ButtonExportProps<T>): React.ReactElement {
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

type ButtonExport2<T extends object> = {
    title: string;
    headers?: Header<T>[];
};

export function ButtonExportAll<T extends object>(props: ButtonExport2<T>): React.ReactElement {
    const getData = (store: ListDataContext<T>) => store.activeData;

    return <ButtonExportBase headers={props.headers} title={props.title} fetchData={getData} />;
}

type Props<T> = {
    title: string;
    headers?: Header<T>[];
    fetchData: (store: ListDataContext<T>) => T[];
};

type State<T> = { data: T[] };

export class ButtonExportBase<T> extends React.Component<Props<T>, State<T>> {
    csvLink = React.createRef();
    state = { data: [] };

    static contextType = StoreContext;

    fetchData = () => {
        const store: ListDataContext<T> = Store.getStore(this.context.name);
        this.setState({ data: store.activeData }, () => {
            // click the CSVLink component to trigger the CSV download
            if (this.csvLink.current != null) (this.csvLink.current as any).link.click();
        });
    };

    render() {
        const convertedHeaders = this.props.headers!.map((header) => {
            return { key: header.key.toString(), label: header.label };
        });

        return (
            <Tooltip title="Download the current table data through a file">
                <Button type={'default'} onClick={this.fetchData}>
                    <CSVLink
                        data={this.state.data}
                        className="hidden"
                        ref={(r: any) => (this.csvLink = r)}
                        target="_blank"
                        headers={convertedHeaders}
                    >
                        {this.props.title}
                    </CSVLink>
                </Button>
            </Tooltip>
        );
    }
}
