import * as React from 'react';
import { Dictionary } from './utils';
import Tag, { TagProps } from 'antd/lib/tag';
import { CheckCircleOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { EWorkflowTag, EProtocolTag, ESOPType } from '../types';

const WorkflowTagProps: Dictionary<TagProps> = {};
// WorkflowTagProps[EWorkflowTag.SamplePreparation] = { color: 'orange', icon: <SyncOutlined spin /> };
WorkflowTagProps[EWorkflowTag.SamplePreparation] = { color: 'purple', icon: <SyncOutlined /> };
WorkflowTagProps[EWorkflowTag.SwathAnalysis] = { color: 'red', icon: <CheckCircleOutlined /> };
WorkflowTagProps[EWorkflowTag.LibraryGeneration] = { color: 'magenta', icon: <ClockCircleOutlined /> };

const SOPTypeProps: Dictionary<TagProps> = {};
SOPTypeProps[ESOPType.sampleSOP] = { color: 'purple', icon: <SyncOutlined /> };
SOPTypeProps[ESOPType.msRunSOP] = { color: 'red', icon: <CheckCircleOutlined /> };
SOPTypeProps[ESOPType.sampleSOP] = { color: 'magenta', icon: <ClockCircleOutlined /> };

export function getWorkflowTag(tagName: EWorkflowTag) {
    const tagProps = WorkflowTagProps[tagName];
    return <Tag {...tagProps}>{tagName}</Tag>;
}

export function getSOPType(tagName: ESOPType) {
    const tagProps = SOPTypeProps[tagName];
    return <Tag {...tagProps}>{tagName}</Tag>;
}

const ProtocolTagProps: Dictionary<TagProps> = {};
ProtocolTagProps[EProtocolTag.Single] = { color: 'blue' };
ProtocolTagProps[EProtocolTag.Fractionation] = { color: 'cyan' };
ProtocolTagProps[EProtocolTag.Pooling] = { color: 'green' };

export function getProtocolTag(tagName: EProtocolTag) {
    const tagProps = ProtocolTagProps[tagName];
    return <Tag {...tagProps}>{tagName}</Tag>;
}
