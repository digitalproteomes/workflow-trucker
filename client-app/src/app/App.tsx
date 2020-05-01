import React from 'react';
import './App.css';
import MainPage from './pages/main';
import BasicLayout from './layouts';
import { AppStore } from './appStore';
import { observer } from 'mobx-react';

@observer
class App extends React.Component<any, any> {
    render() {
        const { project } = AppStore;
        return (
            <div className="App">
                <BasicLayout>
                    <MainPage selectedProject={project}></MainPage>
                </BasicLayout>
            </div>
        );
    }
}

export default App;
