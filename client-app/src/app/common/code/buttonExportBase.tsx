import React from 'react';
import { Button, Tooltip } from 'antd';
import { CSVLink } from 'react-csv';
import { ListDataContext, Store } from '..';
import { Header } from './buttonExport';
import { StoreContext } from './datastore'; // by importing it directly from here, instead of importing it from index.ts, will avoid throwing an undefined exception because of named/default module export

type BaseProps<T> = {
    title: string;
    headers?: Header<T>[];
    fetchData: (store: ListDataContext<T>) => T[];
};
type Base<T> = { data: T[] };

export class ButtonExportBase<T> extends React.Component<BaseProps<T>, Base<T>> {
    csvLink = React.createRef(); // todo - this is getting initialized, but the value is actually overwritten when the ref is assigned from the button to this member
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
        const convertedHeaders = this.props.headers?.map((header) => {
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
