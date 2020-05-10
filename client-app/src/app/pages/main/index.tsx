import React from 'react';

import { Project } from './types';
import { ProjectView } from './components/projectView';
import { ProjectEdit } from './components/projectEdit';
import { observer } from 'mobx-react';
import { AppStore } from '../../appStore';
import { SamplesView } from './components/samplesView';

interface MainPageProps {
    selectedProject: Project | null;
}

@observer
class MainPage extends React.Component<MainPageProps, {}> {
    async componentDidMount() {
        await AppStore.fetchSelectedProject();
        await AppStore.fetchSelectedProjectSamples();
    }

    render() {
        const project = this.props.selectedProject;

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

        const samples = AppStore.samples;

        const samplesView =
            samples === null ? <span>no samples present</span> : <SamplesView samples={samples} />;

        return (
            <div>
                {projectView}
                {samplesView}
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
