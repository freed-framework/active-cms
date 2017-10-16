/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import Wrap from './Wrap';
import ActiveButton from './ActiveButton';
import Panel from '../panel';
import Lazyer from '../../../common/Lazyer';
import './editor.scss';

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeId: props.activeId,

            data: props.data,

            tileData: props.tileData,
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(nextProps.tileData, this.props.tileData)) {
            this.setState({
                tileData: nextProps.tileData,
            });
        }

        if (!Immutable.is(nextProps.data, this.props.data)) {
            this.setState({
                data: nextProps.data,
            });
        }

        /**
         * 通过点击 edit 按钮，传递的 id
         */
        if (nextProps.activeId !== this.props.activeId) {
            this.setState({
                activeId: nextProps.activeId,
            });
        }
    }

    /**
     * 原始数据
     * @param data
     */
    loopRender(data) {
        const tileData = this.state.tileData;

        return data.map(item => {
            // 获取App 组件
            const d = tileData[item.guid];
            const App = d.App;

            // 获取样式
            const props = {
                style: item.style,
                attrs: item.attrs,
                guid: item.guid,
            };

            return (
                <App
                    id={item.guid}
                    key={item.guid}
                    {...props}
                >
                    {item.children && this.loopRender(item.children)}
                </App>
            );
        });
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                {this.loopRender(data)}
            </div>
        )
    }
}

export default Editor;
