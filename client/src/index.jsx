/**
 * @file index.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FrameApp from 'freed-spa/lib/App';
import reducers from './reducers';

ReactDOM.render(
    <FrameApp
        asyncReducers={reducers}
    >
        <App />
    </FrameApp>,
    document.getElementById('root')
);
