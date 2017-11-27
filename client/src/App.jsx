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
import Editor from './pages/editor';
import Viewer from './pages/viewer';
import List from './pages/lists/App';
import Login from './user/Login';
import Register from './user/Register';
import RegisterResult from './user/RegisterResult';

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
};

const supportsHistory = 'pushState' in window.history;

const App = () => {

    return (
        <BrowserRouter
            forceRefresh={!supportsHistory}
            getUserConfirmation={getConfirmation}
            keyLength={12}
        >
            <div>
                <Route exact path="/" component={List} />
                {/* type: pc=web端，mobile=移动端 */}
                <Route exact path="/:type/edit/:id" component={Editor} />
                <Route exact path="/:type/new" component={Editor} />
                <Route exact path="/view/:id" component={Viewer} />
                <Route exact path="/lists" component={List} />
                <Route exact path="/lists/:type" component={List} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/registerResult" component={RegisterResult} />
            </div>
        </BrowserRouter>
    )
}

export default App;
