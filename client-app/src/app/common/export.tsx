import React, { FunctionComponent } from 'react';
import { Tooltip, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

type ButtonExportProps = {
    onExportDone: () => void;
};

// todo - prioritize export implementation, and think about integrating it in the building blocks, or into the existing list implementation
// wait - prioritize export implementation, and think about integrating it in the building blocks, or into the existing list implementation
export const ButtonExport: FunctionComponent<ButtonExportProps> = ({ onExportDone }) => {
    async function onExport() {
        onExportDone();
    }
    return (
        <Tooltip title="Export current table to .tsv">
            <Button type="dashed" icon={<ExportOutlined />} onClick={onExport} style={{ float: 'right' }}>
                Export table to .tsv
            </Button>
        </Tooltip>
    );
};
