/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import EditorWrapper from '../wrap/Wrap';
import Lazyer from '../../../components/common/Lazyer';
import './editor.scss';

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeId: props.data,
            data: props.data,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(nextProps.data, this.props.data)) {
            this.setState({
                data: nextProps.data,
            });
        }
        if (nextProps.activeId !== this.props.activeId) {
            this.setState({
                activeId: nextProps.activeId,
            });
        }
    }

    loop(data, activeId) {
        return data.map(item => (
            <Lazyer
                key={item.guid}
                item={item}
            >
                {mod => (
                    <EditorWrapper
                        key={mod.guid}
                        className={mod.guid === activeId ? 'as-editor-active' : ''}
                        style={mod.style}
                        guid={mod.guid}
                        module={mod.module}
                    >
                        <mod.App style={mod.style}>
                            {mod.children && this.loop(mod.children, activeId)}
                        </mod.App>
                    </EditorWrapper>
                )}
            </Lazyer>
        ))
    }

    render() {
        const { data, activeId } = this.state;

        if (!data) {
            return null;
        }

        return (
            <div>
                {this.loop(data, activeId)}
            </div>
        )
    }
}

export default Editor;
