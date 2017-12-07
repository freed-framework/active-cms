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
    /**
     * 循环输出组件
     * @param data
     * @param extendsProps, 继承于父组件的 属性
     */
    loop(data = [], extendsProps = null) {
        const { autoActiveId, pageType, isEdit, outerEl } = this.props;

        return data.map(item => {
            return (
                <RenderItem
                    key={item.guid}
                    item={item}
                    loader={loader}
                    extendsProps={extendsProps}
                    autoActiveId={autoActiveId}
                    pageType={pageType}
                    outerEl={outerEl}
                    isEdit={isEdit}
                >
                    {childProps => this.loop(item.children, childProps.extendsProps)}
                </RenderItem>
            );
        });
    }

    render() {
        return (
            <div>{this.loop(this.props.data)}</div>
        );
    }
}

App.defaultProps = {
    data: [],
}

export default App;

