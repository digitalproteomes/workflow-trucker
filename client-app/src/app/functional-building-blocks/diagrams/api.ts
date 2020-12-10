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

// https://json-to-js.com/
const mockSampleJourney: SampleJourney = {
    clinicalSampleNames: ['clinical_1'],
    intermediateSampleNames: ['mid_1', 'mid_2', 'mid_3', 'mid_4'],
    msReadySampleNames: ['msready_1', 'msready_2'],
    msRunNames: ['msrun_1', 'msrun_2', 'msrun_3'],
    swathAnalysisNames: ['swath_1', 'swath_2'],
    specLibNames: ['spec_1', 'spec_2'],
    outputProteinMatrixNames: ['output_protein_matrix_1.tsv', 'output_protein_matrix_2.tsv'],
    outputSpecLibNames: ['output_spec_lib_1.tsv', 'output_spec_lib_2.tsv'],
    links: [
        {
            nodeStart: 'clinical_1',
            nodeEnd: 'mid_1',
            label: '',
        },
        {
            nodeStart: 'clinical_1',
            nodeEnd: 'mid_2',
            label: '',
        },
        {
            nodeStart: 'clinical_1',
            nodeEnd: 'mid_3',
            label: '',
        },
        {
            nodeStart: 'mid_2',
            nodeEnd: 'mid_4',
            label: '',
        },
        {
            nodeStart: 'mid_3',
            nodeEnd: 'mid_4',
            label: '',
        },
        {
            nodeStart: 'mid_1',
            nodeEnd: 'msready_1',
            label: '',
        },
        {
            nodeStart: 'mid_4',
            nodeEnd: 'msready_2',
            label: '',
        },
        {
            nodeStart: 'msready_1',
            nodeEnd: 'msrun_1',
            label: 'mass spec 1',
        },
        {
            nodeStart: 'msready_1',
            nodeEnd: 'msrun_2',
            label: 'mass spec 2',
        },
        {
            nodeStart: 'msready_2',
            nodeEnd: 'msrun_3',
            label: 'mass spec 2',
        },
        {
            nodeStart: 'msrun_2',
            nodeEnd: 'swath_1',
            label: '',
        },
        {
            nodeStart: 'msrun_2',
            nodeEnd: 'swath_2',
            label: '',
        },
        {
            nodeStart: 'msrun_2',
            nodeEnd: 'spec_1',
            label: '',
        },
        {
            nodeStart: 'msrun_3',
            nodeEnd: 'spec_2',
            label: '',
        },
        {
            nodeStart: 'swath_1',
            nodeEnd: 'output_spec_lib_1.tsv',
            label: '',
        },
        {
            nodeStart: 'swath_2',
            nodeEnd: 'output_spec_lib_2.tsv',
            label: '',
        },
        {
            nodeStart: 'spec_1',
            nodeEnd: 'output_protein_matrix_1.tsv',
            label: '',
        },
        {
            nodeStart: 'spec_2',
            nodeEnd: 'output_protein_matrix_2.tsv',
            label: '',
        },
    ],
};
