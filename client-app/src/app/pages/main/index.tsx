import React from 'react';

import { Project } from '../../types';
import { ProjectView } from './components/projectView';
import { ProjectEdit } from './components/projectEdit';
import { observer } from 'mobx-react';
import { AppStore } from '../../appStore';

@observer
export class ProjectPage extends React.Component<{}, {}> {
    // TODO: remove AppStore reference and refactor Project page to be in line with the other more stable sample pages. Rename from main page.
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
        } catch (error) {
            // throw error;
            console.log(`on submit error: ${error}`);
        }
    }
}
