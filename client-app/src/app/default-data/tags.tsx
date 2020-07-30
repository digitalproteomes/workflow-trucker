import * as React from 'react';
import { Dictionary } from '../common/utils';
import Tag, { TagProps } from 'antd/lib/tag';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { EWorkflowTag, EProtocolTag } from '../types';

const WorkflowTagProps: Dictionary<TagProps> = {};
// WorkflowTagProps[EWorkflowTag.SamplePreparation] = { color: 'orange', icon: <SyncOutlined spin /> };
WorkflowTagProps[EWorkflowTag.SamplePreparation] = { color: 'orange', icon: <SyncOutlined spin /> };
WorkflowTagProps[EWorkflowTag.SwathAnalysis] = { color: 'yellow', icon: <CheckCircleOutlined /> };
WorkflowTagProps[EWorkflowTag.LibraryGeneration] = { color: 'gold', icon: <ClockCircleOutlined /> };

export function getWorkflowTag(tagName: EWorkflowTag) {
    const tagProps = WorkflowTagProps[tagName];
    return <Tag {...tagProps}>{tagName}</Tag>;
}

const ProtocolTagProps: Dictionary<TagProps> = {};
ProtocolTagProps[EProtocolTag.Single] = { color: 'blue' };
ProtocolTagProps[EProtocolTag.Fractionation] = { color: 'cyan' };
ProtocolTagProps[EProtocolTag.Pooling] = { color: 'purple' };

export function getProtocolTag(tagName: EProtocolTag) {
    const tagProps = ProtocolTagProps[tagName];
    return <Tag {...tagProps}>{tagName}</Tag>;
}
