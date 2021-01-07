import React from 'react';
import { Button, Tooltip } from 'antd';
import { CSVLink } from 'react-csv';
import { ListDataContext, Store } from '../..';
import { Header } from "./types";
import { StoreContext } from '../datastore'; // by importing it directly from here, instead of importing it from index.ts, will avoid throwing an undefined exception because of named/default module export

type Props<T> = {
    title: string;
    headers?: Header<T>[];
    fetchData: (store: ListDataContext<T>) => T[];
};

type State<T> = { data: T[] };

// todo - use papaparse both for upload and download of the data https://github.com/bunlong/react-papaparse#-csvdownloader
// export default class CSVDownloaderComponent extends React.Component {
//     render() {
//         return (
//             <CSVDownloader
//                 data={`Column 1,Column 2,Column 3,Column 4
// 1-1,1-2,1-3,1-4
// 2-1,2-2,2-3,2-4
// 3-1,3-2,3-3,3-4
// 4,5,6,7`}
//                 filename={'filename'}
//                 type={'link'}
//             >
//                 Download
//             </CSVDownloader>
//         );
//     }
// }

export class ButtonExportBase<T> extends React.Component<Props<T>, State<T>> {
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
            <Tooltip title="Download the current selection">
                <Button type={'primary'} onClick={this.fetchData} style={{ float: 'right', marginRight: 10 }}>
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
