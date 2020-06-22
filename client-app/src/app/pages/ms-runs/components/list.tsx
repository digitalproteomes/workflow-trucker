import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import { Msrun } from '../../../types';
import { MsrunList } from '../../../common/msrunList';

type Props = {
    msruns: Msrun[] | null;
};

export const List: FunctionComponent<Props> = ({ msruns }) => {
    return <MsrunList msruns={msruns} renderActions={renderActions} />;
};

const renderActions = () => (
    <Space size="middle">
        <span>Delete</span>
    </Space>
);
