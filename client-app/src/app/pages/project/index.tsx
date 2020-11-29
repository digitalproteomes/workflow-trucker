import React from 'react';

import { Project } from '../../types';
import { ProjectView } from '../../functional-building-blocks/projects';

export class ProjectPage extends React.Component<{}, {}> {
    render() {
        const project = Project.default;

        return <ProjectView project={project} />;
    }
}
