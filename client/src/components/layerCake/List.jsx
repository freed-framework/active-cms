/**
 * @file List.jsx
 * @author shijh
 *
 * 已选组件列表项
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Font from 'font';
import { Icon } from 'antd';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { fromJS } from 'immutable';
import Lazyer from '../../common/lazyer';
import DragPop from './DragPop';
import Utils from '../../../components/util/util';
import { moveComponent, sortComponent, editComponentByGuid } from '../../pages/editor/App';

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

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editId: null,
            displayName: null,
        }
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.any),
        active: PropTypes.bool,
        activeId: PropTypes.string,
        onActive: PropTypes.func,
    }

    componentDidMount() {
        this.dom = ReactDOM.findDOMNode(this);
        // window.addEventListener('mousedown', this.onMouseDown);
        // window.addEventListener('mousemove', this.onMouseMove);
        // window.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {
        // window.removeEventListener('mousedown', this.onMouseDown);
        // window.removeEventListener('mousemove', this.onMouseMove);
        // window.removeEventListener('mouseup', this.onMouseUp);
        // document.body.removeChild(this.container);
    }

    onMouseDown = (e) => {
        const content = contains(e, 'ec-editor-layer-cake-content', 'ec-editor-layer-cake-main');
        if (content) {
            // const name = content.target.getAttribute('data-name');
            this.startId = content.target.getAttribute('data-guid');
            this.props.onActive(this.startId);

            // this.createDragElement(e, name);
        } else {
            this.startId = null;
        }
    }

    onMouseMove = (e) => {
        // if (this.container) {
        //     const rect = mousePosition(e);
        //     this.container.style.left = `${rect.x}px`;
        //     this.container.style.top = `${rect.y}px`;
        // }
    }

    onMouseUp = (e) => {
        const content = contains(e, 'ec-editor-layer-cake-content', 'ec-editor-layer-cake-main');
        const endId = content.target && content.target.getAttribute('data-guid');

        if (content && this.startId && endId && this.startId !== endId) {
            moveComponent(this.startId, endId);
            this.startId = null;
        }

        // if (this.container) {
        //     document.body.removeChild(this.container);
        // }
    }

    createDragElement = (el, name) => {
        const rect = mousePosition(el);

        this.container = document.createElement('div');

        this.container.style.position = 'absolute';
        this.container.style.left = `${rect.x}px`;
        this.container.style.top = `${rect.y}px`;
        this.container.style.zIndex = 99999;
        this.container.style.background = '#eee';
        this.container.style.border = '1px solid #ccc';

        document.body.appendChild(this.container);
        ReactDOM.unstable_renderSubtreeIntoContainer(this, <DragPop name={name} />, this.container);
    }

    handleActive = (e) => {
        const id = e.currentTarget.getAttribute('data-guid');
        this.props.onActive(id);
    }

    /**
     * 进行排序
     * @param e
     */
    handleSort = (e) => {
        const { data } = this.props;
        const id = e.target.getAttribute('data-guid');
        const fromIndex = e.target.getAttribute('data-index');
        const toIndex = e.target.value;
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
     * 修改组件名称
     * @param e
     */
    handleChangeName = (e) => {
        const id = e.currentTarget.getAttribute('data-guid');
        const value = e.currentTarget.value;

        this.setState({
            displayName: value,
        })

        editComponentByGuid(
            id,
            ['displayName'],
            value
        )
    }

    handleEdit = (e) => {
        const editId = e.currentTarget.getAttribute('data-guid');
        const displayName = e.currentTarget.getAttribute('data-name');
        const value = e.currentTarget.value;

        this.setState({
            editId,
            displayName,
        });
    }

    handleBlur = (e) => {
        this.setState({
            editId: null,
            displayName: null,
        });
    }

    /**
     * 获取展示名
     * @param item
     * @return {XML}
     */
    getDisplayName(item) {
        if (this.state.editId === item.guid) {
            return (
                <span>
                    <input
                        ref={ref => { this.editName = ref }}
                        className="ec-editor-layer-cake-name"
                        data-guid={item.guid}
                        onChange={this.handleChangeName}
                        onBlur={this.handleBlur}
                        value={this.state.displayName}
                    />
                </span>
            )
        }

        if (item.displayName) {
            return (
                <span>
                    <span>{item.displayName}</span>
                    <span
                        data-guid={item.guid}
                        data-name={item.displayName}
                        onClick={this.handleEdit}
                    >
                        <Icon type="edit" />
                    </span>
                </span>
            )
        }

        return (
            <Lazyer
                item={item}
            >
                {mod => {
                    return (
                        <span>
                            <span>{mod.module.config.displayName}</span>
                            <span
                                data-guid={item.guid}
                                data-name={mod.module.config.displayName}
                                onClick={this.handleEdit}
                            >
                                <Icon type="edit" />
                            </span>
                        </span>
                    )
                }}
            </Lazyer>
        )
    }



    /**
     * 循环 DOM 节点
     * @param data
     * @param isChildren
     */
    loopRender(data, isChildren = false) {
        const { activeId, match } = this.props;

        const cls = classNames('ec-editor-layer-cake-items', {
            'ec-editor-layer-cake-items-sub': isChildren,
        });

        return data.map((item, index) => {
            const isActive = activeId === item.guid;
            const childCls = classNames({
                'ec-editor-layer-cake-items-active': isActive,
                'ec-editor-layer-cake-items-not-active': !isActive
            });

            return (
                <div
                    key={item.guid}
                    className={cls}
                >
                    <div
                        className="ec-editor-layer-cake-content"
                        data-guid={item.guid}
                        data-name={item.name}
                    >
                        <span
                            data-guid={item.guid}
                            onClick={this.handleActive}
                        >
                            <Font size="13" type={isActive ? 'note-text2' : 'note-text'} />
                        </span>

                        {this.getDisplayName(item)}

                        <input
                            className="ec-editor-layer-cake-index"
                            data-guid={item.guid}
                            data-index={index}
                            value={index}
                            onChange={this.handleSort}
                        />
                    </div>

                    <div className={childCls}>
                        {item.children && this.loopRender(item.children, true)}
                    </div>
                </div>
            )
        })
    }

    render() {
        const { data } = this.props;

        return (
            <div className="ec-editor-layer-cake-main">
                {this.loopRender(data)}
            </div>
        )
    }
}

export default withRouter(List);
