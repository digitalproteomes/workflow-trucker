import { observable, action } from 'mobx';
import { Project } from './pages/main/types';
import { Api } from './pages/main/api';

class Store {
    @observable
    project: Project | null = null;

    @action
    public async fetchSelectedProject() {
        this.project = await Api.getAsync();
    }
}

export const AppStore: Store = new Store();
