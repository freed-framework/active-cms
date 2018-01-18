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
import '../editor/app.scss';
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
        const wrapCls = classNames(`ec-editor-${this.state.pageType}`);
        const cls = classNames('ec-editor-viewer', {
            'ec-editor-scroller': this.state.pageType === 'mobile'
        })

        return (
            <div className={wrapCls}>
                <div className="ec-editor-canvas ec-editor-view">
                    <div className="ec-editor-canvas-inner">
                        <Render
                            data={this.state.data}
                            // 这里较为特殊，要设置为 edit 方式，图片组件才能不使用 lazyload
                            isEdit
                            isView
                            pageType={this.state.pageType}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Viewer);
