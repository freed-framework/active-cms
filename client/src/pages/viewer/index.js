/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { Component } from 'react';
import { getPage } from '../../services';
import Render from '../../common/render/Render';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],
            pageType: null,
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
                    pageType: data.pageType,
                })
            })
        }
    }

    render() {
        return (
            <Render
                data={this.state.data}
                pageType={this.state.pageType}
            />
        )
    }
}

export default Viewer;
