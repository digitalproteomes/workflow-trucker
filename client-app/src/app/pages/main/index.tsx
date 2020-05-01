import React from 'react';

import { Project } from './types';
import { ProjectView } from './components/projectView';
import { ProjectEdit } from './components/projectEdit';
import { observer } from 'mobx-react';
import { AppStore } from '../../appStore';

interface MainPageProps {
    selectedProject: Project | null;
}

@observer
class MainPage extends React.Component<MainPageProps, {}> {
    async componentDidMount() {
        await AppStore.fetchSelectedProject();
    }

    render() {
        const { selectedProject: project } = this.props;

        if (project === null) {
            return (
                <div>
                    <span>no project selected</span>
                </div>
            );
        }

        return (
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

export default MainPage;
