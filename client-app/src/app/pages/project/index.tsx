import React, { FunctionComponent, useState } from 'react';

import { Project } from '../../types';
import { ProjectView } from '../../functional-building-blocks/projects';
import { Constants } from '../../default-data/constants';
import { Row, Col, Button, Divider, Card } from 'antd';
import { LockOutlined, DownloadOutlined } from '@ant-design/icons';

import { ButtonEditProject } from '../../functional-building-blocks/projects/hlc/buttonEdit';

export const ProjectPage: FunctionComponent = () => {
    const [project, setProject] = useState<Project>(Constants.activeProject);

    return (
        <>
            <Row>
                {/* total of 24 columns available */}
                <Col span={8}>
                    <ProjectView project={project} />
                </Col>
                <Col span={16}>
                    <h3>Actions</h3>
                    <Row>
                        <ButtonEditProject
                            project={project}
                            onUpdateProjectSuccess={(updated: Project) => {
                                Constants.setActiveProject(updated);
                                setProject(updated);
                            }}
                        />
                        <Button type="default" icon={<LockOutlined />}>
                            Lock Project
                        </Button>
                    </Row>
                    <Row>
                        <label>
                            <br></br>No changes will be allowed after performing this action.
                        </label>
                    </Row>
                    <Divider />
                    <Row>
                        <Button type="primary" icon={<DownloadOutlined />}>
                            Download archive for Leomed
                        </Button>
                    </Row>
                    <Row>
                        <label>
                            <p></p>
                            <p> Exports the following artefacts:</p>
                            <Card style={{ width: 300 }}>
                                <p> - Samples and workflow metadata</p>
                                <p> - Protein database .fasta file</p>
                                <p> - Generated Spectral Library</p>
                                <p> - Resulting protein matrix</p>
                            </Card>
                        </label>
                    </Row>
                </Col>
            </Row>
        </>
    );
};
