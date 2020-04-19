import React from 'react';
import './App.css';
import MainPage from './pages/main';
import BasicLayout from './layouts';
import { AppStore } from './appStore';

function App() {
    const { project, counter } = AppStore;
    return (
        <div className="App">
            <BasicLayout>
                <MainPage project={project} counter={counter}></MainPage>
            </BasicLayout>
        </div>
    );
}

export default App;
