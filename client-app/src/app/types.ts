import { observable } from 'mobx';

export class Sample {
    @observable
    createdDate: string = '';

    @observable
    id: string = '';

    @observable
    name: string = '';

    @observable
    projectId: string = '';

    @observable
    protocolId: number = -1;

    @observable
    protocolName: string = '';

    @observable
    sourceSampleId: number = -1;

    @observable
    updatedDate: string = '';

    public static nameof = (name: keyof Sample) => name;
}

export class Project {
    @observable
    id: string = '';

    @observable
    description: string = '';

    @observable
    createdDate: string = '';

    @observable
    isLocked: boolean = false;

    @observable
    name: string = '';

    @observable
    ownerName: string = '';

    @observable
    ownerORCID: string = '';

    @observable
    projectId: number = -1;

    @observable
    updatedDate: string = '';

    /*
    {
      "createdDate": "2020-05-08T13:46:32.067000+00:00",
      "description": "MMA Project",
      "id": "5eb562b8c65543aa9ac7e676",
      "isLocked": false,
      "name": "CPAC",
      "ownerName": "Patrick Pedrioli",
      "ownerORCID": "0000-0001-6719-9139",
      "projectId": 5,
      "updatedDate": "2020-05-08T13:46:32.067000+00:00"
    }
    */
}
