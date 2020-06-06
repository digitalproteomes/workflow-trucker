import React from 'react';
import './App.css';
import { ProjectPage, SamplesPage } from './pages/main';
import { About } from './pages/about';
import BasicLayout from './layouts';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ClinicalSamples } from './pages/clinical-samples';
import { IndividualSamples } from './pages/individual-samples';

export function App() {
    return (
        <div className="App">
            {/* <BasicLayout>
                    <MainPage selectedProject={project}></MainPage>
                </BasicLayout> */}
            {/* https://reacttraining.com/react-router/web/api/BrowserRouter */}
            <BrowserRouter>
                <BasicLayout>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/projects">
                            <ProjectPage />
                        </Route>
                        <Route path="/samples/clinical">
                            <ClinicalSamples />
                        </Route>
                        <Route path="/samples/individual">
                            <IndividualSamples />
                        </Route>
                        <Route path="/samples">
                            <SamplesPage />
                        </Route>
                        <Route path="/">
                            <span>This is the landing page</span>
                        </Route>
                    </Switch>
                </BasicLayout>
            </BrowserRouter>
        </div>
    );
}
