import { Button, Row, Col, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { TypeMapConverter } from '../..';

const { Text } = Typography;

interface ReaderEntry {
    data: any;
    errors: any[];
    meta: any;
}

type Props<T> = {
    onDataLoaded: (data: T[]) => void;

    converter: TypeMapConverter<T>;
};

// todo - docs - mind the difference between react-papaparse https://github.com/bunlong/react-papaparse and the original papaparse https://github.com/mholt/PapaParse

export default class CSVImporter<T> extends Component<Props<T>, {}> {
    private buttonRef: React.RefObject<CSVReader> = React.createRef(); // todo - this initialization is useless, as it gets overwritten by the button reference.

    handleOpenDialog = (e: any) => {
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

    handleOnRemoveFile = (_: any) => {};

    handleRemoveFile = (e: any) => {
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
                    <>
                        <Row>
                            <Col span={8}>
                                <Button type="default" icon={<UploadOutlined />} onClick={this.handleOpenDialog}>
                                    Browse file
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Text>{file !== null ? file.name : 'No file selected'}</Text>
                            </Col>
                            <Col span={8}>
                                {file && (
                                    <Button type="default" onClick={this.handleRemoveFile}>
                                        Remove
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </>
                )}
            </CSVReader>
        );

        // drag & drop style
        // return (
        //     // todo - styling - to handle the width of the div behind the filename, create a pr against the react-papaparse repo with the style prop added in https://github.com/Bunlong/react-papaparse/blob/master/src/CSVReader.tsx
        //     <CSVReader
        //         ref={this.buttonRef}
        //         onFileLoad={this.handleOnFileLoad}
        //         onDrop={this.handleOnFileLoad}
        //         onError={this.handleOnError}
        //         onRemoveFile={this.handleOnRemoveFile}
        //         addRemoveButton
        //         config={{
        //             // all config options can be found here https://www.papaparse.com/docs#config. check what is the version used by react-papaparse first!
        //             header: true,
        //             dynamicTyping: true,
        //             skipEmptyLines: 'greedy',
        //             transformHeader: (header: string) => {
        //                 const processedHeader: string = header.toLowerCase().replaceAll(' ', '');

        //                 const query = this.props.converter.tryGet(processedHeader);

        //                 // the undefined value will be mapped to the ignored_columns_sink
        //                 return query.found ? query.value : 'ignored_columns_sink';
        //             },
        //         }}
        //     >
        //         <span>Drop CSV file here or click to upload.</span>
        //     </CSVReader>
        // );
    }
}
