import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App';
import * as serviceWorker from './serviceWorker';
import { Constants } from './app/default-data/constants';

async function initialize() {
    await Constants.InitAsync();
}

initialize().then(() => {
    ReactDOM.render(
        // debt - strict mode removed because of the diagrams library https://github.com/projectstorm/react-diagrams/issues/598#issuecomment-635924991
        // <React.StrictMode>
        <App />,
        // </React.StrictMode>,
        document.getElementById('root'),
    );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
