import React from 'react';

import { Project } from './types';
import { ProjectView } from './components/projectView';
import { ProjectEdit } from './components/projectEdit';
import { SamplesPage } from './samplesPage';
import { observer } from 'mobx-react';
import { AppStore } from '../../appStore';

export { SamplesPage };

@observer
export class ProjectPage extends React.Component<{}, {}> {
    async componentDidMount() {
        await AppStore.fetchSelectedProject();
    }

    render() {
        const { project } = AppStore;

        const projectView =
            project === null ? (
                <span>no project selected</span>
            ) : (
                <div>
                    <ProjectEdit
                        project={project}
                        onSave={() => {
                            this.onSubmit(project);
                        }}
                    />
                    <ProjectView project={project} />
                </div>
            );

        return projectView;
    }

    async onSubmit(project: Project): Promise<void> {
        try {
            // return Api.upsert(project);
            // todo - not sure were to put the .upsert. If the fetch is within the store, the upsert should be in that same place... ?
        } catch (error) {
            // throw error;
            console.log(`on submit error: ${error}`);
        }
    }
}
