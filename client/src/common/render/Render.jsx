/**
 * @file Render.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import loader from '../loader/loader';
import RenderItem from './RenderItem';

class App extends PureComponent {
    static defaultProps = {
        pageType: null,
        isEdit: false,
        outerEl: null,
    }

    /**
     * 循环输出组件
     * @param data
     * @param extendsProps, 继承于父组件的 属性
     */
    loop(data = [], extendsProps = null) {
        return data.map(item => {
            return (
                <RenderItem
                    key={item.guid}
                    item={item}
                    loader={loader}
                    extendsProps={extendsProps}
                    {...this.props}
                >
                    {childProps => this.loop(item.children, childProps.extendsProps)}
                </RenderItem>
            );
        });
    }

    render() {
        return (
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
            }}>
                {this.loop(this.props.data)}
            </div>
        );
    }
}

App.defaultProps = {
    data: [],
}

export default App;

