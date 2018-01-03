/**
 * @file List.jsx
 * @author shijh
 *
 * 已选组件列表项
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Font from 'font';
import { Icon, Collapse, Tree } from 'antd';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import Lazyer from '../../common/lazyer';
import LazyerHoc from '../../common/lazyer/LazyerHoc';
import loader from '../../common/loader/loader';
import DragPop from './DragPop';
import Utils from '../../../components/util/util';
import Item from './Item';
import { moveComponent, sortComponent, editComponentByGuid } from '../../pages/editor/App';
import doc from '../../images/icon-svg/doc.svg';

const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;
function GetRect(element) {
    const rect = element.getBoundingClientRect();
    const top = document.documentElement.clientTop;
    const left = document.documentElement.clientLeft;
    return {
        top: rect.top - top,
        bottom: rect.bottom - top,
        left: rect.left - left,
        right: rect.right - left
    }
}

function mousePosition(ev) {
    if (ev.pageX || ev.pageY) {
        return { x: ev.pageX, y: ev.pageY };
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

function contains(n, targetClass, endClass) {
    let node = n;
    while (node) {
        const $classname = node.target.className;
        if ($classname === targetClass) {
            return node;
        }
        else if ($classname === endClass) {
            return false;
        }
        node = node.parentNode;
    }
    return false;
}

class List extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            // data: [],
            // active: false,
            activeId: null,
        }
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any),
        // active: PropTypes.bool,
        activeId: PropTypes.string,
        onActive: PropTypes.func,
        editVisible: PropTypes.bool,
    }

    componentWillReceiveProps(nextProps) {
        // if (!is(this.props.data, nextProps.data)) {
        //     this.setState({
        //         data: nextProps.data,
        //     })
        // }

        // if (!is(this.props.active, nextProps.active)) {
        //     this.setState({
        //         active: nextProps.active,
        //     })
        // }

        if (!is(this.props.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            })
        }
    }

    /**
     * 进行排序
     * @param e
     */
    handleSort = (id, fromIndex, toIndex) => {
        const { data } = this.props;
        // const id = e.target.getAttribute('data-guid');
        // const fromIndex = e.target.getAttribute('data-index');
        // const toIndex = e.target.value;
        const $data = fromJS(data);
        let $dealData = fromJS([]);

        Utils.find($data, id, ($finder, deep) => {
            const d = deep;
            d.pop();

            $dealData = $data.updateIn(d, (value) => {
                return Utils.takeTo(value, fromIndex, toIndex);
            });
        }, {
            findBy: 'guid'
        });

        sortComponent($dealData.toJS());
    }

    /**
     * 循环 DOM 节点
     * @param data
     * @param isChildren
     */
    loopRender(data, isSub = false) {
        const { activeId, match, editVisible } = this.props;

        return data.map((item, index) => {
            const itemsCls = classNames('ec-editor-layer-cake-items', {
                'ec-editor-layer-cake-items-sub': isSub,
                'ec-editor-layer-cake-items-sub-no-child': !item.children,
            });

            return (
                <Panel
                    key={item.guid}
                    className={itemsCls}
                    disabled={editVisible}
                    header={
                        <Item
                            item={item}
                            loader={loader}
                            activeId={activeId}
                            editVisible={editVisible}
                            index={index}
                            onSort={this.handleSort}
                            onActive={this.props.onActive}
                        />
                    }
                >
                    <Collapse>
                        {item.children && this.loopRender(item.children, true)}
                    </Collapse>
                </Panel>
            )
        })
    }

    render() {
        const { data } = this.props;

        if (data.length === 0) {
            return (
                <div className="ec-editor-layer-cake-nodata">
                    暂无数据
                </div>
            )
        }

        return (
            <Collapse
                className="ec-editor-layer-cake-main"
            >
                {this.loopRender(data)}
            </Collapse>
        )
    }
}

export default withRouter(List);
