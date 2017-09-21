const data = [{"name":"floor","guid":"ddddds11-1ead-43ae-b6de-e6debb958b08","style":{"layout":{"width":""}}},{"name":"floor","guid":"237d6d2c-1034-4f76-a5c8-6678b9a3cb78","style":{"layout":{"height":60}},"children":[{"guid":"b9002719-7183-4ce1-9d92-02bec84956cb","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}},{"guid":"24bba79f-2be4-4f25-a054-b8212d933474","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}},{"guid":"05ea8760-daed-4236-87cc-c73d7e8a7f8b","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}},{"guid":"18b41975-4239-4b02-a452-0604437a79fc","name":"tab","module":{"id":1,"name":"tab","file":"tab","menus":[],"editable":{"layout":["basic"],"title":["basic"],"main":["basic"]}}}]},{"guid":"0d295cbd-8ecc-4e43-bbf1-57d1a257aa75","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab"],"editable":{"layout":["basic"]}}},{"guid":"91635c5b-7d17-4e60-b377-69849a78f08a","name":"floor","module":{"id":3,"name":"floor","file":"floor","menus":["pre-image","tab"],"editable":{"layout":["basic"]}}},{"guid":"59666a86-a98b-4c63-a8fc-9b177f2129ac","name":"fixer","module":{"id":2,"name":"fixer","file":"fixer","menus":[]}}]

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
