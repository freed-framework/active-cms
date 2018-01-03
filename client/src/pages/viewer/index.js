/**
 * @file index.js
 * @author denglingbo
 *
 */
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { getPage } from '../../services';
import Render from '../../common/render/Render';
import { calc, resizeEvt } from '../../common/mobileMock';
import '../../css/reset-mobile.css';
import '../editor/edit-module-hack.scss';
import './index.scss';

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
        const cls = classNames('ec-editor-viewer', {
            'ec-editor-scroller': this.state.pageType === 'mobile'
        })

        return (
            <div className={cls}>
                <Render
                    data={this.state.data}
                    pageType={this.state.pageType}
                />
            </div>
        )
    }
}

export default withRouter(Viewer);
