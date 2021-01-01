import React, { FunctionComponent, useState } from 'react';
import { Tooltip, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormImportFromCsv } from './components/formImportFromCsv';

type Props = {
    style?: React.CSSProperties;
};

export const ButtonImportMsRuns: FunctionComponent<Props> = (props: Props) => {
    const [isFormActive, setFormActiveFlag] = useState<boolean>(false);

    return (
        <>
            <Tooltip title="Import MS ready sample names and Run codes from Mass Spec">
                <Button
                    type="default"
                    icon={<UploadOutlined />}
                    style={props.style}
                    onClick={() => setFormActiveFlag(true)}
                >
                    Import MS Runs
                </Button>
            </Tooltip>
            {isFormActive ? (
                <FormImportFromCsv
                    onCreateSuccessful={() => setFormActiveFlag(false)}
                    onCancel={() => setFormActiveFlag(false)}
                />
            ) : undefined}
        </>
    );
};
