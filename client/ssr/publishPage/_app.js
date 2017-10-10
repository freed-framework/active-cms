const data = [{"guid":"6fc47ea3-c5e5-4f07-8850-30cfc5535eb6","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"attrs":{"style":{"layout":{"backgroundColor":"rgba(22, 18, 46, 1)"}}}}]

import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';
// import Body from './body';
import Render from '../../common/render.jsx';


if (canUseDOM) {
  ReactDOM.render(<Render pageData={data} />, document.getElementById('publishApp'), () => {
    console.log('ReactDOM.render');
  });
}
