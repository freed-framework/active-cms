const data = [{"guid":"ec-module-bd54abf3-42a6-490e-99ac-b4a1686d5fd5","name":"tabs","dataTrans":{"activeKey":"0","data":[{"key":"0","title":"Tab 2222","content":"Content 1"},{"key":"1","title":"Tab 2","content":"Content 2"}]}},{"guid":"ab1b2580-8d5e-4412-8a76-f11fa5e086e8","name":"layer","attrs":{"style":{"layout":{"height":"800","backgroundColor":"rgba(238, 236, 248, 1)","borderStyle":"dashed","borderWidth":1}}},"children":[{"guid":"ec-module-11122-42a6-490e-99ac-b4a1686d5fd5","name":"layer"},{"guid":"ec-module-e6bed695-577a-4639-be0c-54c38f5a4b7c","name":"goods","attrs":{"row":"3","col":"5","style":{"layout":{"width":"3211","margin":"0"}}}}]},{"guid":"ec-module-3c02c9cc-3ab6-49ef-bf80-a46961132fa5","name":"layer"},{"guid":"ec-module-7733e4cb-8cd5-45e4-acc7-1ab5bcffe6c5","name":"tabs"},{"guid":"ec-module-6a48dfdc-19a8-44e1-8f81-98f0e0e641fa","name":"layer"}]

import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';
// import Body from './body';
import Render from '../../common/render.jsx';


if (canUseDOM) {
  ReactDOM.render(<Render pageData={data} />, document.getElementById('topicRoot'), () => {
    console.log('ReactDOM.render');
  });
}
