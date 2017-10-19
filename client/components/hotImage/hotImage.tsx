import * as React from 'react';

import Utils from '../util/util';

export interface HotImagesProps {
    id?: string,
    style?: React.CSSProperties
}

export default class HotImages extends React.PureComponent<HotImagesProps, any> {
    render() {
        const { style, id } = this.props;
        return (
            <div
                id={`ec-module-${Utils.guid()}`}
                className="as-layer-goods"
                style={style}
            >
                1231231231231
            </div>
        );
    }
}
