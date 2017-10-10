/**
 * @file Editor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import Wrap from './Wrap';
import ActiveButton from './ActiveButton';
import Panel from '../panel';
import Lazyer from '../../../common/Lazyer';
import './editor.scss';

/**

 <Wrap
 isActive={mod.guid === activeId}
 >
 <div>
 <mod.App
 style={mod.style}
 attrs={mod.attrs}
 >
 {mod.children && this.loop(mod.children, activeId)}
 </mod.App>
 <ActiveButton
 key={mod.guid}
 style={mod.style}
 attrs={mod.attrs}
 guid={mod.guid}
 module={mod.module}
 />
 </div>
 </Wrap>

 */

class Editor extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeId: props.data,
            data: props.data,
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(nextProps.data, this.props.data)) {
            this.setState({
                data: nextProps.data,
            });
        }

        /**
         * 通过点击 edit 按钮，传递的 id
         */
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
                {mod => {
                    const props = {
                        style: mod.style,
                        attrs: mod.attrs,
                        guid: mod.guid,
                    };

                    // 先添加到panel 的 _data 中
                    Panel.add({
                        ...props,
                        module: mod.module,
                    });

                    return (
                        <mod.App
                            id={props.guid}
                            {...props}
                        >
                            {item.children && this.loop(item.children)}
                        </mod.App>
                    );
                }}
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
