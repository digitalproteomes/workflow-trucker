import * as React from 'react';
import { Dictionary } from '../common/utils';
import Tag, { TagProps } from 'antd/lib/tag';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { EWorkflowTag } from '../types';

const TagDictionary: Dictionary<TagProps> = {};
TagDictionary[EWorkflowTag.SamplePreparation] = { color: 'orange', icon: <SyncOutlined /> };
TagDictionary[EWorkflowTag.SwathAnalysis] = { color: 'yellow', icon: <CheckCircleOutlined spin /> };
TagDictionary[EWorkflowTag.LibraryGeneration] = { color: 'gold', icon: <ClockCircleOutlined spin /> };

// const WorkflowTagPropsDictionary: Dictionary<TagProps> = TagDictionary;

export function getWorkflowTag(tagName: EWorkflowTag) {
    const tagProps = TagDictionary[tagName];
    return (
        <Tag icon={tagProps.icon} color={tagProps.color}>
            {tagName}
        </Tag>
    );
}
