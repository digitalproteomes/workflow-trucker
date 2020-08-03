import React from 'react';
import './App.css';
import { ProjectPage } from './pages/main';
import { AboutPage } from './pages/about';
import BasicLayout from './layouts';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ClinicalSamples } from './pages/clinical-samples';
import { IndividualSamples } from './pages/individual-samples';
import { PooledSamples } from './pages/pooled-samples';
import { FractionatedSamples, FractionatedSampleDetails } from './pages/fractionated-samples';
import { MsRuns } from './pages/ms-runs';
import { IntermediateSamples } from './pages/intermediate-samples';
import { MSReadySamples } from './pages/ms-ready-samples';
import { SwathAnalysisPage } from './pages/swath-analysis';
import { SpectralLibrariesPage } from './pages/spectral-libraries';

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
                        <Route path="/samples/individual">
                            <IndividualSamples />
                        </Route>
                        <Route path="/samples/fractionated/details">
                            <FractionatedSampleDetails />
                        </Route>
                        <Route path="/samples/fractionated">
                            <FractionatedSamples />
                        </Route>
                        <Route path="/samples/pooled">
                            <PooledSamples />
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
                        <Route path="/">
                            <AboutPage />
                        </Route>
                    </Switch>
                </BasicLayout>
            </BrowserRouter>
        </div>
    );
}
