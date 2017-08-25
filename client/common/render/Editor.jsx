/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import EditorWrapper from './container/Wrap';

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(nextProps.data, this.state.data)) {
            console.log(nextProps.data)
            this.setState({
                data: nextProps.data,
            });
        }
    }

    /**
     * Loop
     * @param data
     * @return {XML}
     */
    loop(data) {
        if (!data.module) {
            return null;
        }

        const children = data.children;
        const menus = data.module.menus;
        const Component = data.Component;

        return (
            <EditorWrapper
                key={data.guid}
                guid={data.guid}
                menus={menus}
            >
                <Component>
                    {children && children.map(item => this.loop(item))}
                </Component>
            </EditorWrapper>
        )
    }

    render() {
        const { data } = this.state;

        if (!data) {
            return null;
        }

        return (
            <div>
                {this.loop(data)}
            </div>
        )
    }
}

export default Editor;
