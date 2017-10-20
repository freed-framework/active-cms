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
import Bar from '../bar';
import './panel.scss';

const emitter = mitt();

@FollowHoc
class Panel extends PureComponent {
    constructor(props) {
        super(props);

        emitter.on('delete', this.mittDelete);

        this.state = {
            activeId: props.activeId,
            data: {},
            visible: props.visible,
        }
    }

    static delete = (guid) => {
        emitter.emit('delete', guid);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.state.data, nextProps.data)) {
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
                    <span className="ec-panel-title-text">编辑面板</span>
                </div>

                <div className="ec-panel-main">
                    {/* 每一个组件的编辑器 */}
                    {Object.keys(data).map(k => {
                        const item = data[k];
                        const clsPanelItem = classNames('ec-panel-item', {
                            'ec-panel-item-hide': activeId !== item.guid,
                        });

                        return (
                            <div
                                key={item.guid}
                                className={clsPanelItem}
                            >

                                {/* 目标栏 */}
                                <div>
                                    {Bar.delete(item.guid)}
                                </div>

                                {/* 可添加子组件栏 */}
                                <div>
                                    <div>可添加子组件:</div>
                                    {Bar.menus({
                                        guid: item.guid,
                                        menus: item.module ? item.module.menus : [],
                                    })}
                                </div>

                                {/* 属性编辑栏 */}
                                <div>
                                    {Bar.edit({
                                        guid: item.guid,
                                        editable: item.module ? item.module.editable : {},
                                        attribute: item.attrs
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Panel;
