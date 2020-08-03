import React, { FunctionComponent } from 'react';
import { Tooltip, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

type ButtonExportProps = {
    onExportDone: () => void;
};
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
