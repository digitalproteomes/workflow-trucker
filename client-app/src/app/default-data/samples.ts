import {
    IntermediateSample,
    MSReadySample,
    EWorkflowTag,
    EProtocolTag,
    SwathAnalysis,
    SpectralLibrary,
    SOP,
} from '../types';
import { ClinicalSample } from '../types';
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
            clinicalSampleCode: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.LibraryGeneration,
            quality: 'good',
        },
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '2 Generated as mock',
            id: '5edb9fdf4765770ed5b68a75',
            name: '2 mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            clinicalSampleCode: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SamplePreparation,
            quality: 'good',
        },
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: 'Generated as mock',
            id: '5edb9fdf4765770ed5b68a76',
            name: '3 mock PHRT_005_001_CPAC',
            processingPerson: '3 mock Processing person',
            projectId: Constants.projectId,
            clinicalSampleCode: 1,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SwathAnalysis,
            quality: 'good',
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
            protocolName: EProtocolTag.Fractionation,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.LibraryGeneration,
        },
        {
            clinicalSamples: [],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '2 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            name: '2 mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            protocolName: EProtocolTag.Pooling,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SwathAnalysis,
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
            protocolName: EProtocolTag.Single,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SamplePreparation,
        },
    ];
}

export function mockMSReadySamples(): MSReadySample[] {
    return [
        {
            clinicalSamples: [],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: 'Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            intermediateSampleId: '1 interim sample id',
            intermediateSampleName: '1 interim sample name',
            name: 'mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SwathAnalysis,
        },
        {
            clinicalSamples: [],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '2 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            intermediateSampleId: '2 interim sample id',
            intermediateSampleName: '2 interim sample name',
            name: '2 mock PHRT_005_001_CPAC',
            processingPerson: 'mock Processing person',
            projectId: Constants.projectId,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.LibraryGeneration,
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
            intermediateSampleId: '3 interim sample id',
            intermediateSampleName: '3 interim sample name',
            name: '3 mock PHRT_005_001_CPAC',
            processingPerson: '3 mock Processing person',
            projectId: Constants.projectId,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SamplePreparation,
        },
    ];
}

export function mockSwathAnalysis(): SwathAnalysis[] {
    return [
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
            description: '1 Generated as mock',
            id: '5f2330c4723e24adcf419e96',
            name: 'PHRT_001_005_CPAC_SWATH',
            projectId: Constants.projectId,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SwathAnalysis,
            msRunIds: [
                {
                    id: '5f2330c0723e24adcf419d57',
                    name: 'sgoetze_A1902_004',
                },
                {
                    id: '5f2330c0723e24adcf419d58',
                    name: 'sgoetze_A1902_006',
                },
            ],
            protocolId: '1',
            protocolName: 'SWATH_protocol',
            spectralLibraryId: '5f2330c3723e24adcf419e95',
            swathId: '1',
        },
    ];
}

export function mockSpectralLibrary(): SpectralLibrary[] {
    return [
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
            description: '1 Generated as mock',
            id: '5f2330c4723e24adcf419e96',
            name: 'PHRT_001_005_CPAC_Lib',
            projectId: Constants.projectId,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.LibraryGeneration,
            msRunIds: [
                {
                    id: '5f2330c0723e24adcf419d57',
                    name: 'sgoetze_A1902_004',
                },
                {
                    id: '5f2330c0723e24adcf419d58',
                    name: 'sgoetze_A1902_006',
                },
            ],
            protocolId: '1',
            protocolName: 'SWATH_protocol',
            proteinDatabaseOrganism: 'UP000005640',
            proteinDatabaseVersion: 'YYMMDD',
            libId: '1',
        },
    ];
}

export function mockSOP(): SOP[] {
    return [
        {
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '1 Generated as mock',
            id: '5f2330c4723e24adcf419e96',
            name: 'PHRT_SOP',
            processingPerson: 'System',
            artefactClass: 'sampleSOP',
            // projectId: Constants.projectId,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            encodedFileId: '5f2330c4723e24adcf419e96',
            sopFileName: 'SOP file',
            owner: 'Admin',
            revision: '1.00',
        },
    ];
}
