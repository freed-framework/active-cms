/**
 * @file render.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import Components from './Components';

const App = (props) => <Components data={props.data} />;

App.defaultProps = {
    data: [],
}

export default App;
