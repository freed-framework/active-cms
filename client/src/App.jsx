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
    Switch,
} from 'react-router-dom';
import Bundle from 'freed-spa/lib/bundle';
import Editor from 'bundle-loader?lazy!./pages/editor';
import Viewer from 'bundle-loader?lazy!./pages/viewer';
import List from 'bundle-loader?lazy!./pages/lists/App';
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
                <Route
                    path="/"
                    exact
                    render={() => <Bundle load={List}>{(App) => <App />}</Bundle>}
                />
                {/* type: pc=web端，mobile=移动端 */}
                <Route
                    path="/:type/edit/:id"
                    render={() => <Bundle load={Editor}>{(App) => <App />}</Bundle>}
                />
                <Route
                    path="/:type/new"
                    render={() => <Bundle load={Editor}>{(App) => <App />}</Bundle>}
                />
                <Route
                    path="/view/:id"
                    render={() => <Bundle load={Viewer}>{(App) => <App />}</Bundle>}
                />
                <Route
                    path="/lists"
                    exact
                    render={() => <Bundle load={List}>{(App) => <App />}</Bundle>}
                />
                <Route
                    path="/lists:type"
                    render={() => <Bundle load={List}>{(App) => <App />}</Bundle>}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/registerResult" component={RegisterResult} />
            </div>
        </BrowserRouter>
    )
}

export default App;
