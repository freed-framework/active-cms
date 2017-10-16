/**
 * @file LayerCake
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import classNames from 'classnames';
import Font from 'font';
import App, { activeComponent } from '../../pages/editor/App';
import './layerCake.scss';

class LayerCake extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            activeId: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!is(this.state.props, nextProps.data)) {
            this.setState({
                data: nextProps.data,
            })
        }

        if (!is(this.state.activeId, nextProps.activeId)) {
            this.setState({
                activeId: nextProps.activeId,
            })
        }
    }

    handleActive = (event) => {
        const guid = event.target.getAttribute('data-guid');

        // 实际上被编辑的元素
        const editTarget = document.getElementById(guid);

        this.setState({
            current: guid
        }, () => {
            activeComponent(guid, editTarget);
        })

    }

    loopRender(data, isChildren = false) {
        const { activeId } = this.state;

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
                        <Font size="13" type={activeId === item.guid ? 'note-text2' : 'note-text'} />
                        {
                            item.name
                        }
                        
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
