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
        if (!is(this.props.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            });
        }

        if (!is(this.props.visible, nextProps.visible)) {
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
                        className="ec-panel-title-text"
                    >
                        编辑面板
                    </span>
                </div>

                <div className="ec-panel-main">
                    {/* 可编辑列表 */}
                    <List
                        activeId={activeId}
                    />
                </div>
            </div>
        );
    }
}

export default Panel;
