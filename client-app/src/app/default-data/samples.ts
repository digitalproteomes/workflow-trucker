import { Sample, MsRun, ClinicalSample, IntermediateSample } from '../types';
import { Constants } from './constants';

export function mockClinicalSamples(): ClinicalSample[] {
    return [
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: 'Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: 'mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            sourceSampleId: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: 'Sample Preparation',
        },
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '2 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: '2 mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            sourceSampleId: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: 'Sample Preparation',
        },
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: 'Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: '3 mock PHRT_005_001_CPAC',
            processingPerson: '3 mock Processing person',
            projectId: Constants.projectId,
            sourceSampleId: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: 'Sample Preparation',
        },
    ];
}

export function mockIntermediateSamples(): IntermediateSample[] {
    return [
        {
            clinicalSamples: [],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: 'Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: 'mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            protocolName: 'mock protocol name',
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: 'Sample Preparation',
        },
        {
            clinicalSamples: [],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '2 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: '2 mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            protocolName: 'mock protocol name',
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: 'Sample Preparation',
        },
        {
            clinicalSamples: [
                {
                    id: '1 clinical id',
                    name: '1 clinical name',
                },
                {
                    id: '2 clinical id',
                    name: '2 clinical name',
                },
            ],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '3 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: '3 mock PHRT_005_001_CPAC',
            processingPerson: '3 mock Processing person',
            projectId: Constants.projectId,
            protocolName: 'mock protocol name',
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: 'Sample Preparation',
        },
    ];
}

export function mockSamples(): Sample[] {
    return [
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            id: '5edb9fdf4765770ed5b68a74',
            name: 'mock PHRT_005_001_CPAC',
            parentSampleId: 'mock 5edb9fdf4765770ed5b68a75',
            projectId: Constants.projectId,
            protocolId: 1,
            protocolName: 'clinical_sample',
            sourceSampleId: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
        },
        {
            createdDate: '2020-06-06T13:53:35.392000+00:00',
            id: '5edb9fdf4765770ed5b68a75',
            name: 'mock PHRT_005_002_CPAC',
            parentSampleId: 'mock 5edb9fdf4765770ed5b68a75',
            projectId: Constants.projectId,
            protocolId: 1,
            protocolName: 'clinical_sample',
            sourceSampleId: 2,
            updatedDate: '2020-06-06T13:53:35.392000+00:00',
        },
        {
            createdDate: '2020-06-06T13:53:35.401000+00:00',
            id: '5edb9fdf4765770ed5b68a76',
            name: 'mock PHRT_005_003_CPAC',
            parentSampleId: 'mock 5edb9fdf4765770ed5b68a75',
            projectId: Constants.projectId,
            protocolId: 1,
            protocolName: 'clinical_sample',
            sourceSampleId: 3,
            updatedDate: '2020-06-06T13:53:35.401000+00:00',
        },
    ];
}

export function mockMsRun(): MsRun[] {
    return [
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            id: '5edb9fdf4765770ed5b68a74',
            name: 'mock PHRT_005_001_CPAc_MS_1',
            projectId: Constants.projectId,
            protocolId: 'DIA_protocol',
            instrumentId: 'MS:1002523',
            runCode: 'runCode:1002523',
            samples: ['1', '2'],
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
        },
        {
            createdDate: '2020-06-06T13:53:35.392000+00:00',
            id: '5edb9fdf4765770ed5b68a75',
            name: 'mock PHRT_005_002_CPAC_MS_1',
            projectId: Constants.projectId,
            protocolId: 'DIA_protocol',
            instrumentId: 'MS:1002524',
            runCode: 'runCode:1002524',
            samples: ['3', '4'],
            updatedDate: '2020-06-06T13:53:35.392000+00:00',
        },
    ];
}
