/**
 * @file RenderItem.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import LazyerHoc from '../lazyer/LazyerHoc';
import AppComponent from '../AppComponent';
import { scrollDom } from '../util/util';

import './render.scss';

class PlaceHolder extends PureComponent {
    render() {
        return (
            <div className="editor-placeholder">
                {this.props.name}
            </div>
        )
    }
}

@LazyerHoc
class RenderItem extends PureComponent {
    componentDidUpdate() {
        const id = this.props.item.guid;
        const el = document.getElementById(id);

        if (id === this.props.autoActiveId && el) {
            // <TODO> 布吉岛为啥直接调用，rect 位置不对
            setTimeout(() => {
                // 获取激活焦点
                el.click();

                // 滚动容器
                scrollDom(this.props.outerEl, el, this.props.pageType === 'mobile' ? 2 : 1)
            })
        }
    }

    render() {
        const { item, module } = this.props;

        if (!item.children || item.children.length === 0) {
            return (
                <AppComponent {...this.props}>
                    {() => <PlaceHolder name={module.config.displayName} />}
                </AppComponent>
            )
        }

        return (
            <AppComponent {...this.props}>
                {this.props.children}
            </AppComponent>

        )
    }
}

export default RenderItem;
