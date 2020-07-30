import React from 'react';
import { ClinicalSampleCompact } from '../types';
import { getColumn, SampleListV2 } from './sampleList';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
export function getCompactClinicalSampleList(name: string, samples: ClinicalSampleCompact[]) {
    return (
        <SampleListV2
            title={`Clinical samples of ${name}`}
            // style={{ width: 'fit-content' }}
            columns={[
                getColumn('Name', ClinicalSampleCompact.nameof('name')),
                getColumn(
                    '',
                    ClinicalSampleCompact.nameof('id'),
                    () => {
                        return (
                            <Button type="default" icon={<EyeOutlined />}>
                                Details
                            </Button>
                        );
                    },
                    false,
                ),
            ]}
            rowKeySelector={(row: ClinicalSampleCompact) => row.id}
            samples={samples}
        />
    );
}
