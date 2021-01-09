import { Col, Modal, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import { Dictionary, ListBase } from '../../../../common';
import { getColumn } from '../../../../common/columnHelpers';
import { getCustomTag } from '../../../../common/tags';
import { MSRunNewCreateResponse } from '../../../../types/types';

// helpers start

type tempType = { name: string };

enum ListStyle {
    Success,
    Fail,
    Overwrite,
}

const styles: Dictionary<React.CSSProperties> = {};
styles[ListStyle.Success] = { backgroundColor: 'palegreen' };
styles[ListStyle.Overwrite] = { backgroundColor: 'lightblue' };
styles[ListStyle.Fail] = { backgroundColor: 'darksalmon' };

const getList = (title: string, entries: string[], listStyle: ListStyle) => {
    const convertedEntries: tempType[] = entries.map((value: string) => {
        return { name: value };
    });

    return (
        <ListBase
            style={undefined}
            title={title}
            entries={convertedEntries}
            columns={[getColumn('Name', 'name', (record) => getCustomTag(record.name, styles[listStyle]))]}
            renderActions={undefined}
            rowKeySelector={(row) => row.name}
            expandableConfig={undefined}
        />
    );
};

// helpers end

type Props = {
    summary: MSRunNewCreateResponse;
    onClose: () => void;
};

export const ModalImportSummary: FunctionComponent<Props> = (props: Props) => {
    const overwritten: string[] = props.summary.overwritten;
    const failed: string[] = props.summary.createFail;
    const succeeded: string[] = props.summary.createSuccess;

    const style: React.CSSProperties = { margin: 10 };

    return (
        <Modal
            title="Import summary"
            width={'60%'}
            visible={true}
            centered
            onOk={() => props.onClose()}
            onCancel={() => props.onClose()}
        >
            {/* total available colspan is 24. smaller number used to accomodate the margins set in the styling?  */}
            <Row>
                <Col span={6} style={style}>
                    {getList('Succeeded', succeeded, ListStyle.Success)}
                </Col>
                <Col span={6} style={style}>
                    {getList('Overwritten', overwritten, ListStyle.Overwrite)}
                </Col>
                <Col span={6} style={style}>
                    {getList('Failed', failed, ListStyle.Fail)}
                </Col>
            </Row>
        </Modal>
    );
};
