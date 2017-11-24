import React, { PropTypes, Component } from 'react';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import ReactDOM from 'react-dom';
import View from '../../../client/src/pages/viewer';


if (canUseDOM) {
  ReactDOM.render(<View data={data} pageType={pageType} />, document.getElementById('topicRoot'), () => {
    console.log('ReactDOM.render');
  });
}
