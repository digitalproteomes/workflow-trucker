import React from 'react';

import { Project } from '../../types';
import { ProjectView } from '../../functional-building-blocks/projects';
import { Constants } from '../../default-data/constants';
import { Row, Col } from 'antd';

export class ProjectPage extends React.Component<{}, {}> {
    render() {
        const project: Project = Constants.activeProject;

        return (
            <Row>
                {/* total of 24 columns available */}
                <Col span={8}>
                    <ProjectView project={project} />
                </Col>
                <Col span={16}>{/* Button from .hlc */}</Col>
            </Row>
        );
    }
}
