import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';
// import Body from './body';
import View from '../../src/pages/viewer';


if (canUseDOM) {
  ReactDOM.render(<View data={data} />, document.getElementById('topicRoot'), () => {
    console.log('ReactDOM.render');
  });
}
