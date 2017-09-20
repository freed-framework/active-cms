const data = [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout":{"height":100}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"height":60}}]

import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';
// import Body from './body';
import Render from '../common/render.jsx';


if (canUseDOM) {
  ReactDOM.render(<Render pageData={data} />, document.getElementById('publishApp'), () => {
    console.log('ReactDOM.render');
  });
}
