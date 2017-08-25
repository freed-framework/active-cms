/**
 * @file Panel.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import mitt from 'mitt';
import utils from '../../util/util';
import Buttons from '../container/Buttons';
import TopController from '../TopController';
import './panel.scss';

const emitter = mitt();

class Panel extends PureComponent {
    constructor(props) {
        super(props)

        emitter.on('active', this.mittActive);
        emitter.on('add', this.mittAdd);
        emitter.on('delete', this.mittDelete);

        this._data = {};

        this.state = {
            data: [],
        }
    }

    /**
     * 激活某组件的编辑栏
     */
    static active = (guid) => {
        emitter.emit('active', guid);
    }

    static add = ({ guid, menus }) => {
        emitter.emit('add', {
            guid,
            menus
        });
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
            const props = {
                activeId: guid,
                ...(!this.isExit(guid) && {
                    data: this.state.data.concat([this._data[guid]])
                })
            }

            this.setState(props);
        }
    }

    /**
     * 保存到 _data 中
     */
    mittAdd = ({ guid, menus }) => {
        if (this._data[guid] === undefined) {
            this._data[guid] = {
                guid,
                menus,
            };
        }
    }

    mittDelete = (guid) => {
        if (this._data[guid]) {
            delete this._data[guid];

            this.setState({
                activeId: null,
                data: utils.deleteByGuid(this.state.data, guid),
            })
        }
    }

    render() {
        const { data, activeId } = this.state;

        return (
            <div className="as-panel">

                <TopController />

                {data.map(item => {
                    const clsPanelItem = classNames('as-panel-item', {
                        'as-panel-item-hide': activeId !== item.guid,
                    });

                    return (
                        <div
                            key={item.guid}
                            className={clsPanelItem}
                        >
                            <div>
                                {Buttons.delete(item.guid)}
                            </div>
                            {Buttons.getList({
                                guid: item.guid,
                                menus: item.menus,
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Panel;
