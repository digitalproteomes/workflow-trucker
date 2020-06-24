import { observable, action } from 'mobx';
import { Project, Sample } from './types';
import { MainPageApi } from './pages/main/mainPageApi';

class Store {
    @observable
    project: Project | null = null;

    @observable
    samples: Sample[] | null = null;

    @action
    public async fetchSelectedProject() {
        const projectName: string = 'CPAC';
        this.project = await MainPageApi.getProjectAsync(projectName);
    }

    @action
    public async fetchSelectedProjectSamplesByProtocolIdAsync(projectId: number, protocolId: number) {
        this.samples = await MainPageApi.getSamplesByProtocolIdAsync(projectId, protocolId);
    }

    // todo - this is a hack to keep the state (the selected parent sample). This should get removed when one can get a clinical sample by id
    parentSample: Sample | null = null;
}

export const AppStore: Store = new Store();
