import { BaseApi } from '../../infrastructure/api';
import { SampleJourney } from '../../types';

export class Api {
    public static async getJourneyAsync(sampleId: string): Promise<SampleJourney> {
        try {
            return await BaseApi.getAsync(`sampleJourney/sample?sampleId=${sampleId}`);
        } catch (err) {
            return mockSampleJourney;
        }
    }
}
const mockSampleJourney: SampleJourney = {
    clinicalSampleNames: ['PHRT_005_001_CPAC'],
    intermediateSampleNames: ['IS_PHRT_005_1001_CPAC'],
    msReadySampleNames: ['MSR_IS_PHRT_005_1001_CPAC'],
    msRunNames: ['sgoetze_A1902_248'],
    swathAnalysisNames: ['PHRT_001_005_CPAC_SWATH'],
    specLibNames: [],
    outputProteinMatrixNames: ['PHRT_005_Protein_Matrix.tsv'],
    outputSpecLibNames: [],
    links: [
        {
            nodeStart: 'PHRT_005_001_CPAC',
            nodeEnd: 'IS_PHRT_005_1001_CPAC',
            label: 'PHRT_Sample_Preparation_SOP',
        },
        {
            nodeStart: 'IS_PHRT_005_1001_CPAC',
            nodeEnd: 'MSR_IS_PHRT_005_1001_CPAC',
            label: '',
        },
        {
            nodeStart: 'MSR_IS_PHRT_005_1001_CPAC',
            nodeEnd: 'sgoetze_A1902_248',
            label: 'PHRT_Mass_Spectrometry_SOP',
        },
        {
            nodeStart: 'sgoetze_A1902_248',
            nodeEnd: 'PHRT_001_005_CPAC_SWATH',
            label: 'PHRT_Data_Analysis_SOP',
        },
        {
            nodeStart: 'PHRT_001_005_CPAC_SWATH',
            nodeEnd: 'PHRT_005_Protein_Matrix.tsv',
            label: 'output',
        },
    ],
};
