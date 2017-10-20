const data = [{"guid":"0a2e7bbb-4f1c-4bb0-b04a-980ef4908458","name":"layer","module":{"name":"layer","menus":["pre-image","tab","floor","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"attrs":{"style":{"layout":{"width":"500","height":"200","backgroundColor":"rgba(229, 228, 235, 1)"}}},"children":[{"guid":"7c81a65f-a69c-41b5-8bb7-8da9407d922f","name":"tabs","module":{"name":"tabs","menus":[],"editable":{"style":{"layout":["basic"],"title":["basic"],"main":["basic"]}}}},{"guid":"644f8af2-c7b5-4424-b4da-5dd4d7878777","name":"layer","module":{"name":"layer","menus":["pre-image","tabs","layer","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"attrs":{"style":{"layout":{"backgroundColor":"rgba(72, 72, 77, 1)"}}}}]},{"guid":"6ae0963c-5b38-4e37-b839-d142e00e9ea5","name":"layer","module":{"name":"layer","menus":["preImage","tabs","layer","img","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"attrs":{"style":{"layout":{"height":"50"}}}},{"guid":"ec-mod-6c45f128-fbd2-400a-b04f-c7097f029e8c","name":"layer","module":{"name":"layer","menus":["preImage","tabs","layer","img","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"attrs":{"style":{"layout":{"height":"500","borderWidth":1,"borderStyle":"dashed"}}}},{"guid":"ab1b2580-8d5e-4412-8a76-f11fa5e086e8","name":"layer","module":{"name":"layer","menus":["pre-image","tabs","layer","img","fix","float","hotMap"],"editable":{"style":{"layout":["basic"]},"anchor":[{"label":"设置锚点","component":"attrs"}]}},"attrs":{"style":{"layout":{"height":"800","backgroundColor":"rgba(238, 236, 248, 1)","borderStyle":"dashed","borderWidth":1}}}}]

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
