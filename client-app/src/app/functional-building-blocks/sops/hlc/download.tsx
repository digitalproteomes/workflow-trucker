import React, { FunctionComponent } from 'react';
import { Tooltip, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SOP } from '../../../types';
import { Api } from '../api';

type ButtonDownloadProps = {
    sop: SOP;
    style?: React.CSSProperties | undefined;
};

export const ButtonDownload: FunctionComponent<ButtonDownloadProps> = ({ sop, style }) => {
    return (
        <Tooltip title="Download SOP">
            <Button type="link" href={Api.getDownloadLink(sop.sopFileName)} style={style} icon={<DownloadOutlined />}>
                Download file
            </Button>
        </Tooltip>
    );
};
