import React, { FunctionComponent, useState } from 'react';

import { Project } from '../../types';
import { ProjectView, ButtonEditProject } from '../../functional-building-blocks/projects';
import { Constants } from '../../default-data/constants';
import { Row, Col, Button, Divider, Card, Steps } from 'antd';
import { LockOutlined, DownloadOutlined } from '@ant-design/icons';

export const ProjectPage: FunctionComponent = () => {
    const [project, setProject] = useState<Project>(Constants.activeProject);
    const { Step } = Steps;
    return (
        <>
            <Row>
                {/* total of 24 columns available */}
                <Col span={10}>
                    <ProjectView project={project} />
                    <Divider></Divider>
                    <ButtonEditProject
                        project={project}
                        onUpdateProjectSuccess={(updated: Project) => {
                            Constants.setActiveProject(updated);
                            setProject(updated);
                        }}
                    />
                    <Divider></Divider>
                    <Button type="default" icon={<LockOutlined />}>
                        Lock Project
                    </Button>
                    <Divider type="vertical" />
                    <label>Important! No changes will be allowed after performing this action.</label>
                </Col>
                <Divider type="vertical" />
                <Col span={8}>
                    <h3>Export project</h3>

                    <Row>
                        <Divider type="vertical" />
                        <label>
                            <p></p>
                            <p> Exports the following artefacts:</p>
                            <Card style={{ width: 300 }}>
                                <p> - Samples and workflow metadata</p>
                                <p> - Project related SOPs</p>
                                <p> - Protein database .fasta file</p>
                                <p> - Generated Spectral Library</p>
                                <p> - Resulting protein matrix</p>
                            </Card>
                            <p></p>
                        </label>

                        <label>
                            <p></p>
                            <p>
                                {' '}
                                In order to be able to download the archive, the following artefacts need to be uploaded
                                into the system
                            </p>
                            <Steps direction="vertical" size="small" current={0}>
                                <Step
                                    status="finish"
                                    title="Done"
                                    description="Upload protein database (.fasta)"
                                ></Step>
                                <Step status="error" title="Waiting" description="Upload Spectral Library (.tsv)" />
                                <Step status="error" title="Waiting" description="Upload Protein Matrix (.tsv)" />
                            </Steps>
                            <p></p>
                        </label>
                        <p>
                            Links to the upload sections of:
                            <a href="blank"> protein database</a>, <a href="blank"> spectral library </a> and
                            <a href="blank"> protein matrix</a>
                        </p>
                    </Row>
                    <Row>
                        <Button type="primary" icon={<DownloadOutlined />}>
                            Download project archive
                        </Button>
                    </Row>
                </Col>
            </Row>
        </>
    );
};
