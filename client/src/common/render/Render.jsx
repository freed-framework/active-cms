/**
 * @file render.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import Lazyer from '../lazyer/Lazyer';
import AppComponent from '../AppComponent';
import loader from '../loader/loader';

/**
 * 循环输出组件
 * @param props
 * @param props.data
 * @param props.pageType
 * @param props.extendsProps
 */
const loop = (props) => props.data.map(item => (
    <Lazyer
        key={item.guid}
        item={item}
        loader={loader}
    >
        {mod => (
            <AppComponent {...{
                ...mod,
                ...(props.extendsProps && { extendsProps: props.extendsProps }),
                pageType: props.pageType,
                isEdit: props.isEdit,
            }}>
                {(childProps) => loop(childProps)}
            </AppComponent>
        )}
    </Lazyer>
));

const App = (props) => (
    <div>{loop(props)}</div>
);

App.defaultProps = {
    data: [],
}

export default App;
