/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';

import { getPage } from '../../server';
import Lazyer from '../../../common/Lazyer';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
            // data: props.pageData,
            // data: [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout":{"width":100}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"layout":{"height":60}},"children":[{"guid":"161cc93a-43af-435f-a011-9c676f87ff7b","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}},"style":{"title":{"height":"50"}}}]}],
        };
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;
        
        if (id) {
            getPage(id).then((res) => {
                const { data } = res;
                this.setState({
                    data: data.content
                })
            })
        }
    }

    loop(data) {
        return data.map(item => (
            <div
                key={item.guid}
            >
                <Lazyer item={item}>
                    {mod => (
                        <mod.App style={item.style}>
                            {item.children && this.loop(item.children)}
                        </mod.App>
                    )}
                </Lazyer>
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
