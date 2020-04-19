import React from 'react';

import Api from './api';
import { Project, Counter } from './types';
import { ProjectView } from './components/projectView';
import { ProjectEdit } from './components/projectEdit';
import { observer } from 'mobx-react';

interface MainPageProps {
    project: Project;
    counter: Counter;
}

@observer
class MainPage extends React.Component<MainPageProps, any> {
    async componentDidMount() {
        this.setState({ projects: await Api.list() });
    }

    render() {
        const { project, counter } = this.props;

        return (
            <div>
                {counter.countMessage}
                <ProjectView project={project} />
                <ProjectEdit
                    project={project}
                    onSave={() => {
                        this.onSubmit(project, counter);
                    }}
                />
            </div>
        );
    }

    async onSubmit(project: Project, counter: Counter) {
        counter.count++;
        await Api.upsert(project);
    }
}

export default MainPage;
