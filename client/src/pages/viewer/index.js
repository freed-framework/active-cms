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
            data: props.data || [],
        }
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;

        // 如果存在id说明是编辑
        if (id) {
            getPage(id).then((res) => {
                const { data } = res;

                document.title = data.title;

                this.setState({
                    data: data.content,
                })
            })
        }
    }

    render() {
        return (
            <App
                data={this.state.data}
            />
        )
    }
}

export default Viewer;
