/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { ReactDOMServer } from 'react-dom';
import LazyerServer from '../common/Lazyer.server';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.pageData
        };
    }

    loop(data) {
        return data.map(item => (
            <div
                key={item.guid}
            >
                <LazyerServer item={item}>
                    {mod => (
                        <mod.App style={item.style}>
                            {item.children && this.loop(item.children)}
                        </mod.App>
                    )}
                </LazyerServer>
            </div>
        ));
    }

    render() {
        const { data } = this.state;
        if (!data) {
            return null;
        }

        return (
            <div>
                {this.loop(data)}
            </div>
        );
    }
}

export default App;
