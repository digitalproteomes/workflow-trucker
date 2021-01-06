import { Constants } from '../../default-data/constants';
import { BaseApi } from '../../infrastructure/api';
import { EWorkflowTag, MsRun, MSRunNew, SOP } from '../../types';

export class Api {
    public static async getMsRunsAsync(projectId: string): Promise<MsRun[]> {
        try {
            return await BaseApi.getAsync(`msruns/project?projectId=${projectId}`);
        } catch (err) {
            return mockMsRuns();
        }
    }

    public static async postAsync(msRun: MsRun): Promise<MsRun> {
        try {
            return await BaseApi.postAsync(`/msrun`, msRun);
        } catch (error) {
            return mockMsRuns()[0];
        }
    }

    public static async postMsRuns(samples: MSRunNew[]): Promise<void> {
        return await BaseApi.postAsync(`/msrun`, { samples: samples });
    }

    public static async getSOPsAsync(projectId: string): Promise<SOP[]> {
        return await BaseApi.getAsync(
            `/sops/project/type?projectId=${projectId}&sopType=Standard Procedure Sample Preparation`,
        );
    }
}

function mockMsRuns(): MsRun[] {
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
            description: '3 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            instrumentId: '3 instrument id',
            msReadySampleId: '3 ms ready sample id',
            msReadySampleName: '3 ms ready sample name',
            name: '3 mock PHRT_005_001_CPAC',
            sopFileName: "Sample_PREP_SOP",
            processingPerson: '3 mock Processing person',
            projectId: Constants.projectId,
            protocolId: 'DIA_protocol',
            runId: 34,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SamplePreparation,
        },
        {
            clinicalSamples: [
                {
                    id: '2 clinical id',
                    name: '2 clinical name',
                },
                {
                    id: '3 clinical id',
                    name: '4 clinical name',
                },
            ],
            createdDate: '2020-06-06T13:53:35.357000+00:00',
            description: '4 Generated as mock',
            id: '5edb9fdf4765770ed5b68a74',
            sopFileName: "Sample_PREP_SOP",
            instrumentId: '4 instrument id',
            msReadySampleId: '4 ms ready sample id',
            msReadySampleName: '4 ms ready sample name',
            name: '4 mock PHRT_005_001_CPAC',
            processingPerson: '3 mock Processing person',
            projectId: Constants.projectId,
            protocolId: 'DIA_protocol',
            runId: 45,
            updatedDate: '2020-06-06T13:53:35.357000+00:00',
            workflowTag: EWorkflowTag.SwathAnalysis,
        },
    ];
}
