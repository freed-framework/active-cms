import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';
// import Body from './body';
import Render from '../../common/Render.jsx';


if (canUseDOM) {
  ReactDOM.render(<Render pageData={data} />, document.getElementById('topicRoot'), () => {
    console.log('ReactDOM.render');
  });
}
