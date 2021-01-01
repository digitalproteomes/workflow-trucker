import React, { FunctionComponent, useState } from 'react';
import { Tooltip, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type Props = {
    style?: React.CSSProperties;
};

export const ButtonImportMsRuns: FunctionComponent<Props> = (props: Props) => {
    return (
        <Tooltip title="Import MS ready sample names and Run codes from Mass Spec">
            <Button type="default" icon={<UploadOutlined />} style={props.style}>
                Import MS Runs
            </Button>
        </Tooltip>
    );
};
