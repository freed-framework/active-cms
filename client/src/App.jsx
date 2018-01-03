/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Bundle from 'freed-spa/lib/bundle';
import Editor from 'bundle-loader?lazy!./pages/editor';
import Viewer from 'bundle-loader?lazy!./pages/viewer';
import List from 'bundle-loader?lazy!./pages/lists/App';
import Login from './user/Login';
import Register from './user/Register';
import RegisterResult from './user/RegisterResult';
import { getUser } from './actions/user';

const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
};

const supportsHistory = 'pushState' in window.history;

@connect(
    state => ({
        user: state.toJS().user.data,
    }),
    dispatch => bindActionCreators({
        getUser
    }, dispatch)
)
class App extends Component {
    componentDidMount() {
        this.props.getUser()
    }
    render() {
        return (
            <BrowserRouter
                forceRefresh={!supportsHistory}
                getUserConfirmation={getConfirmation}
                keyLength={12}
            >
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <Bundle load={List}>{(App) => <App />}</Bundle>}
                    />
                    {/* type: pc=web端，mobile=移动端 */}
                    <Route
                        path="/:type/edit/:id"
                        exact
                        render={() => <Bundle load={Editor}>{(App) => <App />}</Bundle>}
                    />
                    <Route
                        path="/:type/new"
                        exact
                        render={() => <Bundle load={Editor}>{(App) => <App />}</Bundle>}
                    />
                    {/* for test */}
                    <Route
                        path="/:type/mock"
                        exact
                        render={() => <Bundle load={Editor}>{(App) => <App isMock />}</Bundle>}
                    />
                    <Route
                        path="/view/:id"
                        exact
                        render={() => <Bundle load={Viewer}>{(App) => <App />}</Bundle>}
                    />
                    <Route
                        path="/lists"
                        exact
                        render={() => <Bundle load={List}>{(App) => <App />}</Bundle>}
                    />
                    <Route
                        path="/lists/:type"
                        render={() => <Bundle load={List}>{(App) => <App />}</Bundle>}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/registerResult" component={RegisterResult} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
