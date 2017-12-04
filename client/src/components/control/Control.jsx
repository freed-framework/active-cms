/**
 * @file Control.jsx
 * @author denglingbo
 *
 * 提示可编辑的组件的控制框
 */

import React, { PureComponent } from 'react';
import { is } from 'immutable';
import classNames from 'classnames';
import { Icon } from 'antd';
import { deleteComponent, copyComponent, } from '../../pages/editor/App';
import './control.scss';

class Control extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // 可操作的组件的基本信息
            rect: props.rect || null,

            // isActive: props.isActive || false,

            // 鼠标悬停的可操作组件的 ID
            // 注：此处暂未使用，该 control 使用的 事件穿透
            // tipsId: props.tipsId,
        }
    }

    componentDidMount() {
        this.top.addEventListener('mouseover', this.lineHover);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.state.rect, nextProps.rect)) {
            this.setState({
                rect: nextProps.rect,
            })
        }
    }

    lineHover = () => {}

    /**
     * 绘制各个边线
     * @param arr
     */
    renderLine(arr) {
        return arr.map(k => {
            const cls = classNames(`ec-edit-control-line ec-edit-control-${k}`);

            return (
                <div
                    key={k}
                    ref={ref => { this[k] = ref }}
                    className={cls}
                    onMouseOver={this.lineHover}
                />
            )
        })
    }

    render(guid) {
        const { rect } = this.state;

        const styles = {
            visibility: rect ? 'visible' : 'hidden',
            ...(rect && { ...rect })
        };

        return (
            <div
                className={'ec-edit-control'}
                style={{
                    ...styles
                }}
            >
                <div className="edit-tools">
                    <span onClick={() => deleteComponent(guid)}>
                        <Icon type="delete" />
                    </span>
                    <span onClick={() => copyComponent(guid)}>
                        <Icon type="copy" />
                    </span>
                </div>
                {this.renderLine(['top', 'right', 'bottom', 'left'])}
            </div>
        );
    }
}

export default Control;
