/**
 * @file LayerCake
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import classNames from 'classnames';
import App, { activeComponent } from '../../pages/editor/App';
import './layerCake.scss';

class LayerCake extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.state.props, nextProps.data)) {
            this.setState({
                data: nextProps.data,
            })
        }
    }

    handleActive = (event) => {
        const guid = event.target.getAttribute('data-guid');

        // 实际上被编辑的元素
        const editTarget = document.getElementById(guid);

        activeComponent(guid, editTarget);
    }

    loopRender(data, isChildren = false) {
        const cls = classNames('ec-editor-layer-cake-items', {
            'ec-editor-layer-cake-items-sub': isChildren,
        });

        return data.map(item => {
            return (
                <div
                    key={item.guid}
                    className={cls}
                >
                    <div
                        data-guid={item.guid}
                        onClick={this.handleActive}
                    >
                        {item.name}
                    </div>

                    <div>
                        {item.children && this.loopRender(item.children, true)}
                    </div>
                </div>
            )
        })
    }

    render() {
        const { data } = this.state;

        return (
            <div className="ec-editor-layer-cake">
                {this.loopRender(data)}
            </div>
        );
    }
}

export default LayerCake;
