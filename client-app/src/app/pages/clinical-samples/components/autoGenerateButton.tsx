import React, { FunctionComponent } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type ButtonCreateNewProps = {
    onAutoGenerateClick: () => void;
    style?: React.CSSProperties | undefined;
};

export const ButtonAutoGenerate: FunctionComponent<ButtonCreateNewProps> = ({
    onAutoGenerateClick: onAddNewClick,
    style,
}) => {
    return (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddNewClick} style={style}>
            Bulk create clinical samples
        </Button>
    );
};
