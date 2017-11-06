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
                    content: [{"guid":"ec-module-ceb68fe0-90e8-409a-bbd3-a8660c487b0c","name":"layer","attrs":{"style":{"layout":{"backgroundColor":"#eee","height":"200"}}},"children":[{"guid":"ec-module-06895ff8-1f0a-402f-970b-46a543e7efb5","name":"tabs","dataTrans":{"data":[{"key":"0","title":"Title1","content":"Content1"},{"key":"1","title":"Title2","content":"Content2"}]}}]}],
                };

                // const { data } = res;
                // document.title = data.title;

                this.setState({
                    data: data.content,
                })
            // })
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
