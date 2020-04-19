import React from 'react';
import react_logo from './assets/react_logo.svg';

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
