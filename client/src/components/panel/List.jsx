/**
 * @file List.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import module from '../../common/module';
import Item from './Item';

class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            tileData: null,
            activeId: props.activeId,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.props.data, nextProps.data)) {
            this.setDataAndTile(nextProps.data);
        }

        if (!is(this.props.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            })
        }
    }

    /**
     * 设置 state.tabs & state.tileData
     * @param data
     * @param callback
     */
    setDataAndTile(data = [], callback = () => {}) {
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
            }, () => callback);
        });
    }

    /**
     * 设置 state.data & state.tileData
     * 将数据平铺
     * @param data
     * @param arr
     * @return {Array}
     */
    data2Tile(data, arr = []) {
        const { params } = this.props.match;

        const looper = (data) => {
            data.forEach(item => {
                arr = arr.concat(module.get(item, params.type));

                if (item.children) {
                    looper(item.children, arr);
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
