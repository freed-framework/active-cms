/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { getPage } from '../../services';
import Render from '../../common/render/Render';
import { calc, resizeEvt } from '../../common/mobileMock';
import '../../css/reset-mobile.css';

class Viewer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data || [],
            pageType: null,
        }

        this.link = null;
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;

        if (params.id) {
            getPage(params.id).then((res) => {
                const { data } = res;

                document.title = data.title;

                if (data.pageType === 'mobile') {
                    calc();
                    window.addEventListener(resizeEvt, calc, false);
                }

                this.setState({
                    data: data.content,
                    pageType: data.pageType,
                })
            })
        }
    }


    componentWillUnmount() {
        if (this.state.pageType === 'mobile') {
            window.removeEventListener(resizeEvt, calc, false);
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

export default withRouter(Viewer);
