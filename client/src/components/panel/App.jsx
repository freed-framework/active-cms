/**
 * @file Panel.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { is } from 'immutable';
import { Icon } from 'antd';
import mitt from 'mitt';
import { FollowHoc } from '../follow';
import List from './List';
import './panel.scss';

const emitter = mitt();

// @FollowHoc
class Panel extends PureComponent {
    constructor(props) {
        super(props);

        emitter.on('delete', this.mittDelete);

        this.state = {
            activeId: props.activeId,
            data: props.data,
            visible: props.visible,
        }
    }

    static delete = guid => {
        emitter.emit('delete', guid);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.props.data, nextProps.data)) {
            this.setState({
                data: nextProps.data,
            })
        }

        if (!is(this.state.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            });
        }

        if (!is(this.state.visible, nextProps.visible)) {
            this.setState({
                visible: nextProps.visible,
            });
        }
    }

    handleClose = () => {
        this.props.onClose();
    }

    /**
     * props.top 由 FollowHoc 控制
     */
    render() {
        const { data, activeId, visible } = this.state;

        const clsLayout = classNames('ec-panel-layout', {
            'ec-panel-layout-visible': visible,
        });

        return (
            <div
                className={clsLayout}
                style={{
                    top: this.props.top,
                }}
            >
                {/* 标题栏 */}
                <div className="ec-panel-title">
                    <div
                        className="ec-panel-close"
                        onClick={this.handleClose}
                    >
                        <Icon type="close" />
                    </div>
                    <span
                        className="ec-panel-title-text anchor-for-guide"
                        data-guide={'{"index": 1,"tip": "select"}'}
                    >编辑面板</span>
                </div>

                <div className="ec-panel-main">
                    <List
                        data={data}
                        activeId={activeId}
                    />
                </div>
            </div>
        );
    }
}

export default Panel;
