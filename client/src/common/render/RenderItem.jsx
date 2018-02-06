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
import PlaceHolder from '../../components/placeholder';

/**
 * 如果存在 background 也不展示 placeholder
 * @param {*} objs
 */
const hasBackground = (objs = {}) => {
    let got = false;

    Object.keys(objs).forEach(k => {
        const val = objs[k];

        if (typeof val === 'object') {
            got = hasBackground(val);
        }

        if (typeof val === 'string'
            && (k === 'backgroundColor' || k === 'backgroundImage')
            && val !== ''
        ) {
            got = true;
        }
    });

    return got;
}

@LazyerHoc
class RenderItem extends PureComponent {
    componentDidUpdate() {
        const id = this.props.item.guid;
        const el = document.getElementById(id);

        // if (id === this.props.autoActiveId && el) {
        //     // <TODO> 布吉岛为啥直接调用，rect 位置不对
        //     setTimeout(() => {
        //         // 获取激活焦点
        //         el.click();
        //
        //         // 滚动容器
        //         scrollDom(this.props.outerEl, el, this.props.pageType === 'mobile' ? 2 : 1);
        //     })
        // }
    }

    render() {
        const { item, module, isEdit, isView } = this.props;
        const { componentProps = {} } = item;
        
        if (// 编辑模式下才使用 placeholder
            isEdit 
            && (!item.children || item.children.length === 0)
            // 存在 background 也不展示 placeholder
            && !hasBackground(componentProps.style)
            // 预览模式不展示 placeholder
            && !isView
        ) {
            return (
                <AppComponent {...this.props}>
                    {() => (
                        <PlaceHolder
                            iconType={module.config.iconType}
                            name={module.config.displayName}
                        />
                    )}
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
