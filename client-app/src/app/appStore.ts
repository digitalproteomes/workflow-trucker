import { observable } from 'mobx';
import { Project, Counter } from './pages/main/types';

class Store {
    @observable
    project: Project = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'name of project',
        owner: 'owner of project',
        orcId: 'orcid of project',
    };

    @observable
    projects: Project[] = [];

    @observable
    counter: Counter = new Counter();
}

export const AppStore: Store = new Store();
export { Counter };
