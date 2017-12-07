/**
 * @file Render-pc.jsx
 * @author denglingbo
 *
 */
import React from 'react';
import Lazyer from '../lazyer/Lazyer';
import AppComponent from '../AppComponent';
import loader from '../loader/loader-pc';

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
            }}>
                {childProps => loop(childProps)}
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
