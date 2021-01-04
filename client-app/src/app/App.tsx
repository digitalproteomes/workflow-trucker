import React from 'react';
import './App.css';
import { ProjectPage } from './pages/project';
import { AboutPage } from './pages/about';
import { BasicLayout } from './layouts';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ClinicalSamples } from './pages/clinical-samples';
import { MsRuns } from './pages/ms-runs';
import { IntermediateSamples } from './pages/intermediate-samples';
import { MSReadySamples } from './pages/ms-ready-samples';
import { SwathAnalysisPage } from './pages/swath-analysis';
import { SpectralLibrariesPage } from './pages/spectral-libraries';
import { SOPPage } from './pages/sops';

export function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <BasicLayout>
                    <Switch>
                        <Route path="/about">
                            <AboutPage />
                        </Route>
                        <Route path="/projects">
                            <ProjectPage />
                        </Route>
                        <Route path="/samples/clinical">
                            <ClinicalSamples />
                        </Route>
                        <Route path="/samples/intermediate">
                            <IntermediateSamples />
                        </Route>
                        <Route path="/samples/msready">
                            <MSReadySamples />
                        </Route>
                        <Route path="/msruns">
                            <MsRuns />
                        </Route>
                        <Route path="/swathanalyses">
                            <SwathAnalysisPage />
                        </Route>
                        <Route path="/spectrallibraries">
                            <SpectralLibrariesPage />
                        </Route>
                        <Route path="/sops">
                            <SOPPage />
                        </Route>
                        <Route path="/">
                            <AboutPage />
                        </Route>
                    </Switch>
                </BasicLayout>
            </BrowserRouter>
        </div>
    );
}
