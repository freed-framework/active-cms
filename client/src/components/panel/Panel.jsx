/**
 * @file Panel.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import mitt from 'mitt';
import Bar from '../bar';
import GlobalButtons from '../globalButtons';
import { activeComponent } from '../../pages/editor/App';
import './panel.scss';

const emitter = mitt();

class Panel extends PureComponent {
    constructor(props) {
        super(props);

        emitter.on('active', this.mittActive);
        emitter.on('add', this.mittAdd);
        emitter.on('delete', this.mittDelete);

        this._data = {};

        this.state = {
            isVisible: false,
            activeId: null,
            data: {},
        }
    }

    /**
     * 激活某组件的编辑栏
     */
    static active = (guid) => {
        emitter.emit('active', guid);
    }

    /**
     * 添加组件
     * @param props
     *  props.guid
     *  props.menus
     *  props.module
     */
    static add = (props) => {
        emitter.emit('add', {...props});
    }

    static delete = (guid) => {
        emitter.emit('delete', guid);
    }

    /**
     * 判断是否存在于 _data
     * @param guid
     * @return {boolean}
     */
    isExit(guid) {
        const { data } = this.state;

        for (let i = 0; i < data.length; i ++) {
            const d = data[i];

            if (d.guid === guid) {
                return true;
            }
        }

        return false;
    }

    /**
     * 添加到 state 中
     * @param guid
     */
    mittActive = (guid) => {
        if (this._data[guid]) {
            this.setState({
                activeId: guid,
                isVisible: true,
            });
        }
    }

    /**
     * 保存到 _data 中
     */
    mittAdd = (props) => {
        if (this._data[props.guid] === undefined) {
            this._data[props.guid] = {
                ...props
            };

            this.setState({
                data: this._data,
            })
        }
    }

    /**
     * 删除
     */
    mittDelete = (guid) => {
        if (this._data[guid]) {
            delete this._data[guid];

            this.setState({
                activeId: null,
                data: this._data,
            })
        }
    }

    /**
     * 编辑面板的显示隐藏状态
     */
    handlePanelVisible = () => {
        this.setState({
            isVisible: !this.state.isVisible,
        });

        // 关闭编辑面板的时候，取消编辑的激活状态
        activeComponent(null);
    }

    render() {
        const { data, activeId, isVisible } = this.state;

        const clsLayout = classNames('as-panel-layout', {
            'as-panel-layout-visible': isVisible
        })

        return (
            <div className={clsLayout}>
                {/* 标题栏 */}
                <div className="as-panel-title">
                    <span
                        className="as-panel-title-button"
                        onClick={this.handlePanelVisible}
                    >
                        <Icon type={`verticle-${isVisible ? 'left' : 'right'}`} />
                    </span>
                    <span className="as-panel-title-text">编辑面板</span>
                </div>

                <div className="as-panel-main">
                    {/* 通用按钮 */}
                    <GlobalButtons />

                    {/* 每一个组件的编辑器 */}
                    {Object.keys(data).map(k => {
                        const item = data[k];

                        const clsPanelItem = classNames('as-panel-item', {
                            'as-panel-item-hide': activeId !== item.guid,
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
                                        menus: item.module.menus,
                                    })}
                                </div>

                                {/* 属性编辑栏 */}
                                <div>
                                    {Bar.edit({
                                        guid: item.guid,
                                        editable: item.module.editable,
                                        attrs: item.attrs,
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
