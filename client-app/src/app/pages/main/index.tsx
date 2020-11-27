import React from 'react';

import { Project } from '../../types/types';
import { ProjectView } from './components/projectView';
import { ProjectEdit } from './components/projectEdit';

export class ProjectPage extends React.Component<{}, {}> {
    render() {
        const project = Project.default;

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
