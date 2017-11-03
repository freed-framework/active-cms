/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { Component } from 'react';
import { getPage } from '../../services';
import App from './App';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;

        if (params.id) {
            getPage(params.id).then((res) => {
                const { data } = res;

                document.title = data.title;

                this.setState({
                    data: data.content,
                })
            })
        }
    }

    render() {
        const { data } = this.state;

        if (!data) {
            return null;
        }

        return (
            <App
                data={data}
            />
        )
    }
}

export default Viewer;
