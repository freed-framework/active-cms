/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import {
    BrowserRouter,
    Route,
} from 'react-router-dom';
import Editor from './pages/editor/App';
import Viewer from './pages/viewer/App';
import Store from './pages/store/App';

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
};

const supportsHistory = 'pushState' in window.history;

const App = () => (
    <BrowserRouter
        forceRefresh={!supportsHistory}
        getUserConfirmation={getConfirmation}
        keyLength={12}
    >
        <div>
            <Route exact path="/" component={Editor} />
            <Route exact path="/:id" component={Editor} />
            <Route exact path="/view" component={Viewer} />
            <Route exact path="/store" component={Store} />
        </div>
    </BrowserRouter>
)

export default App;
