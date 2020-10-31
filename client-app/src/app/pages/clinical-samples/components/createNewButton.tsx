import React, { FunctionComponent } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// todo - make this component similar to the create new ms run component, and move it up into the page-components namespace
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
type ButtonCreateNewProps = {
    onCreateNewClick: () => void; // todo - instead of combininig the button and the input dialog together from outside, why not include the dialog component here in the same file? that would mean that the entry point is the button, the rest are details. Once the button is imported somewhere, all the other logic is going to be there.
    style?: React.CSSProperties | undefined;
};

export const ButtonCreateNew: FunctionComponent<ButtonCreateNewProps> = ({
    onCreateNewClick: onAddNewClick,
    style,
}) => {
    return (
        <Button type="default" icon={<PlusOutlined />} onClick={onAddNewClick} style={style}>
            {' '}
            Create clinical sample
        </Button>
    );
};
