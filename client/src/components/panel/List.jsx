/**
 * @file List.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setActiveInfo, clearActiveInfo } from '../../actions/pub';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import module from '../../common/module';
import Item from './Item';

@connect(
    state => ({
        pub: state.toJS().pub,
    }),
    dispatch => bindActionCreators({
        setActiveInfo,
        clearActiveInfo,
    }, dispatch)
)
class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            activeId: props.activeId,
            tileData: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.props.data, nextProps.data)) {
            this.setDataAndTile(nextProps.data, () => {
                this.updateActiveInfo();
            });
        }

        // 处理 reducers 的 activeInfo 数据
        if (!is(this.props.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            }, () => {
                this.updateActiveInfo();
            })
        }
    }

    updateActiveInfo() {
        // TODO 我始终觉得这里有问题，tileData 是一个异步的获取文件的操作
        const data = this.state.tileData[this.state.activeId];

        if (!data) {
            return this.props.clearActiveInfo();
        }

        const info = {
            ...(data.guid && { id: data.guid }),
            ...(data.config && { config: data.config }),
            ...(data.componentProps && { componentProps: data.componentProps }),
        };

        if (!is(this.props.pub.activeInfo, info)) {
            this.props.setActiveInfo(info);
        }
    }

    /**
     * 设置 state.tabs & state.tileData
     * @param data
     * @param callback
     */
    setDataAndTile(data = [], callback) {
        // 平铺的绑定了 App 的数据
        const tileData = {};
        const result = this.data2Tile(data);

        Promise.all(result).then(values => {
            values.forEach(v => {
                tileData[v.guid] = {...v};
            });

            this.setState({
                data,
                tileData,
            }, () => {
                callback();
            });
        });
    }

    /**
     * 设置 state.data & state.tileData
     * 将数据平铺
     * @param data
     * @param arr
     * @return {Array}
     */
    data2Tile(data) {
        const { params } = this.props.match;
        let arr = [];

        const looper = (data, topWrappedModule) => {
            data.forEach(item => {
                arr = arr.concat(module.get(item, topWrappedModule));

                if (item.children) {
                    looper(item.children, item.name);
                }
            });
        }

        looper(data);

        return arr;
    }

    render() {
        const { tileData, activeId } = this.state;

        if (!tileData) {
            return null;
        }

        return (
            <div>
                {Object.keys(tileData).map(key => (
                    <Item
                        key={key}
                        item={tileData[key]}
                        activeId={activeId}
                    />
                ))}
            </div>
        )
    }
}

List.defaultProps = {
    data: [],
    isSub: false,
}

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any),
    isSub: PropTypes.bool,
}

export default withRouter(List);
