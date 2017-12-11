/**
 * @file Item.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { is } from 'immutable';
import { Icon } from 'antd';
import LazyerHoc from '../../common/lazyer/LazyerHoc';
import { editComponentByGuid } from '../../pages/editor/App';

@LazyerHoc
class Item extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            editId: null,
            displayName: null,
            sort: props.index,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.props.editVisible, nextProps.editVisible)) {
            this.setState({
                editId: null,
                displayName: null,
            })
        }

        if (!is(this.props.sort, nextProps.index)) {
            this.setState({
                sort: nextProps.index,
            })
        }
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
        });
    }

    handleEdit = (e) => {
        const editId = e.currentTarget.getAttribute('data-guid');
        const displayName = e.currentTarget.getAttribute('data-name');
        // const value = e.currentTarget.value;

        this.setState({
            editId,
            displayName,
        });
    }

    handleSubmitName = (event) => {
        const id = event.currentTarget.getAttribute('data-guid');

        editComponentByGuid(
            id,
            ['displayName'],
            this.state.displayName
        )

        this.setState({
            editId: null,
            displayName: null,
        });
    }

    /**
     * 修改当前排序号
     * @param event
     */
    handleSort = (event) => {
        this.setState({
            sort: event.target.value,
        });
    }

    handleActive = (e) => {
        const id = e.currentTarget.getAttribute('data-guid');
        e.stopPropagation();

        if (id) {
            this.props.onActive(id);
        }
    }

    /**
     * 确认排序，通知父组件修改
     * @param event
     */
    handleSubmitSort = (event) => {
        const id = event.target.getAttribute('data-guid');
        const fromIndex = event.target.getAttribute('data-index');

        if (event.keyCode === 13) {
            this.props.onSort(id, fromIndex, this.state.sort);
        }
    }

    /**
     * 获取展示名
     * @param item
     * @return {XML}
     */
    getDisplayName(item) {
        const { editVisible } = this.props;

        if (editVisible && this.state.editId === item.guid) {
            return (
                <span
                    className="ec-editor-layer-cake-content-name"
                >
                    <input
                        className="ec-editor-layer-cake-input-name"
                        data-guid={item.guid}
                        onChange={this.handleChangeName}
                        value={this.state.displayName}
                    />
                </span>
            )
        }

        return (
            <span
                data-guid={item.guid}
                className="ec-editor-layer-cake-content-name"
                onClick={this.handleActive}
            >
                {item.displayName || item.config.displayName}
            </span>
        )
    }

    render() {
        const {
            item,
            module,
            index,
            onSort,
            activeId,
            editVisible
        } = this.props;

        if (!module) {
            return null;
        }

        const barCls = classNames('ec-editor-layer-cake-content-bar', {
            'hide': !editVisible,
        });
        const editCls = classNames({
            'ec-editor-layer-cake-index': editVisible,
            'ec-editor-layer-cake-index-hide': !editVisible,
        });
        const isActive = activeId === item.guid;
        const childCls = classNames({
            'ec-editor-layer-cake-items-active': isActive,
            'ec-editor-layer-cake-items-not-active': !isActive,
        });

        return (
            <div className={childCls}>
                <div
                    className="ec-editor-layer-cake-content"
                >
                    {this.getDisplayName(module)}

                    <span className={barCls}>
                        {(this.state.editId === module.guid) ?
                            <span
                                className="ec-editor-layer-cake-item-edit"
                                data-guid={module.guid}
                                onClick={this.handleSubmitName}
                            >
                                <Icon type="check" />
                            </span> :
                            <span
                                className="ec-editor-layer-cake-item-edit"
                                data-guid={module.guid}
                                data-name={module.displayName || module.config.displayName}
                                onClick={this.handleEdit}
                            >
                                <Icon type="edit" />
                            </span>
                        }
                        <input
                            className={editCls}
                            data-guid={module.guid}
                            data-index={index}
                            value={this.state.sort}
                            // onChange={onSort}
                            onChange={this.handleSort}
                            onKeyUp={this.handleSubmitSort}
                        />
                    </span>
                </div>
            </div>
        )
    }
}

export default Item;
