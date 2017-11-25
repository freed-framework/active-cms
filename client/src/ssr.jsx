import React from 'react';
import ReactDOM from 'react-dom';
import Render from './common/Render';
import FrameApp from 'freed-spa/lib/App';

ReactDOM.render(
    <Render data={[]} pageType="mobile" />,
    document.getElementById('topicRoot')
);