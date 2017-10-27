import * as React from 'react';

import Common from '../../common';

import Utils from '../../util/util';

export interface HotImagesProps {
    id?: string,
    style?: any,
    module?: string
}

class HotImages extends React.PureComponent<HotImagesProps, any> {
    render() {
        const { style, id } = this.props;
        return (
            <div
                {...this.props}
                className="as-layer-goods"
                style={style}
            >
                1231231231231
            </div>
        );
    }
}

export default Common(HotImages);
