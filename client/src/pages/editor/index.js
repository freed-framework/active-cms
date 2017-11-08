/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getPage } from '../../services';
import App from './App';

class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;

        if (params.id) {
            // getPage(params.id).then((res) => {
                const data = {
                    content: [{"guid":"ec-module-ceb68fe0-90e8-409a-bbd3-a8660c487b0c","name":"mobile/layer"}],
                };

                // const { data } = res;
                // document.title = data.title;

                this.setState({
                    data: data.content,
                })
            // })
        } else {
            this.setState({
                data: [{
                    "guid": "ec-module-xxxxx",
                    "name": "mobile/layer",
                }],
            })
        }
    }

    render() {
        const { data } = this.state;

        return (
            <App
                data={data}
            />
        )
    }
}

export default Editor;
