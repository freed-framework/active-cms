/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { Component } from 'react';
import { getPage } from '../../services';
import Render from '../../common/Render';

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
        return (
            <Render
                data={this.state.data}
                pageType={this.props.pageType}
            />
        )
    }
}

export default Viewer;
