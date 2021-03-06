/**
 * @file LayerCake
 * @author denglingbo
 *
 * 已经添加的组件列表组件
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import classNames from 'classnames';
import { activeComponent } from '../../pages/editor/App';
import { scrollDom } from '../../common/util/util';
import List from './List';

import './layerCake.scss';

class LayerCake extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeId: props.activeId,
            data: props.data,
            active: props.active,
            editVisible: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (!is(this.state.active, nextProps.active)) {
        //     this.setState({
        //         active: nextProps.active,
        //     })
        // }
        //
        // if (!is(this.state.activeId, nextProps.activeId)) {
        //     this.setState({
        //         activeId: nextProps.activeId,
        //     })
        // }
    }

    handleActive = (guid) => {
        const { outerEl } = this.props;
        const { params } = this.props.match;
        // 实际上被编辑的元素
        const editTarget = document.getElementById(guid);

        try {
            scrollDom(outerEl, editTarget, params.type === 'mobile' ? 2 : 1);
        } catch(e) {}

        activeComponent(guid, editTarget);
    }

    handleEdit = () => {
        const editVisible = this.state.editVisible;
        this.setState({
            editVisible: !editVisible,
        })
    }

    render() {
        const { editVisible } = this.state;
        const { active, activeId, data } = this.props;

        const cls = classNames('ec-editor-layer-cake', 'box-shadow', {
            'ec-editor-layer-cake-active': active,
            'ec-editor-layer-cake-edit': editVisible,
        });

        return (
            <div className={cls}>
                <div
                    className="icon-btn"
                    onClick={this.props.onClick}
                >
                    <Icon type="right" />
                </div>
                <div className="ec-editor-layer-cake-title">
                    <Icon type="layout" />
                    <span className="ec-editor-layer-cake-title-name">已添加组件</span>
                    <span
                        className="ec-editor-layer-cake-title-edit"
                        onClick={this.handleEdit}
                    >
                        {editVisible ? <Icon type="check" /> : <Icon type="setting" />}
                    </span>
                </div>
                <List
                    data={data}
                    activeId={activeId}
                    onActive={this.handleActive}
                    editVisible={editVisible}
                />
            </div>
        );
    }
}

export default withRouter(LayerCake);
