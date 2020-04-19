import { observable, computed } from 'mobx';

export class Project {
    @observable
    name: string = '';

    @observable
    owner: string = '';

    @observable
    orcId: string = '';

    @observable
    id: string = '';
}

export class Counter {
    @observable
    count: number = 0;

    @computed
    get countMessage(): string {
        return `counter is now ${this.count}`;
    }
}
