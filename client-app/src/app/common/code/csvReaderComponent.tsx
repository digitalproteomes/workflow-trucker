import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { TypeMapConverter } from '..';

interface ReaderEntry {
    data: any;
    errors: any[];
    meta: any;
}

type Props<T> = {
    onDataLoaded: (data: T[]) => void;

    converter: TypeMapConverter<T>;
};

export default class CSVReaderComponent<T> extends Component<Props<T>, {}> {
    private buttonRef: React.RefObject<CSVReader> = React.createRef(); // todo - this initialization is useless, as it gets overwritten by the button reference.

    handleOpenDialog = (e: any) => {
        // Note that the ref is set async, so it might be null at some point
        if (this.buttonRef.current) {
            (this.buttonRef.current as any).open(e);
        }
    };

    handleOnFileLoad = (entries: ReaderEntry[]) => {
        // todo - handle entries with errors?
        const newElements: T[] = entries.map((entry: ReaderEntry) => {
            return this.props.converter.convert(entry.data);
        });

        this.props.onDataLoaded(newElements);
    };

    handleOnError = (err: any, _file: any, _inputElem: any, _reason: any) => {
        console.log(err);
    };

    handleOnRemoveFile = (data: any) => {
        console.log('---------------------------');
        console.log('on file remove', data);
        console.log('---------------------------');
    };

    handleRemoveFile = (e: any) => {
        // Note that the ref is set async, so it might be null at some point
        if (this.buttonRef.current) {
            (this.buttonRef.current as any).removeFile(e);
        }
    };

    render() {
        return (
            <CSVReader
                ref={this.buttonRef}
                onFileLoad={this.handleOnFileLoad}
                onError={this.handleOnError}
                config={{
                    // all config options can be found here https://www.papaparse.com/docs#config
                    header: true,
                    // worker: true, // causes exception
                    dynamicTyping: true,
                    skipEmptyLines: 'greedy',
                    transformHeader: (header: string) => {
                        // to lower case and remove all white spaces
                        const processedHeader: string = header.toLowerCase().replaceAll(' ', '');

                        const query = this.props.converter.tryGet(processedHeader);

                        // the undefined value will be mapped to the ignored_columns_sink
                        return query.found ? query.value : 'ignored_columns_sink';
                    },
                }}
                noClick
                noDrag
                onRemoveFile={this.handleOnRemoveFile}
            >
                {({ file }: any) => (
                    <aside
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}
                    >
                        <button
                            type="button"
                            onClick={this.handleOpenDialog}
                            style={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                width: '40%',
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        >
                            Browse file
                        </button>
                        <div
                            style={{
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: '#ccc',
                                height: 45,
                                lineHeight: 2.5,
                                marginTop: 5,
                                marginBottom: 5,
                                paddingLeft: 13,
                                paddingTop: 3,
                                width: '60%',
                            }}
                        >
                            {file && file.name}
                        </div>
                        <button
                            style={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                            onClick={this.handleRemoveFile}
                        >
                            Remove
                        </button>
                    </aside>
                )}
            </CSVReader>
        );
    }
}
