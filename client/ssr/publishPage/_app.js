const data = [{"guid":"13af0627-f223-4256-ba29-19d962d8782e","name":"floor","module":{"name":"floor","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"children":[{"guid":"e14fa264-69bf-48eb-8a46-d3f480550fb5","name":"img"}]},{"guid":"f77b4e2f-862a-4b77-b4dd-71c7a52a4114","name":"tabs","module":{"name":"tabs","menus":[],"editable":{"style":{"layout":["basic"],"title":["basic"],"main":["basic"]}}}}]

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
