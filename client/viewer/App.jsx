/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import module from '../common/module';
import { Viewer } from '../common/render';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // data: []
            // data: [
            //     {
            //         "guid": "ddddds11-1ead-43ae-b6de-e6debb958b08",
            //         "name": "floor",
            //     },
            //     {
            //         "guid": "237d6d2c-1034-4f76-a5c8-6678b9a3cb78",
            //         "name": "floor",
            //     },
            //     {
            //         "guid": "f1327a51-1ead-43ae-b6de-e6debb958b08",
            //         "name": "floor",
            //     }
            // ],
            data: [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"height":100}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"height":60}}],
        };
    }

    render() {
        return (
            <Viewer data={this.state.data} />
        );
    }
}

export default App;
