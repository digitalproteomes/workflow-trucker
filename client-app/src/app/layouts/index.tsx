import React from 'react';
import react_logo from './assets/WF_logo.png';

const BasicLayout: React.FC = (props) => {
    return (
        <div>
            <img src={react_logo} className="App-logo" alt="logo" />
            <h1>Yay! Welcome to Workflow Tracker!</h1>
            {props.children}
        </div>
    );
};

export default BasicLayout;
