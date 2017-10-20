/**
 * @file App.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { Component } from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { message, Modal, Input } from 'antd';
import utils from '../../../components/util/util';
import module from '../../../common/module';
import { addPage, getPage, editPage } from '../../services';
import { Editor, Panel, TopMenu, Control, LayerCake, Follow, PubComps, HanleMenu } from '../../components';
import Module from '../../../common/module';
import mitt from 'mitt';
import '../editor/app.scss';

const confirm = Modal.confirm;

class App extends Component {
    static propTypes = {
        history: PropTypes.objectOf(PropTypes.any),
    }

    constructor(props) {
        super(props);

        this.state = {
            /**
             * 后端返回的原始数据
             * 该数据包含层级关系，components.App module config 等数据 不包含在此
             */
            data: [],

            /**
             * 平铺的带 App 的数据
             */
            tileData: {},
        };
    }

    componentDidMount() {
        const { match = {} } = this.props;
        const { params = {} } = match;
        const { id } = params;

        // 如果存在id说明是编辑
        if (id) {
            getPage(id).then((res) => {
                const { data } = res;

                document.title = data.title;

                this.setDataAndTile(data.content);
            })
        }
    }

    componentWillUnmount() {}

    /**
     * 将数据平铺
     * @param data
     * @param arr
     * @return {Array}
     */
    data2Tile(data, arr = []) {
        const looper = (data) => {
            data.forEach(item => {
                arr = arr.concat(Module.get(item));

                if (item.children) {
                    looper(item.children, arr);
                }
            });
        }

        looper(data);

        return arr;
    }

    /**
     * 设置 state.data & state.tileData
     * @param dataArr
     * @param callback
     */
    setDataAndTile(dataArr = [], callback = () => {}) {
        // 平铺的绑定了 App 的数据
        const tileData = {};
        const tile = this.data2Tile(dataArr);

        Promise.all(tile).then(values => {
            values.forEach(v => {
                tileData[v.guid] = v;
            });

            this.setState({
                data: dataArr,
                tileData,
            }, () => callback);
        });
    }

    render() {
        const { rect, tileData, data } = this.state;
        const { history } = this.props;

        return (
            <div>
                {/* 模块 */}
                <div
                    ref={ref => { this.canvas = ref }}
                    className="ec-editor-canvas"
                >
                    <div
                        className="ec-editor-canvas-inner"
                    >
                        <Editor
                            activeId={this.state.activeId}
                            data={data}
                            tileData={tileData}
                        />
                    </div>
                </div>
                {/* <HanleMenu /> */}
            </div>
        );
    }
}

export default App;
