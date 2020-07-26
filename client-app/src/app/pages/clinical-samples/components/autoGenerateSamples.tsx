import React, { FunctionComponent } from 'react';
import { GenerationData, SampleNew } from '../../../types';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
type FormProps = {
    templateData: GenerationData;
};

export const AutoGenerateSamples: FunctionComponent<FormProps> = ({ templateData }) => {
    const { numberOfEntries, prefixProject, suffixProject, projectId, processingPerson } = templateData;

    const samples: SampleNew[] = new Array(numberOfEntries);

    let index = 0;
    while (index < numberOfEntries) {
        const id = index + 1;

        samples[index] = {
            projectId: projectId,
            name: `${prefixProject}_${projectId}_${id}_${suffixProject}`,
            parentSampleId: 'parent_sample_id',
            protocolId: -1,
            sourceSampleId: id,
            processingPerson: processingPerson,
        };

        index++;
    }

    return <Table dataSource={samples} columns={columns} rowKey={(row) => row.name} />;
};

const columns: ColumnsType<SampleNew> = [
    { title: 'Name', dataIndex: SampleNew.nameof('name') },
    { title: 'Id', dataIndex: SampleNew.nameof('sourceSampleId') },
    { title: 'Processing person', dataIndex: SampleNew.nameof('processingPerson') },
];
