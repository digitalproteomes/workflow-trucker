import { observable, computed } from 'mobx';

export class SampleRef {
    @observable
    sampleIdRef: string = '';
}

export class Sample {
    @observable
    id: string = '';

    @observable
    name: string = '';

    @observable
    protocolId: string = '';

    @observable
    sample_ref: SampleRef[] | null = null;
}

export class ProjectLeader {
    @observable
    ORCID: string = '';

    @observable
    name: string = '';
}

export class Project {
    @observable
    id: string = '';

    @observable
    unit: string = '';

    @observable
    project_leader: ProjectLeader = new ProjectLeader();

    @observable
    sample: Sample[] | null = null;
}
