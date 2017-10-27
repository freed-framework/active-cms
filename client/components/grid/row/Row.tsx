import * as React from 'react';

import Common from '../../common';

export interface RowProps {
}

class Row extends React.Component<RowProps, any> {
  render() {
    return (
      <div
        {...this.props}
      >
        { this.props.children }
      </div>
    );
  }
}

export default Common(Row);
