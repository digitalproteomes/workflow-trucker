import { observable, action } from 'mobx';
import { Project, Sample } from './pages/main/types';
import { Api } from './pages/main/api';

class Store {
    @observable
    project: Project | null = null;

    @observable
    samples: Sample[] | null = null;

    @action
    public async fetchSelectedProject() {
        const projectName: string = 'CPAC';
        this.project = await Api.getProjectAsync(projectName);
    }

    @action
    public async fetchSelectedProjectSamples() {
        const projectId: number = 5;
        this.samples = await Api.getSamplesAsync(projectId);
    }
}

export const AppStore: Store = new Store();